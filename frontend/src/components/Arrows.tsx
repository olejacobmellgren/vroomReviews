import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

function Arrow({
  children,
  disabled,
  onClick
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none"
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
    <Arrow disabled={false} onClick={clickHandler}>
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
    <Arrow disabled={false} onClick={clickHandler}>
      Right
    </Arrow>
  );
}
