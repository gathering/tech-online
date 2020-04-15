/*
Tech:Online backend
Copyright 2020, Kristian Lyngstøl <kly@kly.no>

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

package backend

import (
	"github.com/gathering/gondulapi"
	"github.com/gathering/gondulapi/db"
	"github.com/gathering/gondulapi/receiver"
	log "github.com/sirupsen/logrus"
)

// Test is a single test-case, sent from the verify-script
type Test struct {
	Title       string
	Description string
	Status      string
	Task        string
}

// Station represent a single station. Identified by ID initially
type Station struct {
	Id       int
	Jumphost string
	Net      string
	Password string
	User     string
	Notes    string
}

// StationUser is provided to be able to retrieve stations associated with
// a user instead of a number. Used by the Task-logic.
type StationUser Station

// Task is a single task, with sequence number for sorting, shortname is
// used by the verify-script and matches the Test object's "task" field
// (not ideal, but it works).
type Task struct {
	Sequence    int
	ShortName   string
	Name        string
	Description string
	Tests       []Test
}

// TimeSlot represents a slot a user has allocated.
type TimeSlot struct {
	User      string
	Start     string
	End       string
	StationID int
}

type Tasks []*Task

// StatusUser is used to display everything a user/participant really needs
// to know right now.
type StatusUser struct {
	User     string
	Message  *string
	TimeSlot *TimeSlot `json:",omitempty"`
	Station  *StationUser
	Tasks    Tasks
}

// StatusStation allows GETting status per station. Unlike StatusUser, it
// is not divided into tasks. I'm not sure why not, except lazyness.
type StatusStation struct {
	Tests []*Test
}

func init() {
	receiver.AddHandler("/status/station/", func() interface{} { return &StatusStation{} })
	receiver.AddHandler("/status/user/", func() interface{} { return &StatusUser{} })
	receiver.AddHandler("/station/user/", func() interface{} { return &StationUser{} })
	receiver.AddHandler("/station/id/", func() interface{} { return &Station{} })
	receiver.AddHandler("/task/", func() interface{} { return &Task{} })
	receiver.AddHandler("/tasks/", func() interface{} { return &Tasks{} })
	receiver.AddHandler("/timeslot/", func() interface{} { return &TimeSlot{} })
}

func (ts *TimeSlot) Get(element string) error {
	if element == "" {
		return gondulapi.Errorf(400, "GET requires an element")
	}
	rows, err := db.DB.Query("SELECT participant,startt,endt,stationid FROM timeslots WHERE participant = $1", element)
	if err != nil {
		return gondulapi.Errorf(500, "ops")
	}
	defer func() {
		rows.Close()
	}()
	ok := rows.Next()
	if !ok {
		return gondulapi.Errorf(404, "No timeslot assigned")
	}
	err = rows.Scan(&ts.User, &ts.Start, &ts.End, &ts.StationID)
	if err != nil {
		return gondulapi.Errorf(500, "Bad things")
	}
	return nil
}

func (su *StationUser) Get(element string) error {
	if element == "" {
		return gondulapi.Errorf(400, "GET requires an element")
	}
	rows, err := db.DB.Query("SELECT stationid,jumphost,net,password,participant,notes FROM stations WHERE participant = $1", element)
	if err != nil {
		log.Printf("err: %v", err)
		return gondulapi.Errorf(500, "Bad stuff: %v", err)
	}
	defer func() {
		rows.Close()
	}()
	ok := rows.Next()
	if !ok {
		log.Printf("..4040")
		return gondulapi.Errorf(404, "No station assigned")
	}
	err = rows.Scan(&su.Id, &su.Jumphost, &su.Net, &su.Password, &su.User, &su.Notes)
	if err != nil {
		return gondulapi.Errorf(500, "Bad things")
	}
	return nil
}

func (su *Station) Get(element string) error {
	if element == "" {
		return gondulapi.Errorf(400, "GET requires an element")
	}
	rows, err := db.DB.Query("SELECT stationid,jumphost,net,password,participant,notes FROM stations WHERE stationid = $1", element)
	if err != nil {
		return gondulapi.Errorf(500, "ops")
	}
	defer func() {
		rows.Close()
	}()
	ok := rows.Next()
	if !ok {
		return gondulapi.Errorf(404, "No station assigned")
	}
	err = rows.Scan(&su.Id, &su.Jumphost, &su.Net, &su.Password, &su.User, &su.Notes)
	if err != nil {
		return gondulapi.Errorf(500, "Bad things")
	}
	return nil
}

func (su *StatusUser) Get(element string) error {
	if element == "" {
		return gondulapi.Errorf(400, "GET requires an element")
	}
	su.User = element
	msg := "Tech:Online is over, and the jury is out! Tune in on discord at 21:00 for a speed walkthrough and when we announce the lucky winners of a ticket for The Gathering 2021."
	su.Message = &msg
	station := &StationUser{}
	station.Get(element)
	if station.Id != 0 {
		su.Station = station
	}
	ts := &TimeSlot{}
	e := ts.Get(element)
	if e == nil {
		su.TimeSlot = ts
	}

	rows, err := db.DB.Query("SELECT title,description,status,task FROM status WHERE participantid = $1", element)
	if err != nil {
		return err
	}
	defer func() {
		rows.Close()
	}()
	su.Tasks.Get("")
	tasks := make(map[string]*Task)
	for _, t := range su.Tasks {
		tasks[t.ShortName] = t
	}
	for {
		ok := rows.Next()
		if !ok {
			break
		}
		t := &Test{}
		err = rows.Scan(&t.Title, &t.Description, &t.Status, &t.Task)
		if err != nil {
			return err
		}
		if tasks[t.Task] == nil {
			nt := &Task{}
			nt.ShortName = t.Task
			nt.Sequence = 99
			nt.Name = t.Task
			nt.Description = "unknown task"
			nt.Tests = make([]Test, 0)
			tasks[t.Task] = nt
			su.Tasks = append(su.Tasks, nt)
		}
		tasks[t.Task].Tests = append(tasks[t.Task].Tests, *t)
	}
	return nil
}

func (ss StatusStation) Put(element string) error {
	if element == "" {
		return gondulapi.Errorf(400, "PUT requires an element path to put")
	}
	station := Station{}
	err := station.Get(element)
	if err != nil {
		return gondulapi.Errorf(404, "No such station")
	}
	ss.Delete(element)
	for _, t := range ss.Tests {
		_, err := db.DB.Exec("INSERT INTO status (stationid,title,description,status,task,participantid) VALUES($1,$2,$3,$4,$5,$6)", element, t.Title, t.Description, t.Status, t.Task, station.User)
		if err != nil {
			log.Printf("lol: %v", err)
		}
	}
	return nil
}

func (ss *StatusStation) Get(element string) error {
	if element == "" {
		return gondulapi.Errorf(400, "GET requires an element")
	}

	rows, err := db.DB.Query("SELECT title,description,status,task FROM status WHERE stationid = $1 order by title", element)
	if err != nil {
		return err
	}
	defer func() {
		rows.Close()
	}()
	ss.Tests = make([]*Test, 0)
	for {
		ok := rows.Next()
		if !ok {
			break
		}
		t := &Test{}
		err = rows.Scan(&t.Title, &t.Description, &t.Status, &t.Task)
		if err != nil {
			return err
		}
		ss.Tests = append(ss.Tests, t)
	}
	return nil
}

func (ss StatusStation) Delete(element string) error {
	if element == "" {
		return gondulapi.Errorf(400, "DELETE requires an element")
	}
	_, err := db.DB.Exec("DELETE FROM status WHERE stationid = $1", element)
	if err != nil {
		log.Printf("%v", err)
	}
	return err
}

func (tasks *Tasks) Get(element string) error {
	rows, err := db.DB.Query("SELECT seq,shortname,name,description FROM tasks ORDER BY seq")
	if err != nil {
		return err
	}
	defer func() {
		rows.Close()
	}()
	for {
		ok := rows.Next()
		if !ok {
			break
		}
		task := &Task{}
		err = rows.Scan(&task.Sequence, &task.ShortName, &task.Name, &task.Description)
		if err != nil {
			return err
		}
		task.Tests = make([]Test, 0)
		*tasks = append(*tasks, task)
	}
	if err != nil {
		return err
	}
	return nil
}

func (task *Task) Get(element string) error {
	if element == "" {
		return gondulapi.Errorf(400, "GET requires an element")
	}
	rows, err := db.DB.Query("SELECT seq,shortname,name,description FROM tasks WHERE shortname = $1", element)
	if err != nil {
		return err
	}
	defer func() {
		rows.Close()
	}()
	ok := rows.Next()
	if !ok {
		return gondulapi.Errorf(404, "Task not found")
	}
	err = rows.Scan(&task.Sequence, &task.ShortName, &task.Name, &task.Description)
	if err != nil {
		return err
	}
	return nil
}

func (task Task) Delete(element string) error {
	if element == "" {
		return gondulapi.Errorf(400, "PUT requires an element path to put")
	}
	_, err := db.DB.Exec("DELETE FROM tasks WHERE shortname = $1", element)
	log.Printf("delete task err: %v", err)
	return nil
}

func (task Task) Put(element string) error {
	if task.ShortName == "" {
		task.ShortName = element
	}
	if element == "" {
		return gondulapi.Errorf(400, "PUT requires an element path to put")
	}
	if element != task.ShortName {
		return gondulapi.Errorf(400, "PUT where path element (%s) doesn't match shortname (%s) - pick one", element, task.ShortName)
	}

	task.Delete(element)
	_, err := db.DB.Exec("INSERT INTO tasks (seq,shortname,name,description) VALUES($1,$2,$3,$4)", task.Sequence, task.ShortName, task.Name, task.Description)
	if err != nil {
		return gondulapi.Errorf(500, "Insert failed: %v", err)
	}
	return nil
}
