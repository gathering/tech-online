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


