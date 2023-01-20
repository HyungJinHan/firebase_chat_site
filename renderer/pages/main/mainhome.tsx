import * as React from 'react';
import { BsFillChatDotsFill } from "react-icons/bs";
import styled from 'styled-components';

const MainHomeDiv = styled.div`
  text-align: center;
`

export default function MainHome() {
  return (
    <MainHomeDiv>
      <div className='mainhome_div'>
        <div className='mainhome_chaticon'>
          <BsFillChatDotsFill />
        </div>
      </div>
      <div className='mainhome_font'>
        <span className='mainhome_span'>Nextron</span>
        과 <span className='mainhome_span'>Firebase</span>를
        사용한 간단한&nbsp;
        <span className='mainhome_span'>채팅 사이트</span>
        입니다.
        <br />
        <br />
        지금까지 가입한&nbsp;
        <span className='mainhome_span'>유저의 정보</span>
        를 확인할 수 있으며,
        <br />
        <br />
        관심사에 따른&nbsp;
        <span className='mainhome_span'>단체 채팅방</span>,
        유저끼리의&nbsp;
        <span className='mainhome_span'>1대1 채팅방</span>
        이 구현되어 있습니다.
      </div>
    </MainHomeDiv >
  );
}
