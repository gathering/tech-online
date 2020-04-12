import React, { useMemo } from 'react';
import './frontpage.scss';

import pocImage from '../assets/poc.jpg';
import { useUserState, userIsAuthed } from '../store/userContext';
import { Link } from 'react-router-dom';
import StationStatus from '../components/StationStatus';

const Frontpage = () => {
    const user = useUserState();
    const loggedIn = userIsAuthed(user);

    return (
        <div className="frontpage">
            <div className="title">
                <h1>Welcome to the Tech:Online hub!</h1>
            </div>

            <div className="frontpage-container">
                <div className="row">
                    <div className="col-md-3">
                        <StationStatus id={1} />
                    </div>
                    <div className="col-md-3">
                        <StationStatus id={2} />
                    </div>
                    <div className="col-md-3">
                        <StationStatus id={3} />
                    </div>
                    <div className="col-md-3">
                        <StationStatus id={4} />
                    </div>
                </div>
		<hr />
		<h2>Winners will be announced tonight at 21:00!</h2>
		<p>Tech:Online saw somewhere around 20 participants go through our network challenge, and the "jury" has had a difficult time determining the lucky three to win a ticket for The Gathering 2021.</p>
		<p>But we will reveal the winners tonight at 21:00, during a live stream where we also do a speedrun of the challenge and discuss some of the unforseen challenges we had and how it all relates to real-life network administration.</p>
		<p>Find your way to discord, and the stream will be at <a href="https://twitch.tv/klyklyno">Kristian's twich channel</a>. The winners will of course be announced here as well.</p>
                <h2>What is Tech:Online?</h2>
                <hr />
                <p>
                    <strong>Tech:Online is a network-hacking event and experiment!</strong>
                </p>

                <p>
                    We had to cancel The Gathering, but would otherwise have gathered over 5000 people under the same
                    roof for some digital hilarities. For many of us, The Gathering is an amazing opportunity to learn
                    and experiment.
                </p>
                <p>
                    To soften the pain, The Gathering:Online is being arranged. But what can Tech-side of The Gathering
                    contribute now that there isn't a large, temporary network to build?
                </p>
                <p>
                    <strong>Enter: Tech:Online.</strong>
                    <br />
                    Tech:Online is a realization that we can still learn and experiment, and even better, we can invite
                    YOU to take part!
                    <br />
                    Do you have what it takes to set up a LAN? Or do you want to learn as much as you can about
                    operating a professional network? Tech:Online is for you.
                </p>
                <p>
                    The event takes place during the Easter holiday. The target date is Friday the 10th of April. It
                    will be preceded by a introduction to basic LAN networking the day before (probably), and mentors
                    will be available throughout the event to help you and guide you.
                    <br />
                    During the event, you as a participant will be given remote access to a Raspberry PI (or similar)
                    that is hooked up directly with 4 switches, using console cables. The four switches are connected
                    similar to how we would do things at The Gathering, and your task is to get the "participant"
                    online.
                </p>
                <div className="flex-row">
                    <div className="flex-item">
                        <h2>Who can participate?</h2>
                        <hr />

                        <p>
                            <strong>Anyone!</strong>
                        </p>
                        <div>
                            If you are interested in networking, this is for you. While we want to make this accessible
                            to absolutely everyone, you do need some prior knowledge:
                            <ul>
                                <li>
                                    You need to be able to use an ssh client, and have some experience running very
                                    basic commands
                                </li>
                                <li>
                                    You must know what an IP address is, and it's also helpful if you know what a
                                    gateway address is
                                </li>
                                <li>
                                    Some knowledge of very basic routing is helpful. You do not need practical
                                    experience with it - that's why we're here
                                </li>
                                <li>Reading</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-item">
                        <img className="image-header__image" src={pocImage} alt="Switches and a computer" />
                    </div>
                </div>
                <div>
                    <h2>Prizes</h2>
                    <hr />

                    <p>
                        We're handing out 3 tickets for <strong>The Gathering 2021</strong> to a lucky few who impress
                        us in some way or another. And there might be other surprises...
                    </p>

                    <div>
                        To get a chance to grab a ticket, we have a few categories in mind:
                        <ul>
                            <li>Time to target: Finish in the shortest amount of time</li>
                            <li>Rookie of the year: The youngest and/or least experienced participant to finish</li>
                            <li>
                                Wildcard: Impress us! Set up something cool, be super/helpful to others, or just plain
                                impress us in some way
                            </li>
                        </ul>
                        <strong>
                            Either way, if you do participate, you're invited to a guided tour of the network
                            infrastructure at The Gathering 2021!
                        </strong>
                    </div>
                </div>

                <div className="flex-row" style={{ paddingTop: '2rem' }}>
                    <div className="flex-item">
                        <img src="//techo.gathering.org/pics/left000M.jpg" />
                    </div>

                    <div className="flex-item">
                        <img src="//techo.gathering.org/pics/center000M.jpg" />
                    </div>

                    <div className="flex-item">
                        <img src="//techo.gathering.org/pics/right000M.jpg" />
                    </div>
                </div>

                <hr />

                <div className="signup-row">
                    {loggedIn ? (
                        <Link to="/participate">Participate!</Link>
                    ) : (
                        <a
                            href={`https://oscar.zoodo.io/o/authorize/?client_id=${process.env.CLIENT_ID}&response_type=code&scope=read_userdata_extended%20write_userdata_extended&redirect_uri=${window.location.origin}/login`}
                        >
                            <h2>Click here to log in and participate</h2>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export { Frontpage };
