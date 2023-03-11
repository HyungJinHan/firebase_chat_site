import { useRouter } from "next/router";
import * as React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import SignIn from "./sign/signin";
import MainPage from "./main/mainpage";
import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  padding-top: 50px;
`;

const SignInDiv = styled.div`
  width: 50%;
  text-align: center;
  display: inline-block;
  padding-top: 100px;
  font-family: "GmarketSansMedium";
  margin-top: 5rem;
`;

export default function App() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const url = router.pathname;

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
