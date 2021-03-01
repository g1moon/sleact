import React, {FC, useCallback} from 'react';
import useSWR, {mutate} from "swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import {Redirect} from "react-router-dom";

const Workspace: FC = ({children}) => {
    //로그아웃이 되면 data즉 로그인 상태를 false로 바궈주기위
    const {data, error, revalidate} = useSWR('/api/users', fetcher); //

    const onLogOut = useCallback(
        () => {
            axios
                .post('/api/users/logout', null, {withCredentials: true})
                .then(() => {
                    revalidate();
                    // mutate(false, false);
                });
        }, []);

    if (!data) {
        return <Redirect to='/login'/>
    }

    return (
        <div>
            <button onClick={onLogOut}>로그아웃</button>
            {children}
        </div>
    );
};

export default Workspace;