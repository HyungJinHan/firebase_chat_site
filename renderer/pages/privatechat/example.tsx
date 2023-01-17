import { Button } from 'antd';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import * as React from 'react';
import { auth, db } from '../../../firebase';
import UsersComponent from './userscomponent';

export default function Example() {
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
    <div>
      <div
        style={{
          display: "flex",
          padding: 5,
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ margin: 0 }}>{user?.displayName} </h4>
        <Button
          color="secondary"
          onClick={() => {
            auth.signOut();
            router.replace('/home');
          }}
        >
          Logout
        </Button>
      </div>
      All users
      <div style={{ overflowY: "scroll" }}>
        <UsersComponent
          users={users}
          setReceiverData={setReceiverData}
          router={router}
          currentUserId={user?.uid}
        />
      </div>

      <h4 style={{ margin: 2, padding: 10 }}>
        {receiverData ? receiverData.username : user?.displayName}{" "}
      </h4>

      <div>
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

      <div style={{ width: "100%", display: "flex", flex: 0.08 }}>
        <input
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          style={input}
          type="text"
          placeholder="Type message..."
        />
        <Button onClick={sendMessage}>
          보내기
        </Button>
      </div>
    </div>
  );
}

const root = {
  display: "flex",
  flexDirection: "row",
  flex: 1,
  width: "100%",
};

const left = {
  display: "flex",
  flex: 0.2,
  height: "95vh",
  margin: 10,
  flexDirection: "column",
};

const right = {
  display: "flex",
  flex: 0.8,
  height: "95vh",
  margin: 10,
  flexDirection: "column",
};

const input = {
  flex: 1,
  outline: "none",
  borderRadius: 5,
  border: "none",
};

const messagesDiv = {
  backgroundColor: "#FBEEE6",
  padding: 5,
  display: "flex",
  flexDirection: "column",
  flex: 1,
  maxHeight: 460,
  overflowY: "scroll",
};