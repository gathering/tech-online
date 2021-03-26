import React, { useEffect, useState } from 'react';
import { httpGet, FETCH_STATUS } from '../../common/api';

export const Docs = (props) => {
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

    return <p>Do some stuff here</p>;
};
