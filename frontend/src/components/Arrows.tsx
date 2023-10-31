import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

function Arrow({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: VoidFunction;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        userSelect: "none",
      }}
    >
      {children}
    </button>
  );
}

export function LeftArrow() {
  const {
    getPrevElement,
    scrollToItem,
  } = React.useContext(VisibilityContext);

  // NOTE: for scroll 1 item
  const clickHandler = () => scrollToItem(getPrevElement(), "smooth", "start");
  return (
    <Arrow onClick={clickHandler}>
      Left
    </Arrow>
  );
}

export function RightArrow() {
  const {
    getNextElement,
    scrollToItem,
  } = React.useContext(VisibilityContext);

  // NOTE: for scroll 1 item
  const clickHandler = () => scrollToItem(getNextElement(), "smooth", "end");
  return (
    <Arrow onClick={clickHandler}>
      Right
    </Arrow>
  );
}
