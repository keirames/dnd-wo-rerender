import React, { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import ReactDOM from "react-dom";
import EnhancedChat, { PortalWrapper } from "../widgets/enhanced-chat";
import { useIconBucket, useNode } from "./drag-container";
import * as portals from "react-reverse-portal";

const PortalBox: React.FC = () => {
  const [node] = useNode();

  const [iconBucket, setIconBucket] = useIconBucket();

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: ["enhanced-chat"],
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop(interactedItem: any, monitor) {
        if (iconBucket.find((i) => i === "enhanced-chat")) {
          setIconBucket((prev) => prev.filter((i) => i !== "enhanced-chat"));
        }
        return;
      },
    }),
    [iconBucket]
  );

  useEffect(() => {}, [iconBucket]);

  return (
    <div className="border border-black-400 w-full h-96" ref={dropRef}>
      <PortalWrapper />
      {iconBucket.filter((i) => i === "enhanced-chat").length === 0 && node ? (
        <portals.OutPortal node={node} />
      ) : null}
    </div>
  );
};

export default PortalBox;
