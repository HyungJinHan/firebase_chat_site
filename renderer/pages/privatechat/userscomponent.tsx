import { List } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import profileImage from '../../public/images/profileImage.svg';

export default function UsersComponent(props) {
  console.log(props.currentUserId)
  console.log(props.users)

  const handleToggle = (name, uid) => {
    props.setReceiverData({
      name: name,
      uid: uid,
    });

    // props.router.replace({
    //   pathname: '/privatechat/example',
    //   as: `/privatechat/example/${props.uid}`
    // })
  };

  return (
    <div className='privatechat_user'>
      {props.users?.map((data) => {
        console.log(data);

        if (props.currentUserId !== data.uid)
          return (
            <div
              onClick={() => {
                handleToggle(data.name, data.uid);
              }}
            >
              <Link
                key={data.uid}
                href={{
                  pathname: `/privatechat/privatechat`,
                  query: data.uid,
                }}
                as={`/privatechat/privatechat/${data.uid}`}
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
            </div>
          );
      })}
    </div>
  );
}