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

/* package backend provides the objects that implements the Tech:Online
 * backend, using the gondulapi package (which is in alfa).
 */
package backend

import (
	"fmt"
	"github.com/gathering/gondulapi"
	"github.com/gathering/gondulapi/db"
	"github.com/gathering/gondulapi/receiver"
	log "github.com/sirupsen/logrus"
)

// Participant reperesent a single participant, including registry
// information. This is retrieved from the frontend, so where it comes from
// is somewhat irrelevant.
type Participant struct {
	Uuid         string
	First_name   string `column:"fname"`
	Last_name    string `column:"lname"`
	Display_name string `column:"dname"`
	Email        string `column:"mail"`
}

func init() {
	receiver.AddHandler("/participant/", func() interface{} { return &Participant{} })
}

// Get is called on GET. b will be an empty thing. Fill it out, using the
// element to determine what we're looking for. If it fails: return an
// error. Simple.
func (p *Participant) Get(element string) error {
	rows, err := db.DB.Query("SELECT uuid,fname,lname,dname,mail FROM participants WHERE uuid = $1", element)
	if err != nil {
		return err
	}
	defer func() {
		rows.Close()
	}()

	ok := rows.Next()
	if !ok {
		return gondulapi.Errorf(404, "Participant %s doesn't exist", element)
	}
	err = rows.Scan(&p.Uuid, &p.First_name, &p.Last_name, &p.Display_name, &p.Email)
	if err != nil {
		return err
	}
	if rows.Next() {
		return gondulapi.Errorf(500, "UUID %s has multiple copies....", element)
	}

	return nil
}

// Put is used to store an element with an absolute URL. In our case, the
// name of the element is also (potentially) present in the data it self -
// so we do a bit of magic. Note that this should NEVER generate a random
// name.
//
// b will contain the parsed data. element will be the name of the thing.
//
// PUT is idempotent. Calling it once with a set of parameters or a hundred
// times with the same parameters should yield the same result.
func (p Participant) Put(element string) error {
	if element == "" {
		return gondulapi.Errorf(400, "PUT requires an element path to put")
	}
	if p.Uuid == "" {
		log.Printf("Blank uuid, using url-path")
		p.Uuid = element
	}
	if p.Uuid != element {
		return fmt.Errorf("Thing url path %s doesn't match json-specified name %s", element, p.Uuid)
	}
	if p.exists(element) {
		return p.update()
	}
	return p.save()
}

func (p Participant) exists(element string) bool {
	var existing Participant
	err := existing.Get(element)
	exists := true
	if err != nil {
		gerr, ok := err.(gondulapi.Error)
		if ok && gerr.Code == 404 {
			exists = false
		}
	}
	return exists
}

func (p Participant) save() error {
	return db.Insert("participants", p)
}

func (p Participant) update() error {
	return db.Update("participants", "uuid", p.Uuid, p)
}

// Post stores the provided object. It's bugged. I know.
func (p Participant) Post() error {
	if p.exists(p.Uuid) {
		return p.update()
	}
	return p.save()
}

// Delete is called to delete an element.
func (p Participant) Delete(element string) error {
	_, err := db.DB.Exec("DELETE FROM participants WHERE uuid = $1", element)
	if err != nil {
		log.Printf("%v", err)
	}
	return err
}
