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
                <h2>Tech:Online 2021 is now over</h2>
                <hr />
                <p>Hope to see you all next year!</p>
                <br />
                <br />
                {/*
                <div style={{ height: '350px', overflow: 'hidden' }}>
                    <img
                        src="https://techo21-cam.gathering.systems/proxy/cam2.jpg"
                        height="550px"
                        style={{ position: 'relative', top: '-300px' }}
                    />
                </div>
                */}
                <h2>What is Tech:Online?</h2>
                <hr />
                <p>
                    <strong>Tech:Online is a network-hacking event and experiment!</strong>
                    <br />
                    Participants (you?) will be given an opportunity to configure real network hardware, with lots of
                    assistance. This is a realistic simulation of how real network engineers work, on real hardware. You
                    get feedback through a series of verification scripts that simulate how actual monitoring software
                    work, and ultimately, you will see a real physical end-user-pc go from off-line to on-line over a
                    video stream.{' '}
                </p>
                <p>
                    The exercise takes somewhere between an hour (for the experienced) and 5-6 hours. You get access to
                    our great mentors along the way, which will answer any questions you have.
                </p>
                <p>
                    Tech:Online first took place during the easter of 2020, and saw about 20 participants go through the
                    challenge, which was far more than we had dared to expect.
                </p>

                <h2>Why?</h2>
                <hr />
                <p>
                    Every year during easter, The Gathering takes place and somewhere between 5000 and 10 000 people
                    visit the venue to participate in an amazing digital festival. But for obvious reasons, we've had to
                    cancel this event twice in a row now.
                </p>
                <p>
                    But some of us know that The Gathering lets us experiment with things we otherwise never get to
                    touch, and we wanted to see if we could simulate some of that on-line, and while we're at it, invite
                    even more people to participate!
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
                <h2>NEW in 2021: Two different tracks!</h2>
                <hr />
                <p>There will be two tracks (exercises) available. You can choose to participate in either or both.</p>
                <p>
                    <strong>Tech:Net</strong>
                    <br />
                    In the network track you will configure two access switches and a distribution switch to get a
                    participant on-line. This is the same exercise we ran last year, but hopefully even more stream
                    lined. You will learn how basic routing works, how networks become more robust (and faster) by using
                    multiple cables to connect switches, and of course how switches are configured in general. This is
                    an exercise anyone with an SSH client can participate in.
                </p>
                <p>
                    <strong>Tech:Server</strong>
                    <br />
                    New as of 2021 is the chance to configure two cruciual services for any network: DHCP and DNS. A
                    network without DNS and DHCP is not very functional. You will learn what happens when you plug your
                    PC into a switch and how DHCP is used to auto-configure network settings for clients (e.g.: your
                    laptop, phone, etc). You will also learn how a domain name is converted to an IP address using DNS
                    and the difference between a recursive DNS server and an authoitative one. These are absolutely
                    crucial components on the Internet, and while the jargon might seem dense, they are in many respects
                    remarkably simple when you get down to it.
                </p>
                <p>
                    <strong>Combined: How to run any-size network!</strong>
                    <br />
                    Well, almost...
                </p>
                <p>
                    If you complete both of these exercises, you will know almost everything there is to know about the
                    fundamental building blocks of the internet. The same principles are used for your local network at
                    home as is used for large ISPs with hundereds of thousands of customers.
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
