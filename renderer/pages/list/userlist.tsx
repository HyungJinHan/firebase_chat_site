import { collection, getDocs } from '@firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { db } from '../../../firebase';
import profileImage from '../../public/images/profileImage.svg';

export default function UserList() {
  const [user, setUser] = React.useState([]);
  let list = [];

  const router = useRouter();
  const url = router.pathname;
  console.log(url);

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
      <h2>서비스에 가입한 유저</h2>
      <br />
      <h3>1 : 1 채팅을 시작해보세요!</h3>
      <br />
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
