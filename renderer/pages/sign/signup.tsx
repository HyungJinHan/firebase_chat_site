import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { doc, serverTimestamp, setDoc } from '@firebase/firestore';
import * as React from 'react';
import styled from 'styled-components';
import { auth, db } from '../../../firebase';
import { Input } from 'antd';
import type { InputRef } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SignUpDiv = styled.div`
  width: 50%;
  text-align: center;
  display: inline-block;
  padding-top: 50px;
  font-family: 'GmarketSansMedium';
  margin-top: 5rem;
`

const ErrorMsg = styled.p`
  color: red;
  font-weight: bolder;
  font-family: 'GmarketSansMedium';
  padding-top: .625rem;
  text-decoration: underline;
`

export default function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  const emailRef = React.useRef<InputRef>();
  const passwordRef = React.useRef<InputRef>();
  const nameRef = React.useRef<InputRef>();

  const router = useRouter();

  const register = () => {
    if (!name) {
      setErrorMsg('닉네임을 작성해주세요.');
      nameRef.current.focus();
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)

      .then(() => {
        setErrorMsg('');
        updateProfile(auth.currentUser, {
          displayName: name
        });
      })

      .then(() => {
        setDoc(doc(db, "userInfo", auth.currentUser.uid), {
          name: name,
          avatar: auth.currentUser.photoURL,
          createdAt: serverTimestamp(),
          uid: auth.currentUser.uid,
        });
      })

      // .then(() => {
      //   setDoc(doc(db, "currentUserList", auth.currentUser.uid), {
      //     name: name,
      //     avatar: auth.currentUser.photoURL,
      //     createdAt: serverTimestamp(),
      //     uid: auth.currentUser.uid,
      //   });
      // })

      .then(() => {
        router.replace('/home');
      })

      .catch((error) => {
        // eslint-disable-next-line default-case
        switch (error.code) {
          case 'auth/weak-password':
            setErrorMsg('비밀번호는 6자리 이상이어야 합니다.');
            passwordRef.current.focus();
            break;
          case 'auth/invalid-email':
            setErrorMsg('잘못된 이메일 주소 형식입니다.');
            emailRef.current.focus();
            break;
          case 'auth/email-already-in-use':
            setErrorMsg('이미 가입되어 있는 계정입니다.');
            emailRef.current.focus();
            break;
        }
      })
  }

  const errorCheck = () => {
    if (name === "" || name === undefined) {
      setErrorMsg('이메일을 입력해주세요.');
      nameRef.current.focus();
      return false;
    } else {
      setErrorMsg('');
      emailRef.current.focus();
    }

    if (email === "" || email === undefined) {
      setErrorMsg('이메일을 입력해주세요.');
      emailRef.current.focus();
      return false;
    } else {
      setErrorMsg('');
      passwordRef.current.focus();
    }

    if (password === "" || password === undefined) {
      setErrorMsg('비밀번호를 입력해주세요.');
      passwordRef.current.focus();
      return false;
    } else {
      setErrorMsg('');
    }

    register();
  }

  return (
    <SignUpDiv>
      <h1 className='sign_title'>
        회원가입을 해주세요!
      </h1>
      <Input
        placeholder='사용할 닉네임을 입력해주세요.'
        className='sign_input'
        ref={nameRef}
        onKeyPress={
          (e) => {
            if (e.key === "Enter") {
              errorCheck();
            }
          }
        }
        onChange={
          (e) => {
            setName(e.target.value);
          }
        }
      />
      <Input
        placeholder='이메일을 입력해주세요.'
        className='sign_input'
        ref={emailRef}
        onKeyPress={
          (e) => {
            if (e.key === "Enter") {
              errorCheck();
            }
          }
        }
        onChange={
          (e) => {
            setEmail(e.target.value);
          }
        }
      />
      <Input.Password
        placeholder='비밀번호를 입력해주세요.'
        className='sign_input'
        ref={passwordRef}
        onKeyPress={
          (e) => {
            if (e.key === "Enter") {
              errorCheck();
            }
          }
        }
        onChange={
          (e) => {
            setPassword(e.target.value);
          }
        }
      />
      <br />
      <button
        className='sign_button'
        onClick={
          () => {
            errorCheck();
          }
        }
      >
        회원가입하기
      </button>
      <br />
      <span
        className='sign_link'
        onClick={
          () => {
            router.back();
          }
        }
      >
        로그인하러 가기
      </span>
      <ErrorMsg>
        {errorMsg}
      </ErrorMsg>
    </SignUpDiv>
  );
}
