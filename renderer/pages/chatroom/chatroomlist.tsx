import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import { chatRoom } from './Room';

const RoomDiv = styled.div`
  display: flex;
  flex: 1 1 calc(50% - 4px);
  justify-content: center;
  align-items: center;
  width: 50%;
`

export interface IAppProps {
}

export default function ChatRoomList(props: IAppProps) {
  return (
    <RoomDiv>
      {chatRoom.map((room) => (
        <div key={room.id}>
          <Link
            href={{
              pathname: `/chatroom/chatroom`,
              query: room.id,
            }}
            as={`/chatroom/chatroom/${room.id}`}
          >
            <a>{room.title}</a>
          </Link>
        </div>
      ))}
    </RoomDiv>
  );
}
