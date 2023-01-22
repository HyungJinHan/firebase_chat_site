import { Input, InputRef } from 'antd';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import styled from 'styled-components';
import { db } from '../../../firebase';

const RoomCreateDiv = styled.div`
  width: 50%;
  text-align: center;
  display: inline-block;
  padding-top: 50px;
  font-family: 'GmarketSansMedium';
  margin-top: 200px;
`

const ErrorMsg = styled.p`
  color: red;
  font-weight: bolder;
  font-family: 'GmarketSansMedium';
  padding-top: .625rem;
  text-decoration: underline;
`

export default function ChatRoomCreate() {
  const [roomid, setRoomid] = React.useState<string>('');
  const [roomname, setRoomname] = React.useState<string>('');
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const roomnameRef = React.useRef<InputRef>();

  const router = useRouter();

  React.useEffect(() => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
    const stringLength = 6
    let randomstring = ''
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      randomstring += chars.substring(rnum, rnum + 1)
    }
    setRoomid(randomstring);
  }, []);

  const createRoom = () => {
    setDoc(doc(db, "userChatRoom", roomid), {
      id: roomid,
      title: roomname,
    })
  }

  const errorCheck = () => {
    if (roomname === "" || roomname === undefined) {
      setErrorMsg('방 이름을 입력해주세요.');
      roomnameRef.current.focus();
      return false;
    } else {
      setErrorMsg('');
    }

    createRoom();
  }

  return (
    <RoomCreateDiv>
      <h1 className='sign_title'>
        생성할 방의 정보를 입력해주세요!
      </h1>
      <Input
        type='hidden'
        placeholder='생성할 방의 주소를 입력해주세요.'
        className='sign_input'
      />

      <Input
        placeholder='생성할 방의 이름을 정해주세요.'
        className='sign_input'
        ref={roomnameRef}
        onKeyPress={
          (e) => {
            if (e.key === "Enter") {
              errorCheck();
              router.replace(`/chatroom/chatroomlist`);
            }
          }
        }
        onChange={
          (e) => {
            setRoomname(e.target.value);
          }
        }
      />
      {
        roomname ?
          <Link
            href={{ pathname: `/chatroom/chatroomlist` }}
          >
            <p
              onClick={
                () => {
                  errorCheck();
                }
              }
              className='chatroomlist_link'
            >
              👉 채팅방 생성하기 👈
            </p>
          </Link>
          :
          null
      }
      <ErrorMsg>
        {errorMsg}
      </ErrorMsg>
    </RoomCreateDiv>
  );
}
