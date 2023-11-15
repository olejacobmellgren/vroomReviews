import React, { useContext, useEffect, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

function Arrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <>
      <button disabled={disabled} className="arrow-button" onClick={onClick}>
        {children}
      </button>
    </>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } =
    useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !initComplete || (initComplete && isFirstItemVisible),
  );
  useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <div
      style={{ display: disabled ? 'none' : 'block' }}
      className="left-arrow-wrapper"
    >
      <Arrow disabled={disabled} onClick={() => scrollPrev()}>
        <div className="arrow left">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Arrow>
    </div>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } =
    useContext(VisibilityContext);

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = useState(
    !visibleElements.length && isLastItemVisible,
  );

  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <div
      style={{ display: disabled ? 'none' : 'block' }}
      className="right-arrow-wrapper"
    >
      <Arrow disabled={disabled} onClick={() => scrollNext()}>
        <div className="arrow right">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Arrow>
    </div>
  );
}
