The final task!

Two achieve this goal, you need to assign a "l3-interface" to the
participant network, so you will be able to associate an IP address with
all the client-ports.

This is achieved by assigning a vlan to all the ports in the "interfaces"
section, defining the vlan in the "vlans" section with an "l3-interface"
statement, referring to the logical interface to use - typically vlan.0.

But, you are lucky! The default configuration pretty much does all of this
for you, except assign an IP to vlan.0. This can be done the same way you
assign an IP to any other interface - look it up in the provided PDF!

PS: Be aware that if there are no active physical ports, the vlan-interface
will be down and not reply to ping. This is why you will not be able to
ping 10.1.101.1, even if you've configured edge1 correctly.
