import React from "react";
import { useDrop } from "react-dnd";
import { useBarBucket, useMainBucket } from "./drag-container";

const Box = ({ id, children }: { id: string; children?: React.ReactNode }) => {
  const [barBucket, setBarBucket] = useBarBucket();

  const [mainBucket, setMainBucket] = useMainBucket();

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: ["chat"],
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop(interactedItem: any, monitor) {
        const item = barBucket.find((i) => i.id === interactedItem.id);
        setBarBucket(barBucket.filter((i) => i.id !== interactedItem.id));
        setMainBucket([
          ...mainBucket,
          {
            ...item,
            component: React.cloneElement(item.component, { isIcon: false }),
          },
        ]);
      },
    }),
    [barBucket, mainBucket]
  );

  return (
    <div
      ref={dropRef}
      className="border border-pink-200 w-full h-96"
      // style={{ backgroundColor: isOver ? "red" : "white" }}
    >
      <span>box id:{id} </span>
      <span>{canDrop ? "Release to drop" : "Drag a box here"}</span>
      {mainBucket.map((b) => b.component)}
    </div>
  );
};

export default Box;
