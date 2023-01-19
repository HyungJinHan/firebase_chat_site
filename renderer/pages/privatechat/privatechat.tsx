import { Button } from 'antd';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import * as React from 'react';
import styled from 'styled-components';
import { auth, db } from '../../../firebase';
import UsersComponent from './userscomponent';
import { IoIosSend } from 'react-icons/io';

const PrivateUserDiv = styled.div`
  text-align: center;
  display: flex;
`

export default function PrivateChat() {
  const [users, setUsers] = React.useState([]);

  const [receiverData, setReceiverData] = React.useState(null);
  const [chatMessage, setChatMessage] = React.useState("");

  const [allMessages, setAllMessages] = React.useState([]);

  const user = auth.currentUser;

  const router = useRouter();

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "userInfo"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
      console.log(users);
    });

    return unsub;
  }, []);

  React.useEffect(() => {
    if (receiverData) {
      const unsub = onSnapshot(
        query(
          collection(
            db,
            "userInfo",
            user?.uid,
            "chatUsers",
            receiverData?.uid,
            "messages"
          ),
          orderBy("timestamp")
        ),
        (snapshot) => {
          setAllMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              messages: doc.data(),
            }))
          );
        }
      );
      return unsub;
    }
  }, [receiverData?.uid]);

  const sendMessage = async () => {
    try {
      if (user && receiverData) {
        await addDoc(
          collection(
            db,
            "userInfo",
            user.uid,
            "chatUsers",
            receiverData.uid,
            "messages"
          ),
          {
            username: user.displayName,
            messageUserId: user.uid,
            message: chatMessage,
            timestamp: new Date(),
          }
        );

        await addDoc(
          collection(
            db,
            "userInfo",
            receiverData.uid,
            "chatUsers",
            user.uid,
            "messages"
          ),
          {
            username: user.displayName,
            messageUserId: user.uid,
            message: chatMessage,
            timestamp: new Date(),
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
    setChatMessage("");
  };

  return (
    <>
      <PrivateUserDiv>
        <div className='privatechat_div'>
          <UsersComponent
            users={users}
            setReceiverData={setReceiverData}
            router={router}
            currentUserId={user?.uid}
          />
        </div>
      </PrivateUserDiv>

      <h4 style={{ margin: 2, padding: 10 }}>
        {receiverData ? receiverData.username : user?.displayName}{" "}
      </h4>

      <div className='privatechat_div'>
        {/* messages area */}

        {allMessages &&
          allMessages.map(({ id, messages }) => {
            return (
              <div
                key={id}
                style={{
                  margin: 2,
                  display: "flex",
                  flexDirection:
                    user?.uid == messages.messageUserId
                      ? "row-reverse"
                      : "row",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#BB8FCE",
                    padding: 6,
                    borderTopLeftRadius:
                      user?.uid == messages.messageUserId ? 10 : 0,
                    borderTopRightRadius:
                      user?.uid == messages.messageUserId ? 0 : 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    maxWidth: 400,
                    fontSize: 15,
                    textAlign:
                      user?.uid == messages.messageUserId ? "right" : "left",
                  }}
                >
                  {messages.message}
                </span>
              </div>
            );
          })}
      </div>

      <div className="send-message">
        <input
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          id="messageInput"
          name="messageInput"
          type="text"
          className="form-input__input"
          placeholder="메세지를 입력하세요!"
        />
        <button onClick={sendMessage}>
          {/* <IoIosSend /> */}
          보내기
        </button>
      </div>
    </>
  );
}