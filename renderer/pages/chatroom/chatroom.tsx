import { useRouter } from 'next/router';
import * as React from 'react';
import styled from 'styled-components';
import ChatBox from '../chat/chatbox';
import { chatRoom } from './Room';

const ChatRoomDiv = styled.div`
  text-align: center;
  /* display: inline-block; */
`

export default function ChatRoom() {
  const router = useRouter();
  const param = router.asPath;
  const roomId = param.substring(19, 24);
  console.log(roomId);

  const room = chatRoom.find(
    (room) => (
      room.id === roomId
    )
  )

  return (
    <>
      <ChatRoomDiv>
        <div className='chatroom_div'>
          <div className='chatroom_article'>
            <ChatBox roomId={roomId} />
          </div>
        </div>
      </ChatRoomDiv>
    </>
  );
}
