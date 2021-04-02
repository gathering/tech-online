import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './documentation.scss';
import { httpGet, FETCH_STATUS } from '../common/api';

import Select from 'react-select';
import Markdown, { renderers } from 'react-markdown';
// import * as gfm from 'react-gfm';

const _scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView();
    }
};

const renderHeadingWithLink = (props, misc, tab) => {
    const child = props?.node?.children?.[0];

    if (child && child.type === 'text' && child.value) {
        const hash = [tab.value, child.value.replace(/[^\w]/g, '-').toLowerCase()].filter(Boolean).join('_');
        return <a href={`#${hash}`}>{renderers.heading(props, misc)}</a>;
    }

    return renderers.heading(props, misc);
};

// TODO Fix linking to id
// TODO Scroll-spy

const tabs = [
    { value: 'ref-net', label: 'Reference Network' },
    { value: 'ref-server', label: 'Reference Server' },
    { value: 'task-net', label: 'Task Network' },
    { value: 'task-server', label: 'Task Server' },
];

const DocsList = ({ docs = [], tab = {} } = {}) =>
    docs.length ? (
        <div className="docs">
            {docs.map((doc) => (
                <span key={`${doc.family}-${doc.shortname}-${doc.sequence}`}>
                    <h1>{doc.name}</h1>
                    <Markdown
                        renderers={{
                            heading: (props, misc) => renderHeadingWithLink(props, misc, tab),
                        }}
                        allowDangerousHtml
                    >
                        {doc.content}
                    </Markdown>
                </span>
            ))}
        </div>
    ) : (
        <p>No documents found on selected topic</p>
    );

export const Documentation = () => {
    const { hash: rawHash } = useLocation();
    // headingHash can be used to trigger scroll to, but keep in mind document might not be loaded yet
    const [hash, _headingHash] = rawHash.slice(1).split('_');
    const [activeTab, setActiveTab] = useState((hash && tabs.find((tab) => tab.value === hash)) || tabs[0]);
    const [loadingState, setLoadingState] = useState(FETCH_STATUS.IDLE);

    const [docs, setDocs] = useState([]);

    useEffect(() => {
        setLoadingState(FETCH_STATUS.PENDING);
        httpGet(`documents/?family=${activeTab.value}`)
            .then((res) => {
                setDocs(
                    res.sort(function (a, b) {
                        return a.sequence - b.sequence;
                    })
                );
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
                        window.location.hash = newValue.value;
                        setActiveTab(newValue);
                    }}
                />
                {(loadingState === FETCH_STATUS.IDLE || loadingState === FETCH_STATUS.PENDING) && <h2>Loading...</h2>}
                {loadingState === FETCH_STATUS.RESOLVED && <DocsList docs={docs} tab={activeTab} />}
            </div>
        </div>
    );
};
