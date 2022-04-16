Reset-rutine for net-track:

1. Bekreft at bruker er ferdig (muntlig eller lignende)
2. Log inn på stasjonen med pi
3. killall -u techo
4. Endre passord 'sudo passwd tech'
5. Dissassosier brukeren med stasjonen (FIXME: Hvordan? :D) og lagre
   passord i stasjone - kjør ./pwchange.sh STASJONSNR auth-info
6. Kjør bootscrap script for alle devicer - tips: tmux og 'tmux-all'
   scriptet fyrer av alt. Følg litt med og vent. Tar glatt 5-15 minutter.
7. Når bootstrap er ferdig, oppdater endepunktet igjen med ny timeslot
   eller noe sånt.
