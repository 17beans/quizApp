import React, { useState } from "react";
import styled from "styled-components";
import img from "./scc_img01.png";
import TinderCard from "react-tinder-card";

const Quiz = (props) => {
    // state로 관리하자!
    const [num, setNum] = useState(0);

    const onSwipe = (direction) => {
        console.log("You swiped: " + direction);
        setNum(num + 1);
    };

    if (num > props.list.length - 1) {
        return <div>퀴즈 끝!</div>;
    }

    return (
        <QuizComponent>
            <p>
                <span>{num + 1}번 문제</span>
            </p>

            {props.list.map((l, i) => {
                if (num === i) {
                    return <Question key={i}>{l.question}</Question>;
                }
            })}

            <AnswerZone>
                <Answer>O</Answer>
                <Answer>X</Answer>
            </AnswerZone>

            {props.list.map((l, i) => {
                if (i === num) {
                    return (
                        <DragItem key={i}>
                            <TinderCard onSwipe={onSwipe}>
                                <img src={img} />
                            </TinderCard>
                        </DragItem>
                    );
                }
            })}
        </QuizComponent>
    );
};

const QuizComponent = styled.div`
    text-align: center;
    & > p > span {
        padding: 8px 16px;
        background-color: #fef5d4;
        border-radius: 30px;
    }
`;

const Question = styled.h1`
    font-size: 1.5em;
`;

const AnswerZone = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;

const Answer = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8em;
    font-weight: 600;
    color: #dadafc77;
`;

const DragItem = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    // & div와 & > div는 같습니다!
    // &와 바로 뒤 태그 사이에서 >는 생략 가능합니다!
    & > div {
        background-color: #ffd6aa;
        border-radius: 75px;
    }
    // & img와 & div > img는 같지 않지만! 적용이 잘 됩니다!
    // 그 이유는 & img는 내부에서 img 태그를 찾아서 적용하라! 이지만 & div > img는 div 내의 img를 찾아서 적용하라! 이기 때문이에요 :)
    & img {
        max-width: 150px;
    }
`;

export default Quiz;
