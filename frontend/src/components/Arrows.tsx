import React, { useContext, useEffect, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

export function Arrow({
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
      <button
        aria-label="arrow-button"
        disabled={disabled}
        className="arrow-button"
        onClick={onClick}
        data-testid="arrow-button"
      >
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
      <Arrow
        disabled={disabled}
        onClick={() => scrollPrev()}
        test-id="left-arrow"
      >
        <div className="arrow left">
          <figure/>
          <figure/>
          <figure/>
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
      <Arrow
        disabled={disabled}
        onClick={() => scrollNext()}
        test-id="right-arrow"
      >
        <div className="arrow right">
          <canvas role="none"/>
          <canvas role="none"/>
          <canvas role="none"/>
        </div>
      </Arrow>
    </div>
  );
}
