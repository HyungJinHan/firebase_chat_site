import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
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
  const [rooms, setRooms] = React.useState([]);
  let list = [];

  const router = useRouter();
  const url = router.pathname;
  const param = router.asPath;

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

  let title = 'HyungJin Han의 채팅앱';

  if (url === '/list/userlist') {
    title = '유저 리스트';
  } else if (url === '/chatroom/chatroomlist') {
    title = '채팅방 리스트';
  } else if (url === '/privatechat/privatechat') {
    title = '1대1 채팅하기';
  } else if (param === '/chatroom/chatroom/study') {
    title = '📚 학업 스트레스 수다방 💯';
  } else if (param === '/chatroom/chatroom/job') {
    title = '📌 취업 정보 공유 채팅방 📋';
  } else if (param === '/chatroom/chatroom/food') {
    title = '🍰 내가 알아낸 맛집 추천 🍖';
  } else if (param === '/chatroom/chatroom/hobby') {
    title = '⚽ 취미 이모저모 🎮';
  } else if (param === '/chatroom/chatroom/music') {
    title = '🎵 혹시 이 음악 아시나요? 🎻';
  }

  const signOut = async () => {
    await deleteDoc(doc(db, 'currentUserList', user.uid))
      .then(() => {
        console.log('Delete');
      })

    await auth.signOut();
    await router.replace('/home');
  };

  return (
    <nav>
      <div className="layout_header">
        <TitleDiv>
          <button
            onClick={
              () => {
                router.back();
              }
            }
            className="signout_button"
          >
            뒤로가기
          </button>
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

          <Link href='/privatechat/privatechat'>
            <span className='layout_link'>1대1 채팅하기</span>
          </Link>
        </TitleDiv>
      </div>
    </nav>
  );
}
