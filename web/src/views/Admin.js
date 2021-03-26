import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { httpGet, FETCH_STATUS } from '../common/api';
import './admin.scss';

const tabs = ['users', 'docs'];

export function Admin() {
    let { hash } = useLocation();
    hash = hash.slice(1);
    const [activeTab, setActiveTab] = useState(hash || tabs[0]);

    const [loadingState, setLoadingState] = useState(FETCH_STATUS.IDLE);

    useEffect(() => {
        if (loadingState === FETCH_STATUS.IDLE) {
            setLoadingState(FETCH_STATUS.PENDING);
            httpGet('document-families').then((families) => {
                families.forEach((family) => {
                    httpGet(`documents/?family=${family.id}`);
                });
            });
        }
    });

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
                                onClick={() => setActiveTab(tab)}
                                className={`tabs__item ${activeTab === tab ? 'tabs__item--active' : ''}`}
                            >
                                {tab}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
