import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import { db } from '../../../firebase';
import { chatRoom } from '../../Room';

const RoomListDiv = styled.div`
  text-align: center;
  display: inline-block;
`

export default function ChatRoomList() {

  return (
    <RoomListDiv>
      <div className='chatroomlist_div'>
        <h2>관심사가 맞는 유저들과 대화를 해보세요!</h2>
        <br />
        <div className='chatroomlist_list'>
          {chatRoom.map((room) => (
            <Link
              href={{
                pathname: `/chatroom/chatroom`,
                query: room.id,
              }}
              as={`/chatroom/chatroom/${room.id}`}
            >
              <p className='chatroomlist_link'>{room.title}</p>
            </Link>
          ))}
          <Link
            href={{ pathname: `/chatroom/chatroomcreate` }}
          >
            <p className='chatroomlist_link'>👉 원하시는 방이 없나요? 👈</p>
          </Link>
        </div>
      </div>
    </RoomListDiv>
  );
}
