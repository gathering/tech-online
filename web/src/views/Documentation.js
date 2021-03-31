import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './documentation.scss';
import { httpGet, FETCH_STATUS } from '../common/api';

import Select from 'react-select';
import Markdown from 'react-markdown';
// import * as gfm from 'react-gfm';

const _scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView();
    }
};

// TODO Fix linking to id
// TODO Scroll-spy

const tabs = [
    { value: 'ref-net', label: 'Reference Network' },
    { value: 'ref-server', label: 'Reference Server' },
    { value: 'task-net', label: 'Task Network' },
    { value: 'task-server', label: 'Task Server' },
];

export const Documentation = () => {
    let { hash } = useLocation();
    hash = hash.slice(1);
    const [activeTab, setActiveTab] = useState(hash ? tabs.map((tab) => tab.value === hash)[0] : tabs[0]);
    const [loadingState, setLoadingState] = useState(FETCH_STATUS.IDLE);

    const [docs, setDocs] = useState([]);

    useEffect(() => {
        setLoadingState(FETCH_STATUS.PENDING);
        httpGet(`documents/?family=${activeTab.value}`)
            .then((res) => {
                setDocs(res);
                setLoadingState(FETCH_STATUS.RESOLVED);
            })
            .catch((err) => {
                setLoadingState(FETCH_STATUS.REJECTED);
                console.warn(err);
            });
    }, [activeTab]);

    return (
        <div className="documentation">
            <div className="title">
                <h1>Documentation</h1>
            </div>
            <div className="documentation-container">
                <h2>Select documentation</h2>
                <Select
                    options={tabs}
                    value={activeTab}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    onChange={(newValue) => {
                        setActiveTab(newValue);
                    }}
                />
                {(loadingState === FETCH_STATUS.IDLE || loadingState === FETCH_STATUS.PENDING) && <h2>Loading...</h2>}
                {loadingState === FETCH_STATUS.RESOLVED && (
                    <div className="docs">
                        <Markdown /*plugins={[gfm]}*/ children={docs[0].content} />
                    </div>
                )}
            </div>
        </div>
    );
};
