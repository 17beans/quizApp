import React, { useEffect, useRef } from "react";
import img from "./scc_img01.png";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Kakao from "./Kakao";

const Share = (props) => {
  const docRef = useSelector((state) => state.quiz.docRef);

  const shareQuiz = async () => {};

  const onClickKakao = () => {
    console.log("==================================================");
    console.log("onClickKakao");
    console.log("==================================================");

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "나에 대한 당신의 우정 점수는?",
        description: "#케익 #딸기 #삼평동 #카페 #분위기 #소개팅",
        imageUrl:
          "http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
        link: {
          mobileWebUrl: "http://localhost:3000/start/" + docRef,
          webUrl: "http://localhost:3000/start/" + docRef,
        },
      },
      social: {
        likeCount: 1621,
        sharedCount: 2129,
        viewCount: 4187,
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: "http://localhost:3000/start/" + docRef,
            webUrl: "http://localhost:3000/start/" + docRef,
          },
        },
        {
          title: "앱으로 보기",
          link: {
            mobileWebUrl: "http://localhost:3000/start/" + docRef,
            webUrl: "http://localhost:3000/start/" + docRef,
          },
        },
      ],
    });

    window.open("https://sharer.kakao.com/talk/friends/picker/link");

    // window.Kakao.Link.sendDefault({
    //   objectType: "feed", // 메시지 형식 : 피드 타입
    //   content: {
    //     title: "나에 대한 당신의 우정 점수는?",
    //     description: "",
    //     imageUrl: "", // 메인으로 보여질 이미지 주소
    //     link: {
    //       mobileWebUrl: "https://rumyfriend.web.app/start/" + docRef,
    //     },
    //   },
    //   social: {
    //     likeCount: 1621,
    //     // commentCount: 0,
    //     sharedCount: 2129,
    //     viewCount: 4187,
    //     // subscriberCount: 0,
    //   },
    //   buttons: [
    //     {
    //       title: "문제 풀러 가기", // 버튼 이름
    //       link: {
    //         mobileWebUrl: "https://rumyfriend.web.app/start/" + docRef,
    //       },
    //     },
    //   ],
    // });
  };

  useEffect(() => {
    // window.Kakao.init("9619962b15a84167783315a66d0e50e3");
    // window.Kakao.Link.createDefaultButton({
    //   container: "#kakao-link-btn",
    //   objectType: "feed",
    //   content: {
    //     title: "나에 대한 당신의 우정 점수는?",
    //     description: "",
    //     imageUrl:
    //       "http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
    //     link: {
    //       mobileWebUrl: "https://rumyfriend.web.app/start/" + docRef,
    //       webUrl: "https://rumyfriend.web.app/start/" + docRef,
    //     },
    //   },
    //   // social: {
    //   //   likeCount: 286,
    //   //   commentCount: 45,
    //   //   sharedCount: 845,
    //   // },
    //   buttons: [
    //     {
    //       title: "웹으로 보기",
    //       link: {
    //         mobileWebUrl: "https://rumyfriend.web.app/start/" + docRef,
    //       },
    //     },
    //     {
    //       title: "앱으로 보기",
    //       link: {
    //         mobileWebUrl: "https://rumyfriend.web.app/start/" + docRef,
    //       },
    //     },
    //   ],
    // });
  }, []);

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
          {"http://localhost:3000/" + docRef}
        </h1>

        <CopyToClipboard
          onClick={true}
          text={"http://localhost:3000/start/" + docRef}
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
            onClick={shareQuiz}
          >
            클립보드에 복사하기
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default Share;
