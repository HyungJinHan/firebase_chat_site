import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import { db } from '../../../firebase';
import { chatRoom } from '../../Room';
import Swal from 'sweetalert2';
import { Button } from 'antd';

const RoomListDiv = styled.div`
  text-align: center;
  display: inline-block;
`

export default function ChatRoomList() {
  const [rooms, setRooms] = React.useState([]);
  let list = [];

  const getList = () => {
    getDocs(collection(db, 'userChatRoom'))
      .then((res) => {
        res.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        })
      })
      .then(() => {
        setRooms(list);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteCheck = (roomid: string) => {
    Swal.fire({
      title: '채팅방을 지우시겠습니까?',
      text: '해당 채팅방의 채팅 내역이 사라집니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3DA2FF',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    })
      .then(result => {
        if (result.isConfirmed) {
          Swal.fire('채팅방이 삭제되었습니다.', '채팅 내역도 함께 삭제되었습니다.', 'success');
          deleteDoc(doc(db, "userChatRoom", roomid));
          // deleteDoc(doc(db, "messages"));
          deleteDoc(doc(db, "chatRoom", roomid));
          getList();
        }
      });
  }

  React.useEffect(() => {
    getDocs(collection(db, 'userChatRoom'))
      .then((res) => {
        res.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        })
      })
      .then(() => {
        setRooms(list);
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return (
    <RoomListDiv>
      <div className='chatroomlist_div'>
        <h2>관심사가 맞는 유저들과 대화를 해보세요!</h2>
        <br />
        <div className='chatroomlist_list'>
          {chatRoom.map((room) => (
            <Link
              key={room.id}
              href={{
                pathname: `/chatroom/chatroom`,
                query: room.id,
              }}
              as={`/chatroom/chatroom/${room.id}`}
            >
              <p className='chatroomlist_link' key={room.id}>{room.title}</p>
            </Link>
          ))}

          {rooms?.map((room) => (
            <p className='chatroomlist_link' key={room.id}>
              <Link
                href={{
                  pathname: `/chatroom/chatroom`,
                  query: room.id,
                }}
                as={`/chatroom/chatroom/${room.id}`}
              >
                <span>{room.title}</span>
              </Link>
              <Button
                className='chatroomlist_delete'
                danger
                onClick={
                  () => {
                    const roomid = room.id
                    deleteCheck(roomid);
                  }
                }
              >
                삭제하기
              </Button>
            </p>
          ))}
          <Link href={`/chatroom/chatroomcreate`}>
            <p className='chatroomlist_link'>👉 원하시는 방이 없나요? 👈</p>
          </Link>
        </div>
      </div>
    </RoomListDiv>
  );
}
