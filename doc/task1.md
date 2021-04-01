0. Skim through this entire document! There is a ton of useful information!
1. Find the distro switch with screen
2. The distribution switch has two cables connected to the core (see the
   `Reference documentation`_ chapter) and you need to configure them as an
   aggregated interface.
3. Set up LACP on distro0, ae0, towards core (see `Tips and tricks`_). That
   means setting up an `interfaces` section for both physical devices -
   or a interfaces-range that cover both.
4. Set up "unit 0" on ae0 on the distro. It needs to have the link-net IP
   provided in the `Reference documentation`_ chapter.
5. Check that your uplink ports (`ge-0/0/46` and `ge-0/0/46`) are listed as
   "up" when you use `show interfaces`.
6. If they are, check that `ae0.0` is up with `show interfaces ae0.0
   extensive`.
7. If you've done everything right up until now, the status page should tell you
   that 10.x.200.2 replies to ping from core, but not globally.
8. Let your distro switch know that `10.x.200.1` is your default route. See
   `Reference documentation`_ on routing to accomplish this.
9. At this point, you should be able to run `ping 8.8.8.8` from the
   distro0 switch and get a reply, and the status page should state
   that `10.x.200.2` replies both from core and globally.

At this point you have a working distro0 switch! Be happy! Take a break.

Interesting things to try: Try ``ssh 10.x.200.2`` from the jumphost
directly. It should let you ssh directly to the switch.

Pit falls:

- You may need to delete automatically created interface statements using
  `delete interfaces ge-0/0/047` (etc) before you are allowed to update it.
- Check if the interfaces are listed as "Up" with `show interface
  ge-0/0/47`. Start with the physical interfaces (ge-*), then the ae*.
- You can run `ping 10.x.200.2` and `ping 10.x.200.1` on the console, if
  only your side responds, check if you forgot to add `lacp active` on the
  ae-interface and if the interfaces are all up with `show interface ae0
  extensive`
