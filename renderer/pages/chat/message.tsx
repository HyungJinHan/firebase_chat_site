import Image from 'next/image';
import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import profileImage from '../../public/images/profileImage.svg'

export default function Message(props) {
  const [user] = useAuthState(auth);
  console.log(props.message.uid);

  return (
    <div className={`chat-bubble ${props.message.uid === user.uid ? "right" : ""}`}>
      {
        !props.message.avatar ?
          <Image
            className="chat-bubble_img"
            src={profileImage}
            alt="user avatar"
            width={'50%'}
          />
          :
          <Image
            className="chat-bubble_img"
            src={props.message.avatar}
            alt="user avatar"
            width={'50%'}
          />
      }
      <div className="chat-bubble__right">
        <p className="user-name">{props.message.name}</p>
        <p className="user-message">{props.message.text}</p>
      </div>
    </div>
  );
}
