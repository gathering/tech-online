/*
Tech:Online runner
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

package main

import (
	"github.com/gathering/gondulapi/db"
	"github.com/gathering/gondulapi/receiver"
	gapi "github.com/gathering/gondulapi"
	_ "github.com/gathering/tech-online/backend"
)

func main() {
	if err := gapi.ParseConfig("backend.json"); err != nil {
		panic(err)
	}
	if err := db.Connect(); err != nil {
		panic(err)
	}
	receiver.Start()
}
