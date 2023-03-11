import { useRouter } from "next/router";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../../../firebase";
import ChatRoomList from "../chatroom/chatroomlist";
import UserList from "../list/userlist";
import PrivateChat from "../privatechat/privatechat";
import MainHome from "./mainhome";

const MainDiv = styled.div`
  display: flex;
  padding-top: 50px;
  width: 80%;
`;

export default function MainPage() {
  const [user] = useAuthState(auth);

  const router = useRouter();
  const url = router.pathname;

  if (url === "/home") {
    return <MainHome />;
  }

  if (url === "/list/userlist") {
    return (
      <div className="layout_mainpage">
        <MainDiv>
          <UserList />
        </MainDiv>
      </div>
    );
  }

  if (url === "/chatroom/chatroomlist") {
    return (
      <div className="layout_mainpage">
        <MainDiv>
          <ChatRoomList />
        </MainDiv>
      </div>
    );
  }

  if (url === "/privatechat/privatechat") {
    return (
      <div className="layout_mainpage">
        <MainDiv>
          <PrivateChat />
        </MainDiv>
      </div>
    );
  }
}
