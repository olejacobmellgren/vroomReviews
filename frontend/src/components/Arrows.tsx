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
    isFirstItemVisible,
    scrollToItem,
    visibleElements,
    initComplete
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  // NOTE: for scroll 1 item
  const clickHandler = () => scrollToItem(getPrevElement(), "smooth", "start");
  return (
    <Arrow disabled={disabled} onClick={clickHandler}>
      Left
    </Arrow>
  );
}

export function RightArrow() {
  const {
    getNextElement,
    isLastItemVisible,
    scrollToItem,
    visibleElements
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  // NOTE: for scroll 1 item
  const clickHandler = () => scrollToItem(getNextElement(), "smooth", "end");
  return (
    <Arrow disabled={disabled} onClick={clickHandler}>
      Right
    </Arrow>
  );
}
