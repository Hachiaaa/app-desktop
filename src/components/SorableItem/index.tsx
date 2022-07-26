import { SortableElement } from "react-sortable-hoc";
import { useRef, useEffect } from "react";

interface ApplicationItemProps {
  itemIndex: number;
  item: any;
  isShaking: boolean;
  setIsShaking: (s: boolean) => void;
  onDelete: (i: number) => void;
}

const ApplicationItem = ({
  item,
  itemIndex,
  isShaking,
  setIsShaking,
  onDelete,
}: ApplicationItemProps) => {
  const timerId = useRef<any>(null);
  const onMouseDown = () => {
    timerId.current = setTimeout(() => {
      setIsShaking(true);
    }, 1000);
  };
  const clearTimer = (event: any) => {
    event.preventDefault();
    clearTimeout(timerId.current);
    timerId.current = null;
  };
  useEffect(() => {
    const clickHandler = (e: any) => {
      setIsShaking(false);
    };
    document.body.addEventListener("click", clickHandler);
    return () => document.body.removeEventListener("click", clickHandler);
  }, []);
  return (
    <div
      className={`app-wrapper ${isShaking ? "shaking" : ""}`}
      onMouseDown={onMouseDown}
      onMouseMove={clearTimer}
      onMouseUp={clearTimer}
    >
      <div className="app-img" onClick={(e: any) => e.stopPropagation()}>
        <img src={item.src} alt={item.name}></img>
        {isShaking && (
          <div className="delete" onClick={() => onDelete(itemIndex)}>
            -
          </div>
        )}
      </div>
      <span className="app-text">{item.name}</span>
    </div>
  );
};

export default SortableElement<any>(ApplicationItem);
