import Link from 'next/link';
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
  height: 100vh;
`

const RoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export interface IAppProps {
}

export function MainPage(props: IAppProps) {
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <>
      <MainDiv>
        <div className='MainPage_UserList'>
          <h2>현재 접속 중인 유저</h2>
          <br />
          <h3>1 : 1 채팅을 시작해보세요!</h3>
          <br />
          <CurrentUserList />
        </div>
        <div className='MainPage_UserList'>
          <h2>서비스에 가입한 유저</h2>
          <br />
          <h3>1 : 1 채팅을 시작해보세요!</h3>
          <br />
          <UserList />
        </div>
        <div className='MainPage_UserList'>
          <h2>단체 채팅 목록</h2>
          <br />
          <h3>채팅 방에 참여해보세요!</h3>
          <br />
          <RoomList>
            <ChatRoomList />
          </RoomList>
        </div>
        <div className='MainPage_UserList'>
          <h2>예제</h2>
          <Example />
        </div>
      </MainDiv>
    </>
  );
}
