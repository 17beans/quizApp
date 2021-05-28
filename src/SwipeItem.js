import React, { memo, useEffect, useRef } from "react";
import TinderCard from "react-tinder-card";
import styled from "styled-components";
import img from "./scc_img01.png";

const SwipeItem = memo(({ onSwipe }) => {
  const swipe_div = useRef(null);
  let swipe_status = "ready";
  let target_classname = "";
  let coordinate = {
    start_x: 0,
    start_y: 0,
    end_x: 0,
    end_y: 0,
  };

  useEffect(() => {
    const reset = () => {};

    const touchStart = (e) => {
      swipe_status = "touchstart";
      target_classname = swipe_div.current.target_className;

      coordinate = {
        ...coordinate,
        start_x: e.touches[0].clientX,
        start_y: e.touches[0].clientY,
      };
    };

    const touchEnd = (e) => {
      swipe_status = "touchend";
      target_classname = swipe_div.current.target_className;

      coordinate = {
        ...coordinate,
        end_x: e.changedTouches[0].clientX,
        end_y: e.changedTouches[0].clientY,
      };

      let diff_x = coordinate.end_x - coordinate.start_x;
      let direct = "left";

      if (diff_x > 0) {
        direct = "right";
      } else {
        direct = "left";
      }

      onSwipe(direct);
    };

    const touchMove = (e) => {};

    const touchCancel = (e) => {};

    swipe_div.current.addEventListener("touchstart", touchStart);
    swipe_div.current.addEventListener("touchmove", touchMove);
    swipe_div.current.addEventListener("touchend", touchEnd);
    swipe_div.current.addEventListener("touchcancel", touchCancel);

    return () => {
      if (!swipe_div.current) {
        return;
      }
      swipe_div.current.removeEventListener("touchstart", touchStart);
      swipe_div.current.removeEventListener("touchmove", touchMove);
      swipe_div.current.removeEventListener("touchend", touchEnd);
      swipe_div.current.removeEventListener("touchcancel", touchCancel);
    };
  }, []);

  return (
    <DragItem ref={swipe_div}>
      {/* <TinderCard onSwipe={onSwipe}> */}
      <img src={img}></img>
      {/* </TinderCard> */}
    </DragItem>
  );
});

SwipeItem.defaultProps = {
  onSwipe: () => {},
};

const DragItem = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    max-width: 150px;
  }
  & > div {
    background-color: #ffd6aa;
    border-radius: 150px;
  }
`;

export default SwipeItem;
