import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { doc, serverTimestamp, setDoc } from '@firebase/firestore';
import * as React from 'react';
import styled from 'styled-components';
import { auth, db } from '../../../firebase';
import { Button, Form, Input, InputRef } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignUpDiv = styled.div`
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

export default function App(props: IAppProps) {
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

      .then(() => {
        setDoc(doc(db, "currentUserList", auth.currentUser.uid), {
          name: name,
          avatar: auth.currentUser.photoURL,
          createdAt: serverTimestamp(),
          uid: auth.currentUser.uid,
        });
      })

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

  return (
    <SignUpDiv>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <h1>회원가입</h1>
        </Form.Item>

        <Form.Item
          label="닉네임"
          name="name"
          rules={[{ required: true, message: '닉네임을 입력해주세요!' }]}
        >
          <Input
            ref={nameRef}
            onChange={
              (e) => {
                setName(e.target.value);
              }
            }
          />
        </Form.Item>

        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요!' }]}
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
          rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
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
            type="primary"
            onClick={
              () => {
                register();
              }
            }
          >
            회원가입하기
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <ErrorMsg>
            <u>{errorMsg}</u>
          </ErrorMsg>
        </Form.Item>
      </Form>
    </SignUpDiv>
  );
}
