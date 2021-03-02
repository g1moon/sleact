import React, {CSSProperties, FC, useCallback, useState, VFC} from 'react';
import useSWR, {mutate} from "swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import {Redirect} from 'react-router';
import {Route, Switch} from "react-router-dom";
import {
    AddButton,
    Channels,
    Chats,
    Header,
    LogOutButton,
    MenuScroll,
    ProfileImg,
    ProfileModal,
    RightMenu,
    WorkspaceButton,
    WorkspaceModal,
    WorkspaceName,
    Workspaces,
    WorkspaceWrapper,
} from '@layouts/Workspace/styles';
import gravatar from 'gravatar';
import loadable from "@loadable/component";
import {RouteComponentProps} from "react-router/ts4.0";
import Menu from "@components/Menu";


const DirectMessage = loadable(() => import('@pages/DirectMessage'));
const Channel = loadable(() => import('@pages/Channel'));

interface Props {
    show: boolean;
    onCloseModal: () => void;
    style: CSSProperties;
    closeButton?: boolean;
}

const Workspace: FC<Props> = ({children, style, show, onCloseModal}) => {
    //로그아웃이 되면 data즉 로그인 상태를 false로 바궈주기위
    const {data, error, revalidate} = useSWR('/api/users', fetcher); //
    const [showUserMenu, setShowUserMenu] = useState(false);
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

    const onClickUserProfile = () => {
        setShowUserMenu((prev) => !prev);
    };


    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                         <ProfileImg src={gravatar.url(data.email, {s: '28px', d: 'retro'})} alt={data.nickname}/>
                        {showUserMenu &&
                        <Menu style={{right: 0, top: 38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                            <ProfileModal>
                                <img src={gravatar.url(data.email, {s: '36px', d: 'retro'})} alt={data.nickname}/>
                                <div>
                                    <span id='profile-name'>{data.nickname}</span>
                                    <span id='profile-active'>Active</span>
                                </div>
                            </ProfileModal>
                        </Menu>}
                        {/*<ProfileModal>*/}
                        {/*    <img src={gravatar.url(data.nickname, {s: '36px', d: 'retro'})} alt={data.nickname}/>*/}
                        {/*    <div>*/}
                        {/*        <span id='profile-name'>{data.nickname}</span>*/}
                        {/*        <span id='profile-acitve'>Active</span>*/}
                        {/*    </div>*/}
                        {/*</ProfileModal>*/}
                        <LogOutButton onClick={onLogOut}>로그아웃</LogOutButton>
                            </span>
                </RightMenu>
            </Header>
            <WorkspaceWrapper>
                <Workspaces>test</Workspaces>

                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll>menuScroll</MenuScroll>
                </Channels>
                <Chats>
                    <Switch>
                        <Route path="/workspace/channel" component={Channel}/>
                        <Route path="/workspace/dm" component={DirectMessage}/>
                    </Switch>
                </Chats>
            </WorkspaceWrapper>
        </div>
    );
};

export default Workspace;