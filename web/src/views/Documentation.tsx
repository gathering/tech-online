/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './documentation.scss';
import { httpGet, FETCH_STATUS } from '../common/api';

import Select from 'react-select';
import Markdown, { renderers } from 'react-markdown';
import { Document } from '../components/admin/Docs';

const renderHeadingWithLink = (props: any, misc: any, tab: any) => {
  const child = props?.node?.children?.[0];

  if (child && child.type === 'text' && child.value) {
    const hash = [tab.value, child.value.replace(/[^\w]/g, '-').toLowerCase()]
      .filter(Boolean)
      .join('_');
    return (
      <a href={`#${hash}`}>
        {(renderers.heading as Markdown.Renderer<any>)(props)}
      </a>
    );
  }

  return (renderers.heading as Markdown.Renderer<any>)(props);
};

// TODO Fix linking to id
// TODO Scroll-spy

const tabs = [
  { value: 'ref-net', label: 'Reference Network' },
  { value: 'ref-server', label: 'Reference Server' },
  { value: 'task-net', label: 'Task Network' },
  { value: 'task-server', label: 'Task Server' },
];

const DocsList = ({
  docs = [],
  tab = {},
}: {
  docs: Document[];
  tab: Record<string, any>;
}) =>
  docs.length ? (
    <div className="docs">
      {docs.map((doc) => (
        <span key={`${doc.family}-${doc.shortname}-${doc.sequence}`}>
          <h1>{doc.name}</h1>
          <Markdown
            renderers={{
              heading: (props, misc) =>
                renderHeadingWithLink(props, misc, tab) as any,
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
  const [activeTab, setActiveTab] = useState(
    (hash && tabs.find((tab) => tab.value === hash)) || undefined
  );
  const [loadingState, setLoadingState] = useState(FETCH_STATUS.IDLE);

  const [docs, setDocs] = useState<Document[]>([]);

  useEffect(() => {
    setLoadingState(FETCH_STATUS.PENDING);
    httpGet<Document[]>(`documents/?family=${activeTab?.value}`)
      .then((res) => {
        setDocs(
          res.sort(function (a, b) {
            return (a.sequence ?? 0) - (b.sequence ?? 0);
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
            window.location.hash = newValue!.value;
            setActiveTab(newValue!);
          }}
        />
        {(loadingState === FETCH_STATUS.IDLE ||
          loadingState === FETCH_STATUS.PENDING) && <h2>Loading...</h2>}
        {loadingState === FETCH_STATUS.RESOLVED && (
          <DocsList docs={docs} tab={activeTab!} />
        )}
      </div>
    </div>
  );
};
