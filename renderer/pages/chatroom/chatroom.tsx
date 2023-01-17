import { useRouter } from 'next/router';
import * as React from 'react';
import ChatBox from '../chat/chatbox';
import { chatRoom } from './Room';

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
    <div>
      <h2>{room.title}</h2>
      <input
        type="button"
        value='뒤로 가기'
        onClick={
          () => {
            router.back();
          }
        }
      />
      <ChatBox roomId={roomId} />
    </div>
  );
}
