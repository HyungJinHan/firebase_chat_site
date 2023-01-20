import { Tooltip } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import profileImage from '../../public/images/profileImage.svg';

export default function UsersComponent(props) {
  const handleToggle = (name, uid) => {
    props.setReceiverData({
      name: name,
      uid: uid,
    });
  };

  return (
    <div className='privatechat_userdiv'>
      {props.users?.map((data) => {
        if (props.currentUserId !== data.uid)
          return (
            <Tooltip
              placement="bottom"
              title={
                `${data.name}와 채팅하기`
              }
            >
              <div
                className='privatechat_user'
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
            </Tooltip>
          );
      })}
    </div>
  );
}