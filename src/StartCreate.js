import React from "react";
import img1 from "./imgs/1.png";
import img3 from "./imgs/3.png";
import img5 from "./imgs/5.png";
import img7 from "./imgs/7.png";
import img8 from "./imgs/8.png";

const StartCreate = (props) => {
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
          // justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          overflowX: "hidden",
          overflowY: "auto",
          padding: "0px 10vw",
          boxSizing: "border-box",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "1.5em",
            margin: "0px",
            lineHeight: "1.4",
          }}
        >
          우정 퀴즈를 만들고
          <br /> 친구에게 공유해 보세요!
        </h1>

        <button
          style={{
            marginTop: "10px",
            padding: "8px 24px",
            backgroundColor: "#dadafc",
            borderRadius: "30px",
            border: "#dadafc",
            marginBottom: "26px",
          }}
          onClick={() => {
            props.history.push("/create");
          }}
        >
          시작하기
        </button>

        <img
          src={img1}
          style={{ width: "120%", borderBottom: "1px solid" }}
          alt="images"
        />
        <img
          src={img3}
          style={{ width: "120%", borderBottom: "1px solid" }}
          alt="images"
        />
        <img
          src={img5}
          style={{ width: "120%", borderBottom: "1px solid" }}
          alt="images"
        />
        <img
          src={img7}
          style={{ width: "120%", borderBottom: "1px solid" }}
          alt="images"
        />
        <img
          src={img8}
          style={{
            width: "120%",
            marginBottom: "36px",
          }}
          alt="images"
        />
      </div>
    </div>
  );
};

export default StartCreate;
