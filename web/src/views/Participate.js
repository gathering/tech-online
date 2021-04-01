import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Net } from '../components/participate/Net';
import { Server } from '../components/participate/Server';
import './participate.scss';

const tabs = ['net', 'server'];

export function Participate() {
    let { hash } = useLocation();
    hash = hash.slice(1);
    const [activeTab, setActiveTab] = useState(hash || tabs[0]);

    return (
        <div className="participate">
            <div className="title">
                <h1>Participate</h1>
            </div>
            <div className="participate-container">
                <div className="row center-xs tabs">
                    {tabs.map((tab) => (
                        <div key={tab} className="col-xs">
                            <h2
                                onClick={() => {
                                    setActiveTab(tab);
                                    window.location.hash = tab;
                                }}
                                className={`tabs__item ${activeTab === tab ? 'tabs__item--active' : ''}`}
                            >
                                {tab}
                            </h2>
                        </div>
                    ))}
                </div>
                {activeTab === 'net' && <Net />}
                {activeTab === 'server' && <Server />}
            </div>
        </div>
    );
}
