import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import * as React from 'react';
import { auth, db } from '../../../firebase';

export default function SendMessage(props) {
  const [message, setMessage] = React.useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, 'chatRoom', props.roomId, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

    setMessage("");

    props.scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="메세지를 입력하세요!"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
