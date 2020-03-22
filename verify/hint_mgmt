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
