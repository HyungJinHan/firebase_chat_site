import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import * as React from "react";
import { IoIosSend } from "react-icons/io";
import { auth, db } from "../../../firebase";
import Swal from "sweetalert2";

export default function SendMessage(props) {
  const [message, setMessage] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>();

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      Swal.fire("메세지를 입력해주세요!");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, "chatRoom", props.roomId, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    inputRef.current.focus();
    props.scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <input
        ref={inputRef}
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="메세지를 입력하세요!"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {!message ? (
        <button type="submit" disabled>
          <IoIosSend
            style={{
              fontSize: `30px`,
              color: "#3DA2FF",
              transition: `0.3s`,
            }}
          />
        </button>
      ) : (
        <button
          type="submit"
          style={{
            cursor: "pointer",
          }}
        >
          <IoIosSend
            style={{
              fontSize: `30px`,
              transition: `0.3s`,
            }}
          />
        </button>
      )}
    </form>
  );
}
