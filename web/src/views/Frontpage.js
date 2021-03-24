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
		    We have had to cancel The Gathering twice, but would
		    otherwise have gathered over 5000 people under the same
		    roof for some digital hilarities. For many of us, The
		    Gathering is an amazing opportunity to learn
                    and experiment.
                </p>
                <p>
		    To soften the pain, The Gathering:Online is being
		    arranged for the second year running. But what can
		    Tech-side of The Gathering contribute now that there
		    isn't a large, temporary network to build?
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
                    The event takes place during the Easter holiday. The target date is Thursday the 1st of April. It
                    will be preceded by a introduction to basic LAN networking the day before (probably), and mentors
                    will be available throughout the event to help you and guide you.
                    <br />
                    During the event, you as a participant will be given remote access to a Raspberry PI (or similar)
                    that is hooked up directly with 4 switches, using console cables. The four switches are connected
                    similar to how we would do things at The Gathering, and your task is to get the "participant"
                    online.
                </p>
		<h2>What's new for 2021?</h2>
		<hr />
		<p>
		   For Tech:Online 2021 we will repeat the success of the
		   network exercise, but also add a new dimension: How to
		   configure a DNS stack and DHCP server. This will be a
		   separate track, so you can choose to participate in one
		   or the other, or both!
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

                <div className="flex-row" style={{ paddingTop: '2rem' }}>
                    <div className="flex-item">
                        <img src="//techo.gathering.org/pics/techo.png" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export { Frontpage };
