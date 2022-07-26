import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { SortableContainer, arrayMove } from "react-sortable-hoc";

import SortableItem from "../SorableItem";
import getMockApps from "../../utils/getMockApps";
import "./index.css";

const ApplicationList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [currentPageApps, setCurrentPageApps] = useState(
    getMockApps(currentPage)
  );
  const minusCurrentPage = () => {
    if (currentPage < 2) {
      return;
    }
    setCurrentPage(currentPage - 1);
    setCurrentPageApps(getMockApps(currentPage - 1));
    setIsShaking(false);
  };
  const addCurrentPage = () => {
    if (currentPage > 2) {
      return;
    }
    setCurrentPage(currentPage + 1);
    setCurrentPageApps(getMockApps(currentPage + 1));
    setIsShaking(false);
  };

  const onDelete = (index: number) => {
    const copyApps = currentPageApps.slice();
    copyApps.splice(index, 1);
    setCurrentPageApps(copyApps);
  };

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setCurrentPageApps(arrayMove(currentPageApps, oldIndex, newIndex));
  };

  const SortableList = SortableContainer<any>(({ items }: any) => {
    return (
      <div className="app-list">
        {items.map((item: any, index: number) => {
          return (
            <SortableItem
              key={item.name}
              index={index}
              itemIndex={index}
              item={item}
              onDelete={onDelete}
              isShaking={isShaking}
              setIsShaking={setIsShaking}
            />
          );
        })}
      </div>
    );
  });

  return (
    <>
      <FiArrowLeft
        className={`arrow-left ${currentPage < 2 ? "disabled" : ""}`}
        onClick={minusCurrentPage}
        size="20"
      />
      <SortableList
        axis="xy"
        transitionDuration={0}
        items={currentPageApps}
        onSortEnd={onSortEnd}
      />
      <FiArrowRight
        className={`arrow-right ${currentPage > 2 ? "disabled" : ""}`}
        onClick={addCurrentPage}
        size="20"
      />
    </>
  );
};

export default ApplicationList;
