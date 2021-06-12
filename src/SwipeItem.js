import React from "react";
import styled from "styled-components";
import img from "./scc_img01.png";

const SwipeItem = ({ onSwipe }) => {
  const swipe_div = React.useRef();

  let swipe_status = "ready";
  let target_classname = "";
  let coordinate = {
    start_x: 0,
    start_y: 0,
    end_x: 0,
    end_y: 0,
  };

  React.useEffect(() => {
    const reset = () => {
      swipe_status = "ready";
      coordinate = {
        start_x: 0,
        start_y: 0,
        end_x: 0,
        end_y: 0,
      };

      swipe_div.current.className = target_classname;
      console.log("Touch Reset! \n className: " + swipe_div.current.className);
    };

    const touchStart = (e) => {
      swipe_status = "touchstart";
      target_classname = swipe_div.current.className;

      coordinate = {
        start_x: e.touches[0].clientX,
        start_y: e.touches[0].clientY,
      };

      // console.log("Touch Start! \n className: " + target_classname);
    };

    const touchEnd = (e) => {
      swipe_status = "touchend";

      coordinate = {
        ...coordinate,
        end_x: e.changedTouches[0].clientX,
        end_y: e.changedTouches[0].clientY,
      };

      let diff_x = coordinate.end_x - coordinate.start_x;
      let direct = "left";

      if (Math.abs(diff_x) > 50) {
        swipe_div.current.className = target_classname + " swipe";
        swipe_div.current.style.left = 0 + "px";
        swipe_div.current.style.top = 0 + "px";

        // console.log(
        //     "TouchaEnd! \n if(diff_x_abs > 50)_className: " +
        //         swipe_div.current.className
        // );
      }

      if (diff_x > 0) {
        direct = "right";
        swipe_div.current.style.left = diff_x + 150 + "px";
        swipe_div.current.style.opacity = 0;
      } else {
        direct = "left";
        swipe_div.current.style.left = diff_x - 150 + "px";
        swipe_div.current.style.opacity = 0;
      }

      setTimeout(() => {
        reset();
        onSwipe(direct);
      }, 300);
    };

    const touchMove = (e) => {
      e.preventDefault();

      let current_coordinate = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      swipe_div.current.style.left =
        current_coordinate.x - coordinate.start_x + "px";
      swipe_div.current.style.top =
        current_coordinate.y - coordinate.start_y + "px";
    };

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
      <div>
        <img src={img}></img>
      </div>
    </DragItem>
  );
};

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

  &.swipe {
    transition: 300ms;
  }
  // & div와 & > div는 같습니다!
  // &와 바로 뒤 태그 사이에서 >는 생략 가능하며 &도 생략 가능 합니다!
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

SwipeItem.defaultProps = {
  onSwipe: () => {},
};

export default React.memo(SwipeItem);
