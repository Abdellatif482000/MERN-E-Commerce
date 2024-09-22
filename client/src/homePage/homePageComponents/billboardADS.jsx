import { useState, useEffect, useRef } from "react";

import BBADSStyles from "../../cssModules/sectioStyle.module.css";

export function BilboardADS(props) {
  const products = props.ads.sort((a, b) => a.rating - b.rating).reverse();

  const topItems = products.slice(0, 5);

  const [AD, setAD] = useState(0);
  const [transition, setTransition] = useState(0);
  let lastItm = topItems.length - 1;

  const handleCahngeAD = (direction) => {
    if (direction === "next") {
      if (transition === lastItm * -100) {
        setTransition(0);
      } else {
        setTransition(transition - 100);
      }
    }
    if (direction === "prev") {
      if (transition === 0) {
        setTransition(lastItm * -100);
      } else {
        setTransition(transition + 100);
      }
    }

    console.log(lastItm * -100);
  };
  // const handleAutoChangeAD = () => {
  useEffect(() => {
    setTimeout(() => {
      if (transition || !transition === lastItm * -100) {
        setTransition(transition - 100);
      } else if (transition === lastItm * -100) {
        setTransition(0);
      }
    });
  }, []);
  // };

  return (
    <>
      <div
        className={`${BBADSStyles.ADsContainer}`}
        // onLoad={handleAutoChangeAD}
      >
        {topItems.map((p, idx) => (
          <div
            key={idx}
            className={`${BBADSStyles.AD}`}
            style={{ transform: `translateX(${transition}%)` }}
          >
            <div className={BBADSStyles.ADImgs} id={"imgContainer"}>
              <img
                // key={ADItems[AD].id}
                className={BBADSStyles.img}
                src={p.thumbnail}
                // style={transition}
              />
              <p className={`${BBADSStyles.ADPara}`}>{p.description}</p>
              <button className={`${BBADSStyles.seeMoreBtn}`}>
                See More <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`${BBADSStyles.BBprevBtn}`}
        onClick={() => handleCahngeAD("prev")}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button
        className={`${BBADSStyles.BBnextBtn}`}
        onClick={() => handleCahngeAD("next")}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </>
  );
}
