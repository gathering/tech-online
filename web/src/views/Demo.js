import React, { useEffect } from 'react';
import { useUserDispatch, actions } from '../store/userContext';
// import jwtDecode from 'jwt-decode';
import { Participate } from './Participate';

const tokenData = {
    access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6bnVsbCwiZXhwIjoxNTg3ODQzNjkwLCJ1aWQiOi0xLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiNTk2YjE3Y2EtOGRmMS00NDhhLTg4YzItOTFlYTU2YmIzYjI5IiwiZmlyc3RfbmFtZSI6IkJhZGdlciIsImxhc3RfbmFtZSI6Ik1jQmFkZ2VyZmFjZSIsImRpc3BsYXlfbmFtZSI6IkJhZGdlciBCYWRnZXIgQmFkZ2VyIiwiaXNzIjoiT3NjYXIifQ.A4_bhXBx5O8pIELIK8bJkhuV7OhcARbvjoIDJYS-M8U',
    expires_in: 3600,
    token_type: 'Bearer',
    scope: 'read_userdata_extended write_userdata_extended',
    refresh_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6bnVsbCwiZXhwIjoxNTg3ODQzNjkwLCJ1aWQiOi0xLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiNTk2YjE3Y2EtOGRmMS00NDhhLTg4YzItOTFlYTU2YmIzYjI5IiwiZmlyc3RfbmFtZSI6IkJhZGdlciIsImxhc3RfbmFtZSI6Ik1jQmFkZ2VyZmFjZSIsImRpc3BsYXlfbmFtZSI6IkJhZGdlciBCYWRnZXIgQmFkZ2VyIiwiaXNzIjoiT3NjYXIifQ.A4_bhXBx5O8pIELIK8bJkhuV7OhcARbvjoIDJYS-M8U',
};

const profileData = {
    uuid: '8953b7bc-4b90-4243-9555-6442a2334641',
    first_name: 'Badger',
    last_name: 'McBadgerface',
    display_name: 'Badger Badger Badger',
    email: '',
    phone_number: '',
    tg19_participant: true,
    crew: null,
    usercards: null,
};

const Demo = () => {
    const userDispatch = useUserDispatch();

    useEffect(() => {
        userDispatch({
            type: actions.LOGIN,
            payload: {
                ...tokenData,
                // meta: jwtDecode(tokenData.access_token),
                profile: profileData,
            },
        });
    }, [userDispatch]);

    return <Participate />;
};

export { Demo };
