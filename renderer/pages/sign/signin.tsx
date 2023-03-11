import * as React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import styled from "styled-components";
import { Input } from "antd";
import type { InputRef } from "antd";
import Link from "next/link";

const ErrorMsg = styled.div`
  color: red;
  font-weight: bolder;
  font-family: "GmarketSansMedium";
  padding-top: 0.625rem;
  text-decoration: underline;
`;

export default function SignIn() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  const emailRef = React.useRef<InputRef>();
  const passwordRef = React.useRef<InputRef>();

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setErrorMsg("");
      })

      // .then(() => {
      //   setDoc(doc(db, "currentUserList", auth.currentUser.uid), {
      //     name: auth.currentUser.displayName,
      //     avatar: auth.currentUser.photoURL,
      //     createdAt: serverTimestamp(),
      //     uid: auth.currentUser.uid,
      //   });
      // })

      .catch((error) => {
        // eslint-disable-next-line default-case
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMsg("가입된 정보가 없습니다.");
            emailRef.current.focus();
            break;
          case "auth/invalid-email":
            setErrorMsg("잘못된 이메일 주소 형식입니다.");
            emailRef.current.focus();
            break;
          case "auth/weak-password":
            setErrorMsg("비밀번호는 6자리 이상이어야 합니다.");
            passwordRef.current.focus();
            break;
          case "auth/wrong-password":
            setErrorMsg("비밀번호가 잘못되었습니다.");
            passwordRef.current.focus();
            break;
        }
      });
  };

  const errorCheck = () => {
    if (email === "" || email === undefined) {
      setErrorMsg("이메일을 입력해주세요.");
      emailRef.current.focus();
      return false;
    } else {
      setErrorMsg("");
      passwordRef.current.focus();
    }

    if (password === "" || password === undefined) {
      setErrorMsg("비밀번호를 입력해주세요.");
      passwordRef.current.focus();
      return false;
    } else {
      setErrorMsg("");
    }

    login();
  };

  return (
    <>
      <h1 className="sign_title">로그인을 해주세요!</h1>
      <Input
        placeholder="이메일을 입력해주세요."
        className="sign_input"
        ref={emailRef}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            errorCheck();
          }
        }}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <Input.Password
        placeholder="비밀번호를 입력해주세요."
        className="sign_input"
        ref={passwordRef}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            errorCheck();
          }
        }}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button
        className="sign_button"
        onClick={() => {
          errorCheck();
        }}
      >
        로그인
      </button>
      <br />
      <Link href="/sign/signup">
        <span className="sign_link">처음이신가요?</span>
      </Link>
      {/* <ErrorMsg> */}
      <div className="sign_error">{errorMsg}</div>
      {/* </ErrorMsg> */}
    </>
  );
}
