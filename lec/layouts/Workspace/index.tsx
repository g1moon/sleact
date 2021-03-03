// import ChannelList from '@components/ChannelList';
// import DMList from '@components/DMList';
// import InviteChannelModal from '@components/InviteChannelModal';
// import InviteWorkspaceModal from '@components/InviteWorkspaceModal';
import Menu from '@components/Menu';
import Modal from '@components/Modal';
// import useInput from '@hooks/useInput';
// import useSocket from '@hooks/useSocket';
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
import loadable from '@loadable/component';
import { Button, Input, Label } from '@pages/SignUp/styles';
// import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { VFC, useCallback, useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';
import useSWR from 'swr';
import gravatar from 'gravatar';
import { toast } from 'react-toastify';
// import CreateChannelModal from '@components/CreateChannelModal';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: VFC = () => {
    //로그아웃이 되면 data즉 로그인 상태를 false로 바궈주기위
    const {data : userData, error, revalidate} = useSWR('/api/users', fetcher); //
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

    if (!userData) {
        return <Redirect to='/login'/>
    }


    function onClickUserProfile() {

    }

    function onCloseUserProfile() {

    }

    function onClickCreateWorkspace() {

    }

    function onLogout() {

    }

    function toggleWorkspaceModal() {

    }

    let showWorkspaceModal;

    function onClickAddChannel() {

    }

    function onClickInviteWorkspace() {

    }

    let showCreateWorkspaceModal;
    let onCloseModal;

    function onCreateWorkspace() {

    }

    let newWorkspace;

    function onChangeNewWorkspace() {

    }

    let newUrl;

    function onChangeNewUrl() {

    }

    let showCreateChannelModal;
    let setShowCreateChannelModal;
    let showInviteWorkspaceModal;
    let setShowInviteWorkspaceModal;
    let showInviteChannelModal;
    let setShowInviteChannelModal;
    return (
        <div>
            <Header>
                <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.nickname} />
              {showUserMenu && (
                  <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                      <ProfileModal>
                          <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                          <div>
                              <span id="profile-name">{userData.nickname}</span>
                              <span id="profile-active">Active</span>
                          </div>
                      </ProfileModal>
                      <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                  </Menu>
              )}
          </span>
                </RightMenu>
            </Header>
            <WorkspaceWrapper>
                <Workspaces>
                    {userData?.Workspaces.map((ws) => {
                        return (
                            <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                            </Link>
                        );
                    })}
                    <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
                </Workspaces>
                <Channels>
                    <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
                    <MenuScroll>
                        <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>
                            <WorkspaceModal>
                                <h2>Sleact</h2>
                                <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                                <button onClick={onClickAddChannel}>채널 만들기</button>
                                <button onClick={onLogout}>로그아웃</button>
                            </WorkspaceModal>
                        </Menu>
                        {/*<ChannelList />*/}
                        {/*<DMList />*/}
                    </MenuScroll>
                </Channels>
                <Chats>
                    <Switch>
                        <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
                        <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
                    </Switch>
                </Chats>
            </WorkspaceWrapper>
            <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
                <form onSubmit={onCreateWorkspace}>
                    <Label id="workspace-label">
                        <span>워크스페이스 이름</span>
                        <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
                    </Label>
                    <Label id="workspace-url-label">
                        <span>워크스페이스 url</span>
                        <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
                    </Label>
                    <Button type="submit">생성하기</Button>
                </form>
            </Modal>
            {/*<CreateChannelModal*/}
            {/*    show={showCreateChannelModal}*/}
            {/*    onCloseModal={onCloseModal}*/}
            {/*    setShowCreateChannelModal={setShowCreateChannelModal}*/}
            {/*/>*/}
            {/*<InviteWorkspaceModal*/}
            {/*    show={showInviteWorkspaceModal}*/}
            {/*    onCloseModal={onCloseModal}*/}
            {/*    setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}*/}
            {/*/>*/}
            {/*<InviteChannelModal*/}
            {/*    show={showInviteChannelModal}*/}
            {/*    onCloseModal={onCloseModal}*/}
            {/*    setShowInviteChannelModal={setShowInviteChannelModal}*/}
            {/*/>*/}
        </div>
    );
};

export default Workspace;