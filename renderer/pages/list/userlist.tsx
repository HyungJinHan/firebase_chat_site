import { collection, getDocs } from '@firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { db } from '../../../firebase';
import profileImage from '../../public/images/profileImage.svg';

export interface IAppProps {
}

export default function UserList(props: IAppProps) {
  const [user, setUser] = React.useState([]);
  let list = [];

  React.useEffect(() => {
    getDocs(collection(db, 'userInfo'))
      .then((res) => {
        res.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        })
      })
      .then(() => {
        setUser(list);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      {user?.map((data) => (
        <Link
          href={{
            pathname: `/privatechat/privatechatroom`,
            query: data.uid,
          }}
          as={`/privatechat/privatechatroom/${data.uid}`}
        >
          <div>
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
