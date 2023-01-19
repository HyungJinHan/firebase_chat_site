import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../../../firebase';
import ChatRoomList from '../chatroom/chatroomlist';
import CurrentUserList from '../list/currentuserlist';
import UserList from '../list/userlist';
import Example from '../privatechat/example';

const MainDiv = styled.div`
  display: flex;
  padding-top: 50px;
  width: 80%;
`

export function MainPage() {
  const [user] = useAuthState(auth);
  console.log(user);

  const router = useRouter();
  const url = router.pathname;
  console.log(url);

  if (url === '/home') {
    return (
      <MainDiv>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        this is chatting app
      </MainDiv>
    );
  }

  if (url === '/list/userlist') {
    return (
      <div className='layout_mainpage'>
        <MainDiv>
          <UserList />
        </MainDiv>
      </div>
    );
  }

  if (url === '/chatroom/chatroomlist') {
    return (
      <div className='layout_mainpage'>
        <MainDiv>
          <ChatRoomList />
        </MainDiv>
      </div>
    );
  }
}
