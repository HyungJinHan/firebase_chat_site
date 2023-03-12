import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import GlobalStyles from "../public/styles/styledComponents/GlobalStyles";
import "../public/styles/chat/chat.css";
import "../public/styles/main/main.css";
import "../public/styles/sign/sign.css";
import "../public/styles/layout/layout.css";
import Header from "../layout/Header";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";

const progress = new ProgressBar({
  size: 5,
  color: "#3DA2FF",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {user ? (
        <>
          <Header />
        </>
      ) : null}
      <Component {...pageProps} />
      <GlobalStyles />
    </React.Fragment>
  );
}

export default MyApp;
