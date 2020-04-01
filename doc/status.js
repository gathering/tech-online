var b = null
function update() {
   if (b != null) {
	   kek.removeChild(b)
   }
   b = kek.createTBody()
   ok=0
   total=0
   last_header=""
   last_header_c = null
   for (t in data.tests) {
     if (last_header != data.tests[t].header) {
        if (last_header_c != null) {
          if (this_ok == this_tot) {
            last_header_c.bgColor = "green"
          } else {
            last_header_c.bgColor = "red"
          }
        }
        row = b.insertRow()
        row.classList.add("h4")
        c = row.insertCell()
        c.colSpan = 3
        c.innerText = data.tests[t].header
        last_header = data.tests[t].header
        last_header_c = c
        this_ok = 0
        this_tot = 0
     }
     row = b.insertRow()
     c2 = row.insertCell()
     c3 = row.insertCell()
     c4 = row.insertCell()
     c2.innerText = t
     state = data.tests[t].state
     c3.innerText = state
     this_tot++
     if (state == "ok") {
       row.classList.add("success")
       this_ok++
       ok++
     } else {
       if (state == "fail") {
          row.classList.add("danger")
          console.log(state)
          c3.innerHTML = 'fail <a href="#' + data.tests[t].header.toLowerCase() + '">(hint?)</a>'
       } else {
          row.classList.add("warning")
       }
     }
     c4.innerText = data.tests[t].test
     total++
   }
        if (last_header_c != null) {
          if (this_ok == this_tot) {
            last_header_c.bgColor = "green"
          } else {
            last_header_c.bgColor = "red"
          }
        }
   completion.innerHTML = "Completion: " + ok + " of " + t + " (" + (100 * ok/t) + "%) as of " + data.timestamp + " - check took " + data.runtime + ' seconds. (<a onclick="update()" href="#">Check for updates</a>)'
}

update()
