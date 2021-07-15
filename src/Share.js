import React, { useEffect, useRef } from "react";
import img from "./scc_img01.png";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Kakao from "./Kakao";
import {
  FacebookShareButton,
  FacebookIcon,
  KakaoShareButton,
  KakaoIcon,
  LineShareButton,
  LineIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share-kakao";
import KakoStory from "./share_KakaoStory.png";

const Share = (props) => {
  const docRef = useSelector((state) => state.quiz.docRef);
  const url = "https://rumyfriend-c2f37.web.app/start/" + docRef;

  const onClickKakao = () => {
    console.log("==================================================");
    console.log("onClickKakao");
    console.log("==================================================");

    window.Kakao.init("9619962b15a84167783315a66d0e50e3");

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "나에 대한 당신의 우정 점수는?",
        description: `친구가 우정 테스트를 만들었어요!
        친구에 대한 당신의 우정 점수와 랭킹을 확인해 보세요!`,
        imageUrl:
          "https://cdn.pixabay.com/photo/2015/12/08/00/34/men-1081843_960_720.jpg",
        // imageUrl: "https://cdn.pixabay.com/photo/2016/10/12/10/12/women-1733991_960_720.jpg",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      social: {
        likeCount: 1621,
        sharedCount: 2129,
        viewCount: 4187,
      },
      buttons: [
        {
          title: "문제 풀러 가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        {
          title: "나도 문제 만들기",
          link: {
            mobileWebUrl: "https://rumyfriend-c2f37.web.app/create",
            webUrl: "https://rumyfriend-c2f37.web.app/create",
          },
        },
      ],
    });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="outter"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          padding: "0px 10vw",
          boxSizing: "border-box",
          maxWidth: "400px",
        }}
      >
        <img src={img} style={{ width: "80%", margin: "16px" }} alt="images" />
        <h1
          style={{
            fontSize: "1.5em",
            margin: "0px",
            lineHeight: "1.4",
            wordBreak: "break-all",
          }}
        >
          {url}
        </h1>

        <CopyToClipboard
          onClick={true}
          text={url}
          onCopy={() => {
            alert("클립보드에 복사되었습니다.");
          }}
        >
          <button
            id="kakao-link-btn"
            style={{
              padding: "8px 24px",
              backgroundColor: "#dadafc",
              borderRadius: "30px",
              border: "#dadafc",
              marginTop: "18px",
            }}
          >
            클립보드에 복사하기
          </button>
        </CopyToClipboard>
        <div style={{ marginTop: "20px", display: "flex" }}>
          <p>
            <b>Message</b>
          </p>
        </div>

        <div style={{ marginTop: "-10px", display: "flex" }}>
          <a id="kakao-link-btn" onClick={onClickKakao}>
            <KakaoIcon />
          </a>
        </div>

        <div style={{ marginTop: "20px", display: "flex" }}>
          <p>
            <b>SNS Feed</b>
          </p>
        </div>

        <div style={{ marginTop: "-10px", display: "flex" }}>
          <KakaoShareButton url={url}>
            <img
              src={KakoStory}
              style={{
                width: "64px",
                height: "64px",
              }}
              alt="KakaoStoryButton"
            />
          </KakaoShareButton>
          <FacebookShareButton url={url}>
            <FacebookIcon />
          </FacebookShareButton>
          <LineShareButton url={url}>
            <LineIcon />
          </LineShareButton>
          <TelegramShareButton url={url}>
            <TelegramIcon />
          </TelegramShareButton>
        </div>
      </div>
    </div>
  );
};

export default Share;
