import React from 'react';
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
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible),
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <div className="left-arrow-wrapper">
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
    React.useContext(VisibilityContext);

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible,
  );

  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <div className="right-arrow-wrapper">
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
