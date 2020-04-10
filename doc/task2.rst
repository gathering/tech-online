Now that distro0 is up, we want to get a link to edge0. We start on
distro0.

1. Edge0 is connected through ports ``ge-0/0/0`` and ``ge-1/0/0`` on
   distro0. Just as with your core link, you need to configure LACP to bond
   these to interfaces together.
2. Create an ``interface`` section for ``ge-0/0/0`` and ``ge-1/0/0`` that
   enables 802.3ad. Call the ae-interface ``ae100`` for convenience.
3. Set up "unit 0" on ae100. You will find the appropriate link-net IP in
   the reference documentation.
4. Once this is up, using ``show interfaces ae100 extensive`` should show
   the link as DOWN, but it should also show the IP and the physical ports
   should be listed as up. It's time to connect to edge0.
5. Open a screen session to ``edge0`` - log in.
6. On edge0, it's the same deal, but different interfaces: ``ge-0/0/0`` and
   ``ge-0/0/1`` is connected to the distro.
7. Do the same as step 2 and 3: Set up an ``interface`` section for the
   physical interfaces (``ge-0/0/0`` and ``ge-0/0/1``). For this end, use
   ``ae0``.
8. Set up an ``interface`` section for ``ae0`` and ``ae0`` unit 0, with the
   other end of the link-net IP.
9. Check ``show interfaces ae0``. It _should_ display as UP, and with the
   correct IP and bandwidth 2Gbps.
10. Verify: run ``ping 10.x.200.5`` on edge0 and ``ping 10.x.200.6`` on
    distro0: it should reply.
11. The verify-script will still only get a global reply from 10.x.200.5 -
    the distro side of the link.
12. Back on edge0, set up a static route using 10.x.200.5 as default
    gateway.
13. Verify should now get a global reply from both 10.x.200.5 and
    10.x.200.6

If you've gotten this far, you've gotten basic connectivity done! Good
work! Take a break, brag a bit.

Things to test: Try disabling an up-link with ``set interfaces ge-0/0/0
disable`` (in configure), then check the speed of ae0 with ``show
interfaces ae0``. Re-enable the uplink-port with ``delete interfaces
ge-0/0/0 disable``.
