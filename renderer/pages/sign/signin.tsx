import * as React from 'react';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { auth, db } from "../../../firebase";
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import type { InputRef } from 'antd';
import Link from 'next/link';

const SignInDiv = styled.div`
  width: 500px;
  text-align: center;
  display: inline-block;
  padding-top: 50px;
`

const ErrorMsg = styled.p`
  color: red;
  font-weight: bolder;
`

export interface IAppProps {
}

export default function SignIn(props: IAppProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  const emailRef = React.useRef<InputRef>();
  const passwordRef = React.useRef<InputRef>();

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)

      .then(() => {
        console.log('확인용 ->', auth);
        setErrorMsg('');
      })
      .then(() => {
        setDoc(doc(db, "currentUserList", auth.currentUser.uid), {
          name: auth.currentUser.displayName,
          avatar: auth.currentUser.photoURL,
          createdAt: serverTimestamp(),
          uid: auth.currentUser.uid,
        });
      })

      .catch((error) => {
        // eslint-disable-next-line default-case
        switch (error.code) {
          case 'auth/invalid-email':
            setErrorMsg('잘못된 이메일 주소 형식입니다.');
            emailRef.current.focus();
            break;
          case 'auth/weak-password':
            setErrorMsg('비밀번호는 6자리 이상이어야 합니다.');
            passwordRef.current.focus();
            break;
          case 'auth/wrong-password':
            setErrorMsg('비밀번호가 잘못되었습니다.');
            passwordRef.current.focus();
            break;
        }
      })
  }

  const errorCheck = () => {
    if (email === "" || email === undefined) {
      setErrorMsg('이메일을 입력해주세요');
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

    login();
  }

  return (
    <SignInDiv>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <h1>로그인</h1>
        </Form.Item>
        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요' }]}
        >
          <Input
            ref={emailRef}
            onChange={
              (e) => {
                setEmail(e.target.value);
              }
            }
          />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
        >
          <Input.Password
            ref={passwordRef}
            onChange={
              (e) => {
                setPassword(e.target.value);
              }
            }
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            onClick={
              () => {
                errorCheck();
              }
            }
            type="primary"
          >
            로그인
          </Button>

          {/* &nbsp;
          &nbsp;

          <Button
            onClick={
              () => {
                googleSignIn();
              }
            }
            type="primary"
          >
            구글로 로그인하기
          </Button> */}

          <br />
          <br />

          <Link href='/sign/signup'><a>처음이신가요?</a></Link>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <ErrorMsg>
            <u>{errorMsg}</u>
          </ErrorMsg>
        </Form.Item>
      </Form>
    </SignInDiv>
  );
}
