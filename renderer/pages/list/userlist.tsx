import { collection, getDocs } from '@firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import styled from 'styled-components';
import { db } from '../../../firebase';
import profileImage from '../../public/images/profileImage.svg';

const UserListDiv = styled.div`
  text-align: center;
  display: inline-block;
`

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
    <UserListDiv>
      <div className='userlist_div'>
        <h2>지금까지 가입한 유저에요!</h2>
        <br />
        <div className='userlist_list'>
          {user?.map((data) => (
            <>
              <Link
                href={{
                  pathname: `/privatechat/privatechatroom`,
                  query: data.uid,
                }}
                as={`/privatechat/privatechatroom/${data.uid}`}
              >
                <>
                  <div className='userlist_article'>
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
                    <p>
                      {data.name}
                    </p>
                  </div>
                </>
              </Link>
            </>
          ))}
        </div>
      </div>
    </UserListDiv>
  );
}
