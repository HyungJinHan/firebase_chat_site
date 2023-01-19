import Link from 'next/link';
import * as React from 'react';

export default function Sidebar() {
  return (
    <nav className='layout_sidebar'>
      <Link href='/list/userlist'>
        <span className='layout_link'>현재 유저 리스트</span>
      </Link>
      <br />
      <br />
      <Link href='/chatroom/chatroomlist'>
        <span className='layout_link'>채팅방 리스트</span>
      </Link>
      <br />
      <br />
      <Link href='/list/userlist'>
        <span className='layout_link'>현재 유저 리스트</span>
      </Link>
      <br />
      <br />
      <Link href='/list/userlist'>
        <span className='layout_link'>현재 유저 리스트</span>
      </Link>
    </nav>
  );
}