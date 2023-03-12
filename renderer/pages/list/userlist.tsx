import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "@firebase/firestore";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { auth, db } from "../../../firebase";
import profileImage from "../../public/images/profileImage.svg";

const UserListDiv = styled.div`
  text-align: center;
  display: inline-block;
`;

export default function UserList() {
  const [user, setUser] = React.useState([]);
  const currentUser = auth.currentUser;

  let list = [];

  const router = useRouter();
  const url = router.pathname;

  React.useEffect(() => {
    getDocs(query(collection(db, "userInfo"), orderBy("createdAt")))
      .then((res) => {
        res.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
      })
      .then(() => {
        setUser(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const userDelete = (currentUser) => {
    Swal.fire({
      title: "서비스를 탈퇴하시겠습니까?",
      text: "지금까지의 채팅 내역은 삭제됩니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3DA2FF",
      cancelButtonColor: "red",
      confirmButtonText: "하겠습니다.",
      cancelButtonText: "아니요.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "userInfo", currentUser.uid));
        await currentUser.delete();
        await Swal.fire(
          "탈퇴되었습니다.",
          "해당 아이디의 정보는 삭제됩니다!",
          "success"
        );
        await router.push("/home");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          "취소하셨습니다.",
          "해당 서비스를 오래 즐겨주세요! :)",
          "error"
        );
      }
    });
  };

  return (
    <UserListDiv>
      <div className="userlist_div">
        <h2>지금까지 가입한 유저에요!</h2>
        <br />
        <div className="userlist_list">
          {user?.map((data) => (
            <>
              {data.uid !== currentUser?.uid ? (
                <div className="userlist_article" key={data.createdAt}>
                  <Tooltip
                    placement="bottom"
                    title={`가입일 : ${data.createdAt.toDate().getFullYear()}-${
                      data.createdAt.toDate().getMonth() + 1
                    }-${data.createdAt.toDate().getDate()}`}
                  >
                    {!data.avatar ? (
                      <Image src={profileImage} alt="user avatar" />
                    ) : (
                      <Image src={data.avatar} alt="user avatar" />
                    )}
                    <p>{data.name}</p>
                  </Tooltip>
                </div>
              ) : (
                <div
                  className="userlist_article userlist_delete"
                  key={data.createdAt}
                >
                  <Tooltip placement="bottom" title="탈퇴하기">
                    {!data.avatar ? (
                      <Image
                        src={profileImage}
                        alt="user avatar"
                        onClick={() => userDelete(currentUser)}
                      />
                    ) : (
                      <Image
                        src={data.avatar}
                        alt="user avatar"
                        onClick={() => userDelete(currentUser)}
                      />
                    )}
                    <p>{data.name}</p>
                  </Tooltip>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </UserListDiv>
  );
}
