Reset-rutine for net-track:

1. Bekreft at bruker er ferdig (muntlig eller lignende)
2. Log inn på stasjonen med pi
3. killall -u tech
4. Endre passord 'sudo passwd tech'
5. Dissassosier brukeren med stasjonen (FIXME: Hvordan? :D) og lagre
   passord i stasjonen
   CIRKA: curl https://techo.gathering.org/api/station/1932481b-4126-4cf3-8913-49d0faff75f5/ -X PUT --data '{"id":"1932481b-4126-4cf3-8913-49d0faff75f5","track":"net","shortname":"2","name":"Station #2","status":"active","credentials":"ssh address, username, whatever, NEW secret password","notes":"","timeslot":""}'

6. Kjør bootscrap script for alle devicer - tips: tmux og 'tmux-all'
   scriptet fyrer av alt. Følg litt med og vent. Tar glatt 5-15 minutter.
7. Når bootstrap er ferdig, oppdater endepunktet igjen med ny timeslot
   eller noe sånt.
