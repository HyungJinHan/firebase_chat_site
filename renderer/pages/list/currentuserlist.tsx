import { collection, getDocs } from '@firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { db } from '../../../firebase';
import profileImage from '../../public/images/profileImage.svg';

export interface IAppProps {
}

export default function CurrentUserList(props: IAppProps) {
  const [currentUser, setCurrentUser] = React.useState([]);
  let list = [];

  React.useEffect(() => {
    getDocs(collection(db, 'currentUserList'))
      .then((res) => {
        res.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        })
      })
      .then(() => {
        setCurrentUser(list);
        console.log(currentUser);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      {currentUser?.map((data) => (
        <Link
          href={{
            pathname: `/privatechat/chatroom`,
            query: data.uid,
          }}
          as={`/privatechat/chatroom/${data.uid}`}
        >
          <div id={data.uid}>
            {
              !data.avatar ?
                <Image
                  src={profileImage}
                  alt="user avatar"
                />
                :
                <Image
                  src={data.avatar}
                  alt="user avatar"
                />
            }
            <p>{data.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
