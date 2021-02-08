import React from 'react';
import './frontpage.scss';

import pocImage from '../assets/poc.jpg';
import { Link } from 'react-router-dom';

const Frontpage = () => {
    return (
        <div className="frontpage">
            <div className="title">
                <h1>Welcome to the Tech:Online hub!</h1>
            </div>

            <div className="frontpage-container">
                <p>
                    Tech:Online 2020 saw somewhere around 20 participants go through the network challenge.... Stay
                    tuned and stay sharp - for Tech:Online 2021 we are brewing up even more fun...
                </p>
                <p>
                    Read more at the{' '}
                    <a href="https://tech.gathering.org/blog/482/techonline-vinnere-og-oppsummering">Tech Blog</a>
                </p>
            </div>
        </div>
    );
};

const oldFrontpage = () => {
    return (
        <div className="frontpage">
            <div className="title">
                <h1>Welcome to the Tech:Online hub!</h1>
            </div>

            <div className="frontpage-container">
                <p style={{ paddingBottom: '2rem' }}>
                    Tech:Online saw somewhere around 20 participants go through our network challenge, and the "jury"
                    has had a difficult time determining the lucky three to win a ticket for The Gathering 2021.
                </p>
                <p>
                    Read more at the{' '}
                    <a href="https://tech.gathering.org/blog/482/techonline-vinnere-og-oppsummering">Tech Blog</a>
                </p>
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
                        <img src="//techo.gathering.org/pics/techo.png" />
                    </div>
                </div>

                <div className="row" style={{ paddingTop: '2rem' }}>
                    <div className="col-xs">
                        <h1>Curious?</h1>
                        <hr />

                        <p>
                            Want to know how it looked like being a participant? Click <Link to="/demo">here</Link>!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Frontpage };
