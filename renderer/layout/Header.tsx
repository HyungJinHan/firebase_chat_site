import { deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../../firebase';

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
`

export default function Header() {
  const [user] = useAuthState(auth);

  const router = useRouter();
  const url = router.pathname;

  let title = 'HyungJin Han의 채팅앱';

  if (url === '/list/userlist') {
    title = '유저 리스트 보기';
  } else if (url === '/chatroom/chatroomlist') {
    title = '채팅방 리스트 보기';
  }

  const signOut = async () => {
    await deleteDoc(doc(db, 'currentUserList', user.uid))
      .then(() => {
        console.log('Delete');
      })

    await auth.signOut();
  };

  return (
    <nav>
      <div className="layout_header">
        <TitleDiv>
          <h1>{title}</h1>
          <button
            onClick={
              () => {
                signOut();
              }
            }
            className="signout_button"
          >
            로그아웃
          </button>
        </TitleDiv>

        <TitleDiv>
          <Link href='/list/userlist'>
            <span className='layout_link'>유저 리스트</span>
          </Link>

          <Link href='/chatroom/chatroomlist'>
            <span className='layout_link'>채팅방 리스트</span>
          </Link>

          <Link href='/list/userlist'>
            <span className='layout_link'>1대1 채팅하기</span>
          </Link>

          {/* <Link href='/list/userlist'>
            <span className='layout_link'>현재 유저 리스트</span>
          </Link> */}
        </TitleDiv>
      </div>
    </nav>
  );
}
