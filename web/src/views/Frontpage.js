import React from 'react';
import './frontpage.scss';

const Frontpage = () => {
    return (
        <div className="frontpage">
            <div className="frontpage-super">
                <h1>Welcome to the Tech:Online hub!</h1>
            </div>

            <div className="frontpage-container">
                <h2>What is Tech:Online?</h2>
                <p>Tech:Online is a network-hacking event and experiment!</p>
                <p>
                    We had to cancel The Gathering, but would otherwise have gathered over 5000 people under the same
                    roof for some digital hilarities. For many of us, The Gathering is an amazing opportunity to learn
                    and experiment.
                </p>
                <p>
                    To soften the pain, The Gathering:Online is being arranged. But what can Tech-side of The Gathering
                    contribute now that there isn't a large, temporary network to build?
                </p>

                <strong>Enter: Tech:Online.</strong>
                <p>
                    Tech:Online is a realization that we can still learn and experiment, and even better, we can invite
                    YOU to take part!
                </p>
                <p>
                    Do you have what it takes to set up a LAN? Or do you want to learn as much as you can about
                    operating a professional network? Tech:Online is for you.
                </p>
                <p>
                    The event takes place during the Easter holiday. The target date is Friday the 10th of April. It
                    will be preceded by a introduction to basic LAN networking the day before (probably), and mentors
                    will be available throughout the event to help you and guide you.
                </p>
                <p>
                    During the event, you as a participant will be given remote access to a raspberry pie (or similar)
                    that is hooked up directly with 4 switches, using console cables. The four switches are connected
                    similar to how we would do things at The Gathering, and your task is to get the "participant"
                    online.
                </p>
            </div>
        </div>
    );
};

export { Frontpage };
