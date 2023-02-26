import Image from 'next/image';
import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import profileImage from '../../public/images/profileImage.svg';

export default function Message(props) {
  const [user] = useAuthState(auth);

  return (
    <div className={`chat-bubble ${props.message.uid === user.uid ? "right" : ""}`}>
      <div className='message_maindiv'>
        {
          !props.message.avatar ?
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
              src={props.message.avatar}
              alt="user avatar"
              width={'50%'}
              height={'50%'}
            />
        }
        <p className='user-name'>{props.message.name}</p>
      </div>
      <div className='message_div'>
        <span className="user-message">{props.message.text}</span>
      </div>
    </div>
  );
}
