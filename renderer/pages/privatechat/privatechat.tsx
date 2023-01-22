import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import * as React from 'react';
import styled from 'styled-components';
import { auth, db } from '../../../firebase';
import UsersComponent from './userscomponent';
import { IoIosSend } from 'react-icons/io';
import Image from 'next/image';
import profileImage from '../../public/images/profileImage.svg';

const PrivateTitleDiv = styled.div`
  text-align: center;
  /* display: inline-block; */
`

const PrivateUserDiv = styled.div`
  display: inline-block;
`

export default function PrivateChat() {
  const [users, setUsers] = React.useState([]);

  const [receiverData, setReceiverData] = React.useState(null);
  const [chatMessage, setChatMessage] = React.useState<string>("");

  const [allMessages, setAllMessages] = React.useState([]);

  const scroll = React.useRef<HTMLInputElement>();
  const inputRef = React.useRef<HTMLInputElement>();

  const user = auth.currentUser;

  const router = useRouter();
  const param = router.asPath;
  const url = param.substring(24,);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "userInfo"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
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

  const sendMessage = async (event) => {
    event.preventDefault();
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
    inputRef.current.focus();
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PrivateTitleDiv>
        <div className='chatroomlist_div'>
          <h2>1대1 채팅을 해보세요!</h2>
          <br />
        </div>
      </PrivateTitleDiv>

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

      <div className="privatechat-wrapper">
        {allMessages &&
          allMessages.map(({ messages }) => {
            return (
              <div
                className={`chat-bubble ${messages.messageUserId === user.uid ? "right" : ""}`}
              >
                <span ref={scroll}></span>
                <div className='message_maindiv'>
                  {
                    !messages.avatar ?
                      <Image
                        className="chat-bubble_img"
                        src={profileImage}
                        alt="user avatar"
                        width={'50%'}
                        height={'50%'}
                      />
                      :
                      <Image
                        className="chat-bubble_img"
                        src={messages.avatar}
                        alt="user avatar"
                        width={'50%'}
                        height={'50%'}
                      />
                  }
                  <p className='user-name'>{messages.username}</p>
                </div>
                <div className='message_div'>
                  <span className="user-message">{messages.message}</span>
                </div>
              </div>
            );
          })}
      </div>
      {
        url === '' ?
          null
          :
          <form onSubmit={(event) => sendMessage(event)} className="send-message">
            <input
              ref={inputRef}
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              id="messageInput"
              name="messageInput"
              type="text"
              className="form-input__input"
              placeholder="메세지를 입력하세요!"
            />
            {
              !chatMessage ?
                <button disabled>
                  <IoIosSend
                    style={{
                      fontSize: `30px`,
                      color: '#3DA2FF',
                      transition: `0.3s`
                    }}
                  />
                </button>
                :
                <button
                  onClick={sendMessage}
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  <IoIosSend
                    style={{
                      fontSize: `30px`,
                      transition: `0.3s`
                    }}
                  />
                </button>
            }
          </form>
      }
    </>
  );
}