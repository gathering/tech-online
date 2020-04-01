
Hints
=====

Management
----------

The management checks test two things. First, they ping the IP of the
uplink-interface for the relevant switch. This means you need to have
linknets working.

If they successfully ping, they also try ssh. The switches have been
pre-configured with ssh and a user, so as long as they are online, this
_should_ work.

Normally, a switch or router doesn't have a console cable attached, so we
depend on management access over ssh to control them. In many setups it's
common to assign a specific management IP, but for simplicity, we're
skipping that part.

If you do feel like adding that, you can pick any unused IP address in the
10.x.0.0/16 range assigned to you, for example 10.1.99.10/32 for the
distro, 10.1.99.100/32 for edge0 and 10.1.99.101/32 for edge. But this is
optional.

You probably want to read about how to get linknets working if these tests
fail. But if these tests fail, some other tests will be skipped since they
require management access to succeed.

Linknet
-------

A link-net is a tiny network of two peers that connect one router
to an other.

Since the core is configured correctly, you can use that as an
indicator of whether you are doing it right. To get a link-net up
in this environment, you need two things:

1. You need to set of an aggregated interface (a bond interface).
   All uplinks use two physical links, and to bond them together,
   we use LACP / 802.3ad. See the "setting up LACP" hint in the
   reference documentation.
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
