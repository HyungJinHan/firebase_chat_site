import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: "baseFont";
    src: url("./static/fonts/TTF/LeferiBaseRegular.ttf");
  }

  @font-face {
    font-family: "boldFont";
    src: url("./static/fonts/TTF/LeferiBaseBold.ttf");
  }

  @font-face {
    font-family: "melonFont";
    src: url("./static/fonts/EARLYFONT_WATERMELON_SALAD/EF_watermelonSalad.ttf");
  }

  @font-face {
    font-family: "dohyeon";
    src: url("./static/fonts/BMDOHYEON_ttf.ttf");
  }

  @font-face {
    font-family: 'BMJUA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'LINESeedKR-Bd';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "nexonL";
    src: url("./static/fonts/NEXONLIGHT.TTF");
  }

  @font-face {
    font-family: "nexon";
    src: url("./static/fonts/NEXON.TTF");
  }

 html,
  body {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    max-width: 100vw;
    font-size: 16px;
    text-align: center;
    font-family: 'LINESeedKR-Bd';
  }

  ::selection {
    background: transparent;
    color: #3DA2FF;
}
`
export default GlobalStyles;