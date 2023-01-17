import { collection, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import * as React from 'react';
import { db } from '../../../firebase';

export default function PrivateChatRoom() {
  const [users, setUsers] = React.useState([]);
  const [receiverData, setReceiverData] = React.useState({});

  const router = useRouter();
  const param = router.asPath;
  const roomId = param.substring(30,);

  React.useEffect(() => {
    (username, userId) => {
      setReceiverData({
        username: username,
        userId: userId,
      });
    }

    const unsub = onSnapshot(collection(db, "userInfo"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });

    console.log(users, receiverData);

    return unsub;
  }, []);

  // const handleToggle = (username, userId) => {
  //   setReceiverData({
  //     username: username,
  //     userId: userId,
  //   });
  // }

  return (
    <div>
      {roomId}
    </div>
  );
}
