import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { httpGet, FETCH_STATUS, httpPut } from '../../common/api';
import './Docs.scss';

const contentTypes = [
    { value: 'markdown', label: 'Markdown' },
    { value: 'plaintext', label: 'Plaintext' },
];

export const Docs = (props) => {
    const [loadingState, setLoadingState] = useState(FETCH_STATUS.IDLE);
    const [families, setFamilies] = useState([]);
    const [documents, setDocuments] = useState({});
    const [selectedFamily, setSelectedFamily] = useState({});
    const [selectedDocument, setSelectedDocument] = useState({});

    const [auth, setAuth] = useState(localStorage.getItem('adminAuth') ?? '');

    useEffect(() => {
        localStorage.setItem('adminAuth', auth);
    }, [auth]);

    useEffect(() => {
        if (loadingState === FETCH_STATUS.IDLE) {
            setLoadingState(FETCH_STATUS.PENDING);

            httpGet('document-families/')
                .then((_families) => {
                    setFamilies(_families.map((family) => ({ value: family.id, label: family.name })));
                })
                .catch((err) => {
                    console.warn(err);
                    setLoadingState(FETCH_STATUS.REJECTED);
                });
        }
    }, [loadingState]);

    useEffect(() => {
        families.forEach((family) => {
            const familyId = family.value;
            httpGet(`documents/?family=${familyId}`)
                .then((res) => {
                    setDocuments((oldDocs) => ({
                        ...oldDocs,
                        [familyId]: res.map((doc) => ({ ...doc, value: doc.shortname, label: doc.shortname })),
                    }));
                    setLoadingState(FETCH_STATUS.RESOLVED);
                })
                .catch((err) => {
                    console.warn(err);
                    setLoadingState(FETCH_STATUS.REJECTED);
                });
        });
    }, [families]);

    function onFamilyChange(value, { action }) {
        switch (action) {
            case 'select-option':
                setSelectedFamily(value);
                setSelectedDocument({});
                break;
        }
    }

    function onDocumentChange(value, { action }) {
        switch (action) {
            case 'select-option':
                setSelectedDocument(value);
                break;
        }
    }

    function documentChanged(key, value) {
        setSelectedDocument((oldDocument) => ({ ...oldDocument, [key]: value }));
    }

    function submitDocument() {
        let pw;
        if (auth === '') {
            pw = btoa(prompt('Enter username and password in username:password format'));
            setAuth(pw);
        }

        delete selectedDocument.value;
        delete selectedDocument.label;
        httpPut(`document/${selectedDocument.id}`, selectedDocument, {
            headers: { Authorization: `Basic ${auth ? auth : pw}` },
        })
            .then(() => alert('Successfully updated document'))
            .catch((err) => {
                console.warn(err);
                if (err.code === 401) {
                    alert('Invalid username or password, or wrong format');
                    setAuth('');
                }
            });
    }

    if (loadingState === FETCH_STATUS.PENDING) {
        return <h2>Loading...</h2>;
    } else if (loadingState === FETCH_STATUS.REJECTED) {
        return <h2>Loading failed</h2>;
    } else if (loadingState === FETCH_STATUS.RESOLVED && families !== [] && documents !== {}) {
        return (
            <>
                <div id="family-select">
                    <h3>Family</h3>
                    <Select options={families} onChange={onFamilyChange} />
                </div>
                <div id="document-select">
                    {Object.keys(selectedFamily).length !== 0 && (
                        <>
                            <h3>Document</h3>
                            <Select options={documents[selectedFamily.value]} onChange={onDocumentChange} />
                        </>
                    )}
                </div>
                {Object.keys(selectedDocument).length !== 0 && (
                    <>
                        <div id="document-edit">
                            <div id="params">
                                <h3>Name</h3>
                                <input
                                    id="params-text"
                                    name="params-text"
                                    type="text"
                                    value={selectedDocument.name}
                                    onChange={(event) => documentChanged('name', event.target.value)}
                                ></input>

                                <h3>Family</h3>
                                <input
                                    id="params-text"
                                    name="params-text"
                                    type="text"
                                    value={selectedDocument.family}
                                    onChange={(event) => documentChanged('family', event.target.value)}
                                ></input>

                                <h3>Shortname</h3>
                                <input
                                    id="params-text"
                                    name="params-text"
                                    type="text"
                                    value={selectedDocument.shortname}
                                    onChange={(event) => documentChanged('shortname', event.target.value)}
                                ></input>

                                <h3>Sequence</h3>
                                <input
                                    id="params-text"
                                    name="params-text"
                                    type="number"
                                    value={selectedDocument.sequence}
                                    onChange={(event) => documentChanged('sequence', event.target.value)}
                                ></input>

                                <h3>Content type</h3>
                                <Select
                                    className="select-content-type"
                                    options={contentTypes}
                                    onChange={(newValue) => {
                                        setSelectedDocument((oldDocument) => ({
                                            ...oldDocument,
                                            content_format: newValue.value,
                                        }));
                                    }}
                                    value={
                                        contentTypes.filter(
                                            (type) => type.value === selectedDocument.content_format
                                        )[0] ?? contentTypes[0]
                                    }
                                    onChange={(event) => documentChanged('content_format', event.value)}
                                />
                            </div>

                            <div id="content">
                                <h3>Content</h3>
                                <textarea
                                    value={selectedDocument.content}
                                    onChange={(event) => documentChanged('content', event.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="buttons">
                            <button id="submit" onClick={() => submitDocument()}>
                                Submit
                            </button>
                            <button id="reset">Reset</button>
                        </div>
                    </>
                )}
            </>
        );
    }

    return <h2>Please wait</h2>;
};
