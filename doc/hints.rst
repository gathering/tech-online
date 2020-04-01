
Hint
====

Management
----------

Mangement IPs are not absolutely required, but make verification
much easier. In the general sense, a management address is an address that
is exclusively used for management - it isn't associated with a specific
interface.

In this environment, we expect them to be routed addresses - though there
are other ways of handling management addresses. A simple way of setting it
up is assigning the address to loop-back interface, and then ensuring that
it is announced with OSPF.

See the PDF for an example of how to assign an IP to an interface, and a
separate chapter for OSPF.

If you have set up a management IP but it still fails to verify, try
pinging the IP locally on the switch - if it replies, you've successfully
set up the IP, but it isn't routed. Check your routing and/or OSPF.

If it doesn't reply locally, double check your configuration and use 'show
interface' to see that the interface you've set it up on is actually up.

Linknet
-------

A link-net is a tiny network of two peers that connect one router
to an other.

Since the core is configured correctly, you can use that as an
indicator of whether you are doing it right. To get a link-net up
in this environment, you need two thinks:

1. You need to set of an aggregated interface (a bond interface).
   All uplinks use two physical links, and to bond them together,
   we use LACP / 802.3ad. See the "setting up LACP" hint in the
   PDF.
2. An IP address assigned to the aggregated interface.

If you are seeing a failure on _all_ linknets, both sides,
including core, that means your distro-core link doesn't have a
functional LACP link. If it did, the ae0-interface on core would be
set to state "up" and it would reply to ping on 10.99.200.1 - even
if the other side of the link didn't have the correct IP set up.

If the core-side the linknet replies to ping, but not the distro
side, it means you have (probably) successfully configured LACP and
brought the aggregated link up, but you have not set up a valid IP
address on the interface - or the IP is not routed.

Double check if you have the correct IP set up and if it is using
the correct netmask. It should be /30 - this applies to all the
linknets we use.

If the correct IP is set up, try pinging directly between the peers. E.g.:
try pinging distr0's linknet IP from edge0, and vice versa. If that works,
but this test still fails, it means the linknet is set up correctly, but is
not exposed with OSPF to core, or the router isn't aware of the
return-route - also managed by OSPF. E.g.: You need ospf :)

LACP
----

You need to configure LACP on the distro-side of the core-distro link.

This requires .....insert text here.

Participant
-----------

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
