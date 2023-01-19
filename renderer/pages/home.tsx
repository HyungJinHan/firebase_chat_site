import { useRouter } from 'next/router';
import * as React from 'react';
import { auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import Link from 'next/link';
import SignIn from './sign/signin';
import { MainPage } from './main/mainpage';
import styled from 'styled-components';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import UserList from './list/userlist';

const MainDiv = styled.div`
  display: flex;
  padding-top: 50px;
`

const SignInDiv = styled.div`
  width: 50%;
  text-align: center;
  display: inline-block;
  padding-top: 50px;
  font-family: 'GmarketSansMedium';
  margin-top: 5rem;
`

export default function App() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const url = router.pathname;
  console.log(url);
  console.log(router);

  if (!user) {
    return (
      <SignInDiv>
        <SignIn />
      </SignInDiv>
    );
  } else if (user) {
    return (
      <>
        <MainPage />
      </>
    );
  }
}
