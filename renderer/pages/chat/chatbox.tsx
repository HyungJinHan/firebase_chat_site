import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import * as React from "react";
import { db } from "../../../firebase";
import SendMessage from "./sendmessage";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import profileImage from "../../public/images/profileImage.svg";

export default function ChatBox(props) {
  const [messages, setMessages] = React.useState([]);
  const [user] = useAuthState(auth);
  const scroll = React.useRef<HTMLInputElement>();

  React.useEffect(() => {
    const q = query(
      collection(db, "chatRoom", props.roomId, "messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      scroll.current.scrollIntoView({ behavior: "smooth" });
    });

    return unsubscribe;
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <div
            key={message.id}
            className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}
          >
            <div className="message_maindiv">
              {!message.avatar ? (
                <Image
                  className="chat-bubble_img"
                  src={profileImage}
                  alt="user avatar"
                  width={"50%"}
                  height={"50%"}
                />
              ) : (
                <Image
                  className="chat-bubble_img"
                  src={message.avatar}
                  alt="user avatar"
                  width={"50%"}
                  height={"50%"}
                />
              )}
              <p className="user-name">{message.name}</p>
            </div>
            <div className="message_div">
              <span className="user-message">{message.text}</span>
            </div>
          </div>
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} roomId={props.roomId} />
    </main>
  );
}
