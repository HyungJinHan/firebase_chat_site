import { useRouter } from 'next/router';
import * as React from 'react';
import { auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import Link from 'next/link';
import SignIn from './sign/signin';
import { MainPage } from './main/mainpage';

export interface IAppProps {
}

export default function App(props: IAppProps) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const url = router.pathname;
  console.log(url);
  console.log(router);

  if (url === '/home') {
    if (!user) {
      return (
        <div className='welcome'>
          <SignIn />
        </div>
      );
    } else if (user) {
      return (
        <>
          <MainPage />
        </>
      );
    }
  }

}
