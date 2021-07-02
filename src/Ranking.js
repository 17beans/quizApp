import React from "react";
import styled from "styled-components";
import img from "./Loading.gif";
import { useSelector, useDispatch } from "react-redux";
import { resetAnswer } from "./redux/modules/quiz";
import { getRankFB } from "./redux/modules/rank";

const Ranking = (props) => {
  const dispatch = useDispatch();
  const _ranking = useSelector((state) => state.rank.ranking);
  const is_loaded = useSelector((state) => state.rank.is_loaded);
  const docRef = useSelector((state) => state.quiz.docRef);

  React.useEffect(() => {
    // 주소에서 파라미터로 받아온 quiz 문서 이름이 저장된 quiz module의 docRef를 getRankFB에 매개변수로 넘겨줌
    dispatch(getRankFB(docRef));
    // console.log("docRef: " + JSON.stringify(docRef));
    if (!user_rank.current) {
      return;
    }

    window.scrollTo({
      top: user_rank.current.offsetTop - 68,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const user_rank = React.useRef(null);

  const ranking = _ranking.sort((a, b) => {
    return b.score - a.score;
  });

  if (!is_loaded) {
    return (
      <ImgContainer>
        <Img src={img} />
      </ImgContainer>
    );
  }

  return (
    <RankContainer>
      <Topbar>
        <p>
          <span>{ranking.length}명</span>의 사람들 중 당신은?
        </p>
      </Topbar>

      <RankWrap>
        {console.log("ranking(Ranking.js):" + JSON.stringify(ranking))}
        {console.log("_ranking(Ranking.js):" + JSON.stringify(_ranking))}
        {/* 위 콘솔이 2번 찍히는데 1번째는 current:true가 추가되지 않은 객체 배열, */}
        {/* 2번째는 current:true가 message, name 등의 정보와 함께 통째로 추가된 객체 배열 */}
        {ranking.map((r, idx) => {
          if (r.current) {
            return (
              <RankItem key={idx} highlight={true} ref={user_rank}>
                <RankNum>{idx + 1}등</RankNum>
                <RankUser>
                  <p>
                    <b>{r.name}</b>님: {r.score}점
                  </p>
                  <p>{r.message}</p>
                </RankUser>
              </RankItem>
            );
          }
          return (
            <RankItem key={idx}>
              <RankNum>{idx + 1}등</RankNum>
              <RankUser>
                <p>
                  <b>{r.name}</b>님: {r.score}점
                </p>
                <p>{r.message}</p>
              </RankUser>
            </RankItem>
          );
        })}
      </RankWrap>

      <Button
        onClick={() => {
          dispatch(resetAnswer());
          window.location.href = `/start/${docRef}`;
        }}
      >
        다시 하기
      </Button>
    </RankContainer>
  );
};

const RankContainer = styled.div`
  width: 100%;
  padding-bottom: 100px;
`;

const Topbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 50px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  & > p {
    text-align: center;
  }

  & > p > span {
    border-radius: 30px;
    background-color: #fef5d4;
    font-weight: 600;
    padding: 4px 8px;
  }
`;

const RankWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 58px;
`;

const RankItem = styled.div`
  width: 80vw;
  margin: 8px auto;
  display: flex;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 8px 16px;
  align-items: center;
  background-color: ${(props) => (props.highlight ? "#ffd6aa" : "#ffffff")};
`;

const RankNum = styled.div`
  text-align: center;
  font-size: 2em;
  font-weight: 600;
  padding: 0px 16px 0px 0px;
  border-right: 1px solid #ddd;
`;

const RankUser = styled.div`
  padding: 8px 16px;
  text-align: left;
  & > p {
    &:first-child > b {
      border-bottom: 2px solid #212121;
    }
    margin: 0px 0px 8px 0px;
  }
`;

const Button = styled.button`
  position: fixed;
  bottom: 5vh;
  left: 0;
  padding: 8px 24px;
  background-color: ${(props) => (props.outlined ? "#ffffff" : "#dadafc")};
  border-radius: 30px;
  margin: 0px 10vw;
  border: 1px solid #dadafc;
  width: 80vw;
`;

const ImgContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 100px;
`;

export default Ranking;
