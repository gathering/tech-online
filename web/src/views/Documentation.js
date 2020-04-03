import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './documentation.scss';

const _scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView();
    }
};

const Documentation = () => {
    const { hash, pathname } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            _scrollTo(id);
        }
    }, [hash]);

    const HashNavLink = ({ title }) => {
        const to = title.toLowerCase().replace(':', '').replace('?', '').replace(' - ', ' ').split(' ').join('-');
        const toHash = '#' + to;
        return (
            <NavLink
                to={pathname + toHash}
                isActive={() => toHash === hash}
                onClick={() => {
                    if (toHash === hash) {
                        _scrollTo(to);
                    }
                }}
            >
                {title}
            </NavLink>
        );
    };

    return (
        <div className="documentation">
            <div className="documentation-menu">
                <ol>
                    <li>
                        <HashNavLink title="intro" />
                        <ol>
                            <li>
                                <HashNavLink title="The task at hand" />
                            </li>
                            <li>
                                <HashNavLink title="End result" />
                            </li>
                        </ol>
                    </li>
                    <li>
                        <HashNavLink title="Progress" />
                        <ol>
                            <li>
                                <HashNavLink title="Environment" />
                            </li>
                            <li>
                                <HashNavLink title="Suggested Progress" />
                                <ol>
                                    <li>
                                        <HashNavLink title="Phase 1: First linknet" />
                                    </li>
                                    <li>
                                        <HashNavLink title="Phase 2: Establish a link to edge0" />
                                    </li>
                                    <li>
                                        <HashNavLink title="Phase 3: Rinse and repeat for edge1" />
                                    </li>
                                    <li>
                                        <HashNavLink title="Phase 4: Get a client on-line" />
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <HashNavLink title="Reference documentation" />
                        <ol>
                            <li>
                                <HashNavLink title="Topology" />
                            </li>
                            <li>
                                <HashNavLink title="Hardware" />
                            </li>
                            <li>
                                <HashNavLink title="Console" />
                            </li>
                            <li>
                                <HashNavLink title="Pre-configured" />
                            </li>
                            <li>
                                <HashNavLink title="Core" />
                            </li>
                            <li>
                                <HashNavLink title="Pictures" />
                            </li>
                            <li>
                                <HashNavLink title="Credentials" />
                            </li>
                            <li>
                                <HashNavLink title="IP-plan" />
                            </li>
                            <li>
                                <HashNavLink title="Table" />
                            </li>
                        </ol>
                    </li>
                    <li>
                        <HashNavLink title="Tips and tricks" />
                        <ol>
                            <li>
                                <HashNavLink title="Basic Junos CLI" />
                            </li>
                            <li>
                                <HashNavLink title="Aggregated interfaces" />
                                <ol>
                                    <li>
                                        <HashNavLink title="LACP?" />
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <HashNavLink title="Linknets - theory and practice" />
                                <ol>
                                    <li>
                                        <HashNavLink title="LACP and linknets" />
                                    </li>
                                    <li>
                                        <HashNavLink title="Routing - theory" />
                                    </li>
                                    <li>
                                        <HashNavLink title="Routing - practice" />
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <HashNavLink title="Leftovers" />
                                <ol>
                                    <li>
                                        <HashNavLink title="Virtual chassis" />
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
            <div className="documentation-container">
                <div className="section" id="intro">
                    <h2>1&nbsp;&nbsp;&nbsp;Intro</h2>
                    <div className="admonition warning">
                        <p className="first admonition-title">Warning</p>
                        <p className="last">
                            This is a WORK IN PROGRESS and is currently the first iteration of a _pilot_. It WILL
                            change.
                        </p>
                    </div>
                    <div className="section" id="the-task-at-hand">
                        <h3>1.1&nbsp;&nbsp;&nbsp;The task at hand</h3>
                        <p>
                            Our job is simple: We want to get FOO online. FOO is connected to a switch, the switch is
                            connected to a distribution switch and the distribution switch is connected to the internet.
                        </p>
                        <p>
                            But to support thousands of users, we need to do network segmentation. Your job is to
                            configure the Juniper-switches to get FOO online. There are varying degrees of guidance
                            throughout the event.
                        </p>
                        <p>The rest of this document is split in three:</p>
                        <ol className="arabic simple">
                            <li>
                                A suggested progression which should allow you to get things gradually up and running
                                and see actual progress. You do not have to follow this, but it is strongly recommended.
                            </li>
                            <li>
                                Facts about both the hardware configuration and expected IP plan. You need this. Parts
                                of the IP plan is mandatory, the rest is strongly recommended.
                            </li>
                            <li>
                                <HashNavLink title="Intro to junos, networking and general tips and tricks which are highly relevant." />
                            </li>
                        </ol>
                        <p>
                            You should also watch the verification tool, which provide generous hints to get you going
                            and will refer you back to this document.
                        </p>
                        <p>If in doubt: Ask for help or hints on Discord!</p>
                    </div>
                    <div className="section" id="end-result">
                        <h3>1.2&nbsp;&nbsp;&nbsp;End result</h3>
                        <p>This is exactly what is being checked for:</p>
                        <ol className="arabic simple">
                            <li>
                                The FOO pc at 10.x.100.2 needs to successfully get ping replies from the internet. You
                                should also be able to ping it from your jumphost.
                            </li>
                            <li>
                                LACP needs to be configured between the distro and core and between distro and each edge
                                switch.
                            </li>
                            <li>
                                <HashNavLink title="Likewise: linknets need to work." />
                            </li>
                            <li>
                                <HashNavLink title="The systems should reply to ssh (they do already if brought on-line)." />
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="section" id="progress">
                    <h2>2&nbsp;&nbsp;&nbsp;Progress</h2>
                    <div className="section" id="environment">
                        <h3>2.1&nbsp;&nbsp;&nbsp;Environment</h3>
                        <p>You need an SSH client, if you are on windows "PuTTy" is recommended.</p>
                        <p>
                            You will be provided an IP address, port and a username and password to SSH to, this is
                            where you will work.
                        </p>
                        <p>Start by making sure that works. You may want to use multiple windows.</p>
                        <p>
                            To connect to a switch, run the commands{' '}
                            <tt className="docutils literal">screen /dev/ttyUSB0</tt> for the first switch, and{' '}
                            <tt className="docutils literal">screen /dev/ttyUSB1</tt> for the second, and so on for
                            <tt className="docutils literal">/dev/ttyUSB2</tt> and{' '}
                            <tt className="docutils literal">/dev/ttyUSB3</tt>. You may have to hit "enter" to get an
                            actual prompt the first time.
                        </p>
                        <p>
                            Two of those <tt className="docutils literal">/dev/ttyUSB</tt> devices will be the EX3300
                            distribution switch - you can use either - see if you can figure out why there are two...
                        </p>
                        <p>
                            Once screen is running, you can exit screen with{' '}
                            <tt className="docutils literal">ctrl+a d</tt> - that is, hold CTRL while pressing{' '}
                            <tt className="docutils literal">a</tt>, let go, then press d. This will "detach" and you
                            can "re-attach" with{' '}
                            <tt className="docutils literal">
                                screen <span className="pre">-r</span>
                            </tt>
                            .
                        </p>
                        <p>
                            The machine you have ssh'ed to is connected to the same network as your switches, so when
                            things are configured, you can reach FOO from that machine. But you do not have to worry
                            about locking yourself out: The console access you have is "out of band" and does not
                            require the switches to work (beyond being able to see a login prompt).
                        </p>
                    </div>
                    <div className="section" id="suggested-progress">
                        <h3>2.2&nbsp;&nbsp;&nbsp;Suggested progress</h3>
                        <p>Typically there are three general strategies when setting up a network:</p>
                        <ol className="arabic simple">
                            <li>
                                <HashNavLink title="Start at the client and work towards the internet/core" />
                            </li>
                            <li>
                                <HashNavLink title="Start at the core and work towards the client" />
                            </li>
                            <li>
                                <HashNavLink title="Random order" />
                            </li>
                        </ol>
                        <p>
                            Because it makes it much easier to test, we recommend following option number 2.
                            Specifically:
                        </p>
                        <div className="section" id="phase-1-first-linknet">
                            <h4>2.2.1&nbsp;&nbsp;&nbsp;Phase 1: First linknet</h4>
                            <ol className="arabic simple" start="0">
                                <li>
                                    <HashNavLink title="Skim through this entire document! There is a ton of useful information!" />
                                </li>
                                <li>
                                    <HashNavLink title="Find the distro switch with screen" />
                                </li>
                                <li>
                                    The distribution switch has two cables connected to the core (see the
                                    <a className="reference internal" href="#reference-documentation">
                                        Reference documentation
                                    </a>{' '}
                                    chapter) and you need to configure them as an aggregated interface.
                                </li>
                                <li>
                                    Set up LACP on distro0, ae0, towards core (see{' '}
                                    <a className="reference internal" href="#tips-and-tricks">
                                        Tips and tricks
                                    </a>
                                    ). That means setting up an <tt className="docutils literal">interfaces</tt> section
                                    for both physical devices - or a interfaces-range that cover both.
                                </li>
                                <li>
                                    Set up "unit 0" on ae0 on the distro. It needs to have the link-net IP provided in
                                    the{' '}
                                    <a className="reference internal" href="#reference-documentation">
                                        Reference documentation
                                    </a>{' '}
                                    chapter.
                                </li>
                                <li>
                                    Check that your uplink ports (<cite>ge-0/0/46</cite> and <cite>ge-0/0/46</cite>) are
                                    listed as "up" when you use <tt className="docutils literal">show interfaces</tt>.
                                </li>
                                <li>
                                    If they are, check that <tt className="docutils literal">ae0.0</tt> is up with{' '}
                                    <tt className="docutils literal">show interfaces ae0.0 extensive</tt>.
                                </li>
                                <li>
                                    If you've done everything right up until now, verify.sh should tell you that
                                    10.x.200.2 replies to ping from core, but not globally.
                                </li>
                                <li>
                                    Let your distro switch know that <cite>10.x.200.1</cite> is your default route. See
                                    <a className="reference internal" href="#reference-documentation">
                                        Reference documentation
                                    </a>{' '}
                                    on static routing to accomplish this.
                                </li>
                                <li>
                                    At this point, you should be able to run{' '}
                                    <tt className="docutils literal">ping 192.168.2.2</tt> from the distro0 switch and
                                    get a reply, and the verification script should state that <cite>10.x.200.2</cite>{' '}
                                    replies both from core and globally.
                                </li>
                            </ol>
                            <p>At this point you have a working distro0 switch! Be happy! Take a break.</p>
                            <p>
                                Interesting things to try: Try <tt className="docutils literal">ssh 10.x.200.2</tt> from
                                the jumphost directly. It should let you ssh directly to the switch.
                            </p>
                        </div>
                        <div className="section" id="phase-2-establish-a-link-to-edge0">
                            <h4>2.2.2&nbsp;&nbsp;&nbsp;Phase 2: Establish a link to edge0</h4>
                            <p>Now that distro0 is up, we want to get a link to edge0. We start on distro0.</p>
                            <ol className="arabic simple">
                                <li>
                                    Edge0 is connected through ports{' '}
                                    <tt className="docutils literal">
                                        <span className="pre">ge-0/0/0</span>
                                    </tt>{' '}
                                    and{' '}
                                    <tt className="docutils literal">
                                        <span className="pre">ge-1/0/0</span>
                                    </tt>{' '}
                                    on distro0. Just as with your core link, you need to configure LACP to bond these to
                                    interfaces together.
                                </li>
                                <li>
                                    Create an <tt className="docutils literal">interface</tt> section for{' '}
                                    <tt className="docutils literal">
                                        <span className="pre">ge-0/0/0</span>
                                    </tt>{' '}
                                    and{' '}
                                    <tt className="docutils literal">
                                        <span className="pre">ge-1/0/0</span>
                                    </tt>{' '}
                                    that enables 802.3ad. Call the ae-interface{' '}
                                    <tt className="docutils literal">ae100</tt> for convenience.
                                </li>
                                <li>
                                    Set up "unit 0" on ae100. You will find the appropriate link-net IP in the reference
                                    documentation.
                                </li>
                                <li>
                                    Once this is up, using{' '}
                                    <tt className="docutils literal">show interfaces ae100 extensive</tt> should show
                                    the link as DOWN, but it should also show the IP and the physical ports should be
                                    listed as up. It's time to connect to edge0.
                                </li>
                                <li>
                                    Open a screen session to <tt className="docutils literal">edge0</tt> - log in.
                                </li>
                                <li>
                                    On edge0, it's the same deal, but different interfaces:{' '}
                                    <tt className="docutils literal">
                                        <span className="pre">ge-0/0/0</span>
                                    </tt>{' '}
                                    and
                                    <tt className="docutils literal">
                                        <span className="pre">ge-0/0/1</span>
                                    </tt>{' '}
                                    is connected to the distro.
                                </li>
                                <li>
                                    Do the same as step 2 and 3: Set up an{' '}
                                    <tt className="docutils literal">interface</tt> section for the physical interfaces
                                    (
                                    <tt className="docutils literal">
                                        <span className="pre">ge-0/0/0</span>
                                    </tt>{' '}
                                    and{' '}
                                    <tt className="docutils literal">
                                        <span className="pre">ge-0/0/1</span>
                                    </tt>
                                    ). For this end, use
                                    <tt className="docutils literal">ae0</tt>.
                                </li>
                                <li>
                                    Set up an <tt className="docutils literal">interface</tt> section for{' '}
                                    <tt className="docutils literal">ae0</tt> and{' '}
                                    <tt className="docutils literal">ae0</tt> unit 0, with the other end of the link-net
                                    IP.
                                </li>
                                <li>
                                    Check <tt className="docutils literal">show interfaces ae0</tt>. It _should_ display
                                    as UP, and with the correct IP and bandwidth 2Gbps.
                                </li>
                                <li>
                                    Verify: run <tt className="docutils literal">ping 10.x.200.5</tt> on edge0 and{' '}
                                    <tt className="docutils literal">ping 10.x.200.6</tt> on distro0: it should reply.
                                </li>
                                <li>
                                    The verify-script will still only get a global reply from 10.x.200.5 - the distro
                                    side of the link.
                                </li>
                                <li>
                                    <HashNavLink title="Back on edge0, set up a static route using 10.x.200.5 as default gateway." />
                                </li>
                                <li>
                                    <HashNavLink title="Verify should now get a global reply from both 10.x.200.5 and 10.x.200.6" />
                                </li>
                            </ol>
                            <p>
                                If you've gotten this far, you've gotten basic connectivity done! Good work! Take a
                                break, brag a bit.
                            </p>
                            <p>
                                Things to test: Try disabling an up-link with{' '}
                                <tt className="docutils literal">
                                    set interfaces <span className="pre">ge-0/0/0</span>
                                    disable
                                </tt>{' '}
                                (in configure), then check the speed of ae0 with{' '}
                                <tt className="docutils literal">show interfaces ae0</tt>. Re-enable the uplink-port
                                with{' '}
                                <tt className="docutils literal">
                                    delete interfaces
                                    <span className="pre">ge-0/0/0</span> disable
                                </tt>
                                .
                            </p>
                        </div>
                        <div className="section" id="phase-3-rinse-and-repeat-for-edge1">
                            <h4>2.2.3&nbsp;&nbsp;&nbsp;Phase 3: Rinse and repeat for edge1</h4>
                            <p>
                                There are two edge-switches, so now you get to do phase 2 all over again. Instead of
                                repeating the instructions, here's a tip:
                            </p>
                            <p>
                                <tt className="docutils literal">show configuration interfaces | display set</tt> can be
                                used to extract set-statements, edit (in vim/notepad/whatever), and paste it back in.
                                Just remember to modify the IP addresses!
                            </p>
                            <p>
                                By the end of this phase, all three switches should be fully connected, everything
                                should verify correctly, except that the client FOO is still not on-line.
                            </p>
                        </div>
                        <div className="section" id="phase-4-get-a-client-on-line">
                            <h4>2.2.4&nbsp;&nbsp;&nbsp;Phase 4: Get a client on-line!</h4>
                            <ol className="arabic simple">
                                <li>
                                    Connect to edge0, what you want to do is set all client ports to belong to "family
                                    ethernet-switching". This is probably best done with{' '}
                                    <tt className="docutils literal">
                                        set interfaces <span className="pre">interface-range</span> clients{' '}
                                        <span className="pre">member-range</span> <span className="pre">ge-0/0/2</span>{' '}
                                        to <span className="pre">ge-0/0/47</span>
                                    </tt>
                                    , and then applying any other interface-statements to the{' '}
                                    <tt className="docutils literal">clients</tt>
                                    interface range. See{' '}
                                    <a className="reference internal" href="#reference-documentation">
                                        Reference documentation
                                    </a>{' '}
                                    for examples.
                                </li>
                                <li>
                                    Once this is done, basic switching works, but there's no way for you to know and
                                    there's no way to test. You have created a LAN with no connection to the outside
                                    world.
                                </li>
                                <li>
                                    Each such port is connected to a vlan, by default, this is the <cite>default</cite>
                                    vlan - you can look at it with{' '}
                                    <tt className="docutils literal">show vlans default</tt>.
                                </li>
                                <li>
                                    Assign a "layer 3" interface to the default vlan, it should be named
                                    <cite>vlan.0</cite>.
                                </li>
                                <li>
                                    Assign an IP address to the <cite>vlan.0</cite> interface.
                                </li>
                                <li>
                                    Check if vlan.0 is up with{' '}
                                    <tt className="docutils literal">show interface vlan.0</tt>.
                                </li>
                                <li>
                                    <HashNavLink title="Ping 10.x.100.2 locally from edge0 - it should now reply (locally)." />
                                </li>
                                <li>
                                    To get it working globally, you need to log in to distro0 and create a static route
                                    for 10.x.100.0/24 via 10.x.200.6 (the edge0 linknet IP).
                                </li>
                                <li>
                                    <HashNavLink title="Check that it works." />
                                </li>
                                <li>
                                    <HashNavLink title="Do the same for edge1 :D" />
                                </li>
                            </ol>
                            <p>
                                If you made it this far, the verify script should be very happy just about now, and you
                                should be happy as well!
                            </p>
                            <p>
                                Things to try: You may want to set up OSPF instead of all this static routing. For our
                                3-switch example, it's not a big deal, but as you can imagine, keeping track of which
                                network belongs where can get bothersome. Try deleting all the static routing, except
                                the default route on distr0, and setting up OSPF. It isn't nearly as tricky as it might
                                sound.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="section" id="reference-documentation">
                    <h2>3&nbsp;&nbsp;&nbsp;Reference documentation</h2>
                    <div className="section" id="topology">
                        <h3>3.1&nbsp;&nbsp;&nbsp;Topology</h3>
                        <object data="http://techo.gathering.org/topology.svg" className="w-80" type="image/svg+xml">
                            topology.svg
                        </object>
                    </div>
                    <div className="section" id="hardware">
                        <h3>3.2&nbsp;&nbsp;&nbsp;Hardware</h3>
                        <img alt="overview.jpg" src="http://techo.gathering.org/overview.jpg" className="w-80" />
                        <p>Two edge switches, EX2200.</p>
                        <p>Two distro-switches, EX3300, already configured for virtual-chassis.</p>
                        <p>The bottom-most EX4300 is the core, and excluded from the event.</p>
                        <p>From the distro:</p>
                        <pre className="literal-block">
                            {`kly@distro0&gt; show lldp neighbors
Local Interface    Parent Interface  Chassis Id          Port info    System Name
ge-1/0/0.0         ae100.0           44:f4:77:68:d9:c0   ge-0/0/0.0   edge0
ge-0/0/0.0         ae100.0           44:f4:77:68:d9:c0   ge-0/0/1.0   edge0
ge-1/0/1.0         ae101.0           44:f4:77:69:2b:80   ge-0/0/0.0   edge1
ge-0/0/1.0         ae101.0           44:f4:77:69:2b:80   ge-0/0/1.0   edge1
ge-0/0/47.0        ae0.0             44:f4:77:ff:9d:00   ge-0/0/22    klycore
ge-1/0/47.0        ae0.0             44:f4:77:ff:9d:00   ge-0/0/23    klycore
`}
                        </pre>
                        <p>
                            In the distro, FPC0 is the first virtual-chassis member (the first EX3300), and FPC1 is the
                            second. It is fairly irrelevant which is which, since they are set up identically. This
                            means any port starting with{' '}
                            <tt className="docutils literal">
                                <span className="pre">ge-0/x/x</span>
                            </tt>
                            ,
                            <tt className="docutils literal">
                                <span className="pre">xe-0/x/x</span>
                            </tt>{' '}
                            or similar is on the first EX3300 switch, while{' '}
                            <tt className="docutils literal">
                                <span className="pre">ge-1/x/x</span>
                            </tt>
                            and{' '}
                            <tt className="docutils literal">
                                <span className="pre">xe-1/x/x</span>
                            </tt>{' '}
                            is on the second one.
                        </p>
                        <p>
                            On the edge,{' '}
                            <tt className="docutils literal">
                                <span className="pre">ge-0/0/0</span>
                            </tt>{' '}
                            and{' '}
                            <tt className="docutils literal">
                                <span className="pre">ge-0/0/1</span>
                            </tt>{' '}
                            is used for uplinks. At The Gathering we tend to use{' '}
                            <tt className="docutils literal">
                                <span className="pre">ge-0/0/44</span>
                            </tt>{' '}
                            to{' '}
                            <tt className="docutils literal">
                                <span className="pre">ge-0/0/47</span>
                            </tt>{' '}
                            - but this was flipped for Tech:Online - again, for purely practical reasons.
                        </p>
                        <p>
                            A laptop is attached to edge0, exactly which port is irrelevant and might change - all ports
                            not dedicated to uplink is expected to work.
                        </p>
                    </div>
                    <div className="section" id="console">
                        <h3>3.3&nbsp;&nbsp;&nbsp;Console</h3>
                        <p>
                            Console access is achieved by ssh'ing to the jumphost (access provided separately). Please
                            do not miss-use this trust.
                        </p>
                        <p>
                            Please ask before installing things or chaning the system on the jumphost. You do have
                            sudo-access for the moment, but please behave.
                        </p>
                        <p>
                            You are connecting to a raspberry pi, which has 4 USB-to-serial adapters attached and is
                            hooked up to each of the involved switches directly. This means that it is very difficult to
                            lock yourself out of the lab.
                        </p>
                        <p>
                            To use the console, log in with ssh and issue{' '}
                            <tt className="docutils literal">screen /dev/ttyUSBx</tt>, where, x is 0, 1, 2, 3. Since the
                            order in which the pi loads the USB drivers seem to vary, it is not possible to tell ahead
                            of time which ttyUSB is which switch, since it might change at boot. Sorry.
                        </p>
                    </div>
                    <div className="section" id="pre-configured">
                        <h3>3.4&nbsp;&nbsp;&nbsp;Pre-configured</h3>
                        <p>For convenience, the following is set up:</p>
                        <ol className="arabic simple">
                            <li>
                                The distro-switch is already in a virtual-chassis. It is NOT set to avoid split-brain.
                                You may want to do that.
                            </li>
                            <li>
                                Each switch has a "tech" user set up. It currently has super-user className. See the
                                "credentials" section for credentials.
                            </li>
                            <li>
                                <HashNavLink title="Each switch has a host-name set." />
                            </li>
                            <li>
                                <HashNavLink title="Each switch has ntp set up - but you wont notice that unless you get it running." />
                            </li>
                            <li>
                                <HashNavLink title="No other configuration is present." />
                            </li>
                        </ol>
                        <p>
                            You are free to use 'request system zeroize' if you like. The base configuration is present
                            on the jump-host ready to be used if you do.
                        </p>
                    </div>
                    <div className="section" id="core">
                        <h3>3.5&nbsp;&nbsp;&nbsp;Core</h3>
                        <p>
                            The core - which the distro0 is connected to - is a EX4300 and is outside the scope of this
                            exercise. For your convenience it provides a link-net (see below for IPs) and ospf, area
                            0.0.0.0, and a default route is exported. It should be trivial to utilize.
                        </p>
                        <p>It is set up with 802.3ad / lacp for the uplinks.</p>
                    </div>
                    <div className="section" id="pictures">
                        <h3>3.6&nbsp;&nbsp;&nbsp;Pictures</h3>
                        <img alt="overview.jpg" src="http://techo.gathering.org/overview.jpg" className="w-80" />
                        <img alt="ports1.jpg" src="http://techo.gathering.org/ports1.jpg" className="w-80" />
                        <img alt="ports2.jpg" src="http://techo.gathering.org/ports2.jpg" className="w-80" />
                        <img alt="overview2.jpg" src="http://techo.gathering.org/overview2.jpg" className="w-80" />
                    </div>
                    <div className="section" id="credentials">
                        <h3>3.7&nbsp;&nbsp;&nbsp;Credentials</h3>
                        <p>SSH to the provided IP using the provided username and password (FIXME).</p>
                        <p>
                            Switches are set up with a user called "tech", password "Juniperftw!". You are welcome to
                            set up other users.
                        </p>
                        <pre className="literal-block">{`user: tech
pass: Juniperftw!`}</pre>
                        <p>Commands:</p>
                        <ul className="simple">
                            <li>
                                <tt className="docutils literal">screen /dev/ttyUSB0</tt> - attach to console 0 (use
                                USB1, USB2, USB3 for the other devices).
                            </li>
                            <li>
                                <HashNavLink title="When in screen, exit with ctrl a+" />
                            </li>
                            <li>
                                You can also detach with ctrl a+d, but then you need to re-attach with "screen -r" to
                                open the same console again.
                            </li>
                        </ul>
                    </div>
                    <div className="section" id="ip-plan">
                        <h3>3.8&nbsp;&nbsp;&nbsp;IP-plan</h3>
                        <p>
                            This IP-plan is semi-fixed: The outer boundaries are set (uplink to core and "down-link" to
                            participant-laptop) and the exercise is designed with this in mind.
                        </p>
                        <p>
                            All IP's are in the 10.1.0.0/16 range. This is to accommodate multiple stations in parallel
                            in the future.
                        </p>
                        <p>
                            Management is at 10.1.99.0/24, routed normally. You are welcome to use an other approach or
                            ignore management address entirely. It is up to you.
                        </p>
                        <p>
                            Linknets are /30 wide (net, peer 1, peer 2, broadcast), and are in the 10.1.200.0/24 prefix.
                            The more central peer should have the lower number. But you're welcome to do what you please
                            with this. It's of little consequence.
                        </p>
                        <p>
                            There are two client networks defined. For edge0, it is 10.1.100.0/24, for edge1 it is
                            10.1.101.0/24. Terminating the client vlans at the edge is recommended for simplicity, but
                            you are also welcome to terminate them at the distribution switch.
                        </p>
                    </div>
                    <div className="section" id="table">
                        <h3>3.9&nbsp;&nbsp;&nbsp;Table</h3>
                        <p>(ok, not technically a table)</p>
                        <pre className="literal-block">
                            {`Top prefix: 10.1.0.0/16

Linknet: 10.1.200.0/24
edge0 clients: 10.1.100.0/24
edge1 clients: 10.1.101.0/24

Linknets

Core-link: 10.1.200.0/30
           10.1.200.1 - core
           10.1.200.2 - distro - ae0.0

edge0-d:   10.1.200.4/30
           10.1.200.5 - distro - ae100.0
           10.1.200.6 - edge0 - ae0.0

edge1-d:   10.1.200.8/30
           10.1.200.9 - distro - ae101.0
           10.1.200.10 - edge1 - ae0.0`}
                        </pre>
                    </div>
                </div>

                <div className="section" id="tips-and-tricks">
                    <h2>4&nbsp;&nbsp;&nbsp;Tips and tricks</h2>
                    <div className="section" id="basic-junos-cli">
                        <h3>4.1&nbsp;&nbsp;&nbsp;Basic Junos CLI</h3>
                        <p>First: Junos is Juniper's OS.</p>
                        <p>
                            Junos CLI is a command-line interface to configure and review Juniper hardware. This isn't a
                            complete guide, but a crash course.
                        </p>
                        <p>
                            First: Tab completion works, and '?' will give you extensive help. Learn to love it. You
                            also have "help reference (topic)".
                        </p>
                        <p>
                            You will be working mostly with the <tt className="docutils literal">show</tt> command to
                            review system status, the <tt className="docutils literal">ping</tt> command to ping
                            locally, and <tt className="docutils literal">configure</tt> to change configuration.
                        </p>
                        <p>
                            The actual CLI for <tt className="docutils literal">show</tt> is mostly self explanatory,
                            but here are a few hints:
                        </p>
                        <pre className="literal-block">
                            {`# Show all interfaces configured, with moderate amount of extra
# information
show interfaces

# Show a single interface, with extensive information
show interfaces ae0 extensive

# Show a one-line output per interface
show interfaces terse

# ... and look only for lines matching "ae"
show interfaces terse | match ae

# Show LLDP neighbors: LLDP is a protocol for discovering physically
# connected devices - it isn't fool proof, but it's  a great help
show lldp neighbours

# Others:
show chassis hardware
show version
show system uptime`}
                        </pre>
                        <p>
                            Configuration can be reviewed with <tt className="docutils literal">show configuration</tt>,
                            but to modify it, run <tt className="docutils literal">configure</tt> stand-alone, which
                            will enter configuration mode.
                        </p>
                        <p>
                            When in configuration mode, you can review the current configuration stance with{' '}
                            <tt className="docutils literal">show</tt> (by default: the entire configuration). You
                            modify the configuration by adding and deleting statements with{' '}
                            <tt className="docutils literal">set</tt> and
                            <tt className="docutils literal">delete</tt>. The configuration changes do <em>not</em> take
                            effect immediately, but only after you issue <tt className="docutils literal">commit</tt>,
                            which also does various checks first.
                        </p>
                        <p>
                            You can also issue <tt className="docutils literal">rollback</tt> to roll back the
                            configuration. Use
                            <tt className="docutils literal">rollback ?</tt> to see timestamps of versions you can roll
                            back to.
                        </p>
                        <p>
                            You can see what changes you've made prior to a commit with{' '}
                            <tt className="docutils literal">show | compare</tt>.
                        </p>
                        <p>
                            You can also combine all <tt className="docutils literal">show</tt> commands in
                            configuration mode with
                            <tt className="docutils literal">display set</tt>, which displays the configuration as{' '}
                            <tt className="docutils literal">set</tt>/<tt className="docutils literal">delete</tt>
                            commands, which is also suitable for copy/paste.
                        </p>
                        <p>Cheat sheet for configuration mode:</p>
                        <pre className="literal-block">
                            {`# Set options on a single interface
set interfaces ge-0/0/46 ether-options 802.3ad ae0

# Create an interface-range to avoid having a gazillion set-statements
set interfaces interface-range clients member-range ge-0/0/2 to ge-0/0/47
set interfaces interface-range clients description clients
set interfaces interface-range clients unit 0 family ethernet-switching

# You don't have to specify all set-commands to delete something under a
# "tree", so:
delete interfaces interface-range clients member-range ge-0/0/2 to ge-0/0/47
delete interfaces interface-range clients description clients
delete interfaces interface-range clients unit 0 family ethernet-switching

# might be better written as
delete interfaces interface-range clients

# Commit changes
show | compare
show | compare | display set
commit

# You can use "edit" to focus on a single section, so this:
set interfaces ae0 unit 0 family inet 10.1.200.2/30

# is the same as:
edit interfaces ae0
set family inet 10.1.200.2/30

# To get to the top again, use "top".
top

# Exit config mode - if you used "edit", it will exit that section
exit`}
                        </pre>
                    </div>
                    <div className="section" id="aggregated-interfaces">
                        <h3>4.2&nbsp;&nbsp;&nbsp;Aggregated interfaces</h3>
                        <p>
                            This is were terminology is annoying, because there are about fifty different words that
                            describe roughly the same thing. "Bonding", "trunk", "link aggregate groups", "aggregated
                            interfaces"... All refer to more or less the same thing.
                        </p>
                        <p>
                            The essence is: You have more than one physical link/cable going from A to B, and you want
                            to bundle them together and treat them as one logical interface.
                        </p>
                        <p>For us, this serves two purposes:</p>
                        <ol className="arabic simple">
                            <li>
                                If someone accidentally unplugs a cable, the switch will still be on-line (this happens
                                ALL THE TIME at The Gathering, specially on day 1)
                            </li>
                            <li>
                                <HashNavLink title="Increased bandwidth." />
                            </li>
                        </ol>
                        <p>
                            On Juniper, aggregated interfaces are named "aeX", where X is an arbitrary number you assign
                            to it. For convenience, we use ae0 to refer to "uplink to a bigger device".
                        </p>
                        <p>
                            To set up an aggregated interface, you need to first configure the _physical_ device to be
                            part of the aggregate, then configure the aggregated device itself.
                        </p>
                        <p>The first step is fairly simple:</p>
                        <pre className="literal-block">
                            {`delete interfaces ge-0/0/0
delete interfaces ge-0/0/1
set interfaces ge-0/0/0 ether-options 802.3ad ae0
set interfaces ge-0/0/1 ether-options 802.3ad ae0`}
                        </pre>
                        <p>It might be nicer to write:</p>
                        <pre className="literal-block">
                            {`delete interfaces ge-0/0/0
delete interfaces ge-0/0/1
set interfaces interface-range uplink description uplink
set interfaces interface-range uplink member ge-0/0/0
set interfaces interface-range uplink member ge-0/0/1
set interfaces interface-range uplink ether-options 802.3ad ae0`}
                        </pre>
                        <p>
                            Generally speaking, interface-ranges are very nice (though for two ports, it's not much of a
                            difference).
                        </p>
                        <p>
                            Next, you need to actually enable LACP on the device and configure a family to bring the
                            interface up:
                        </p>
                        <pre className="literal-block">
                            {`set interfaces ae0 description uplink
set interfaces ae0 aggregated-ether-options lacp active
set interfaces ae0 unit 0 family inet address 10.1.200.2/30`}
                        </pre>
                        <p>
                            To review this, commit it, exit config mode and see{' '}
                            <tt className="docutils literal">show interfaces ae0 extensive</tt>.
                        </p>
                        <div className="section" id="lacp">
                            <h4>4.2.1&nbsp;&nbsp;&nbsp;LACP?</h4>
                            <p>
                                LACP is the Link Aggregation Control Protocol. It is used explicitly to connect devices
                                with multiple ports, but most importantly, it is the protocol that figures out exactly
                                how many of the available links are actually working and how to deal with link failures.
                                For our purposes, it's not very exotic, but for more complex setups you can use LACP to
                                say that if less than 3 of these 5 links are up, then take the entire link down (so the
                                router can move the traffic to alternate routes).
                            </p>
                        </div>
                    </div>
                    <div className="section" id="linknets-theory-and-practice">
                        <h3>4.3&nbsp;&nbsp;&nbsp;Linknets - theory and practice</h3>
                        <p>
                            A link-net is a tiny IP network that works as an interconnect between two routers. A linknet
                            has two IP addresses assigned to it, one belonging to each of the interconnected devices. A
                            router can have multiple linknets if it is connected to multiple other routers.
                        </p>
                        <p>In our example, there are exactly three linknets:</p>
                        <ol className="arabic simple">
                            <li>
                                <HashNavLink title="A linknet between distro0 and core - you only have to configure one side of it." />
                            </li>
                            <li>
                                <HashNavLink title="A linknet between distro0 and edge0" />
                            </li>
                            <li>
                                <HashNavLink title="A linknet between distro0 and edge1" />
                            </li>
                        </ol>
                        <p>
                            Since it only requires two IP addresses, the netmask is 255.255.255.252, or more commonly
                            /30 - one IP for either end, plus an IP for the network and broadcast (it is also common to
                            use /31, but this is somewhat iffy).
                        </p>
                        <p>
                            Setting up a link-net is a two-step process. First you need to configure the physical link.
                            All the linknets we are using are established on top of multiple physical links - multiple
                            cables. So you first need to establish an aggregate interface (see the previous chapter).
                        </p>
                        <p>
                            Once the physical link is up, you need to set up an IP address on it. For juniper, this is
                            fairly easy. Let's assume we are working on the distro0 - edge1 connection. On distro0, you
                            run (assuming ae101 has LACP up):
                        </p>
                        <pre className="literal-block">
                            {`set interfaces ae101 description edge0
set interfaces ae101 unit 0 family inet address 10.1.200.9/30
commit`}
                        </pre>
                        <p>On the edge1 side, you match it up:</p>
                        <pre className="literal-block">
                            {`set interfaces ae0 description distro
set interfaces ae0 unit 0 family inet address 10.1.200.10/30
commit`}
                        </pre>
                        <p>After this, both sides should be able to ping 10.1.200.10 and 10.1.200.9.</p>
                        <p>And that's really all there is to it.</p>
                        <div className="section" id="lacp-and-linknets">
                            <h4>4.3.1&nbsp;&nbsp;&nbsp;LACP and linknets</h4>
                            <p>
                                To get a linknet that relies on LACP up and running you need to combine the LACP-example
                                and the linknet-ip.
                            </p>
                            <p>First, for interface ge-0/0/47 and ge-1/0/47, enable aggregation:</p>
                            <pre className="literal-block">
                                {`set interfaces ge-0/0/47 ether-options 802.3ad ae0
set interfaces ge-1/0/47 ether-options 802.3ad ae0`}
                            </pre>
                            <p>Then bring it all together in ae0:</p>
                            <pre className="literal-block">
                                {`set interfaces ae0 description uplink
set interfaces ae0 aggregated-ether-options lacp active
set interfaces ae0 unit 0 family inet address 10.1.200.2/30`}
                            </pre>
                            <p>Then commit and test.</p>
                            <p>To get routing working, you also need to enable OSPF on the interface.</p>
                            <p>
                                For the other linknets, you need to find the correct{' '}
                                <tt className="docutils literal">ge-</tt>-interfaces that are uplink and set the
                                pre-defined IP. You can use what-ever ae-number you want, though.
                            </p>
                        </div>
                        <div className="section" id="routing-theory">
                            <h4>4.3.2&nbsp;&nbsp;&nbsp;Routing - theory</h4>
                            <p>
                                Without routing, the router just knows about the IP networks it is directly attached to.
                                That means your distro-switch can ping the linknet IP of its peers, but nothing that is
                                connected to it.
                            </p>
                            <p>
                                For a regular computer, routing is trivial: You have a single router for all traffic.
                                For actual routers, it's slightly more complicated.
                            </p>
                            <p>
                                For edge0 we want to route <tt className="docutils literal">10.1.100.0/24</tt> from
                                distro0 to edge0's link-net IP, 10.1.200.6. And edge0 needs to have a default route so
                                all traffic is sent to the distro. That means for every network, all routers must have a
                                clear idea how to connect to each other. It's possible to set this up manually, using
                                "static routing", but it quickly gets cumbersome.
                            </p>
                            <p>
                                This creates two problems, first, the obvious: You need to update a ton of static routes
                                all over the place. Even with just three devices, it's very easy to make mistakes.
                                Secondly: If there are multiple routes from A to B, there is no way to handle that.
                            </p>
                            <p>
                                That's where dynamic routing comes into play. Dynamic routing is when two or more
                                routers use a protocol to communicate their routing information. There are multiple
                                protocols available, but we will be using OSPF - Open Shortest Path First.
                            </p>
                            <p>Core has already been set up with OSPF.</p>
                            <p>
                                OSPF can be somewhat complex, but on Junos, getting a simple setup like ours working is
                                next to trivial.
                            </p>
                        </div>
                        <div className="section" id="routing-practice">
                            <h4>4.3.3&nbsp;&nbsp;&nbsp;Routing - practice</h4>
                            <p>
                                Setting up basic OSPF on Junos is pretty straight forward. There are different
                                mechanisms that you want to use in a production environment, but for Tech:Online, you
                                just need to set up "area 0.0.0.0" and define what interfaces should participate.
                            </p>
                            <p>The short version is:</p>
                            <pre className="literal-block">set protocols ospf area 0.0.0.0 interface ae0.0</pre>
                            <p>
                                {`For distro0, you also need to enable it for "downstream" interfaces to edge0 and edge1:`}
                            </p>
                            <pre className="literal-block">
                                {`set protocols ospf area 0.0.0.0 interface ae100.0
set protocols ospf area 0.0.0.0 interface ae101.0`}
                            </pre>
                            <p>
                                On edge0 and edge1 you want to enable it on the upstream interface, but you also want to
                                enable it on the "client vlan", so but we don't need to actually communicate actively
                                there. This is a bit of a hack, but works well for our use case:
                            </p>
                            <pre className="literal-block">
                                {`set protocols ospf area 0.0.0.0 interface ae0.0
set protocols ospf area 0.0.0.0 interface vlan.0 passive`}
                            </pre>
                            <p>
                                And that's it! Check out the result after a commit with{' '}
                                <tt className="docutils literal">show ospf table</tt> after a few seconds.
                            </p>
                        </div>
                    </div>
                    <div className="section" id="leftovers">
                        <h3>4.4&nbsp;&nbsp;&nbsp;Leftovers</h3>
                        <div className="section" id="virtual-chassis">
                            <h4>4.4.1&nbsp;&nbsp;&nbsp;Virtual chassis</h4>
                            <p>
                                Virtual chassis is a Juniper technology for clustering multiple identical(-ish) switches
                                together into a single logical group. This is done by inter-connecting otherwise
                                autonomous switches and telling each of this. One single switch will take the role as
                                "master".
                            </p>
                            <p>
                                You do not have to think too much about this, as this is already taken care of and will
                                work even if you reset both switches in the distro (which is usually a headache, but
                                that's an other story).
                            </p>
                            <p>
                                Each individual switch in a virtual chassis is referred to as a "member". There are
                                three roles for members: a single master and a single backup and one or more "line
                                card".
                            </p>
                            <p>
                                One thing you may want to do is set{' '}
                                <tt className="docutils literal">
                                    set <span className="pre">virtual-chassis</span>
                                    <span className="pre">no-split-detection</span>
                                </tt>{' '}
                                in case of a "power outage" on one "member". Feel free to google what that means.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Documentation };
