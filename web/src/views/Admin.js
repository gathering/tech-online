import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Docs } from '../components/admin/Docs';
import { Users } from '../components/admin/Users';
import './admin.scss';

const tabs = ['users', 'docs'];

export function Admin() {
    let { hash } = useLocation();
    hash = hash.slice(1);
    const [activeTab, setActiveTab] = useState(hash || tabs[0]);

    return (
        <div className="admin">
            <div className="title">
                <h1>Admin</h1>
            </div>
            <div className="admin-container">
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
                {activeTab === 'docs' && <Docs />}
                {activeTab === 'users' && <Users />}
            </div>
        </div>
    );
}
