import React, { useRef, useEffect, ReactNode, RefObject } from "react";

type Props = {
  children: ReactNode;
  onClickOutside: Function;
  className?: string;
  style?: React.CSSProperties;
};

function useOutsideAlerter(
  ref: RefObject<HTMLElement>,
  onClickOutside: Function
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLInputElement)
      ) {
        onClickOutside(event);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

export default function ClickAwayHandler({
  children,
  onClickOutside,
  className,
  style,
}: Props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClickOutside);

  return (
    <div ref={wrapperRef} className={className} style={style}>
      {children}
    </div>
  );
}
