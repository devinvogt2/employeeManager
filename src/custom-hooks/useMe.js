import { useState, useEffect } from 'react';
import { getUserById } from '../axios-services/user';

export function useMe(token) {
    const [me, setMe] = useState({});

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const me = await getUserById(token);
                setMe(me);
            } catch (err) {
                console.error(err);
            }
        };
        if (token) fetchMe();
        else setMe({});
    }, [token]);

    return { me };
}