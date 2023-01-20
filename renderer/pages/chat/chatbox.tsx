import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import * as React from 'react';
import { db } from '../../../firebase';
import Message from './message';
import SendMessage from './sendmessage';

export default function ChatBox(props) {
  const [messages, setMessages] = React.useState([]);
  const scroll = React.useRef<HTMLInputElement>();
  const currentMsgScroll = React.useRef<HTMLInputElement>();

  React.useEffect(() => {
    const q = query(
      collection(db, 'chatRoom', props.roomId, "messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    // currentMsgScroll.current.scrollIntoView({ behavior: "smooth" });

    return unsubscribe;
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={currentMsgScroll}></span>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} roomId={props.roomId} />
    </main>
  );
}
