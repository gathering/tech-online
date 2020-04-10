1. Connect to edge0, what you want to do is set all client ports to belong
   to "family ethernet-switching". This is probably best done with ``set
   interfaces interface-range clients member-range ge-0/0/2 to ge-0/0/47``,
   and then applying any other interface-statements to the ``clients``
   interface range. See `Reference documentation`_ for examples.
2. Once this is done, basic switching works, but there's no way for you to
   know and there's no way to test. You have created a LAN with no
   connection to the outside world.
3. Each such port is connected to a vlan, by default, this is the `default`
   vlan - you can look at it with ``show vlans default``.
4. Assign a "layer 3" interface to the default vlan, it should be named
   `vlan.0`.
5. Assign an IP address to the `vlan.0` interface.
6. Check if vlan.0 is up with ``show interface vlan.0``.
7. Ping 10.x.100.2 locally from edge0 - it should now reply (locally).
8. To get it working globally, you need to log in to distro0 and create a
   static route for 10.x.100.0/24 via 10.x.200.6 (the edge0 linknet IP).
9. Check that it works.
10. Do the same for edge1 :D

If you made it this far, the verify script should be very happy just about
now, and you should be happy as well!
