import { faker } from "@faker-js/faker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";
import React, { useEffect, useState, useMemo } from "react";
import { useDrag } from "react-dnd";
import * as portals from "react-reverse-portal";
import { useNode } from "../drag-view/drag-container";

export const PortalWrapper = () => {
  const portalNode = useMemo(() => portals.createHtmlPortalNode(), []);

  const [_, setNode] = useNode();

  useEffect(() => {
    setNode(portalNode);
  }, []);

  return (
    <portals.InPortal node={portalNode}>
      <EnhancedChat type="enhanced-chat" id="3" />
    </portals.InPortal>
  );
};

const EnhancedChat = ({
  type,
  id,
  isIcon = false,
}: {
  type: string;
  id: string;
  isIcon?: boolean;
}) => {
  const [messages, setMessages] = useState<string[]>([]);

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type,
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => [...prev, faker.music.genre()]);
    }, 1500);

    return () => clearInterval(id);
  }, []);

  if (isIcon)
    return (
      <div
        className="border border-purple-700 border-2 w-12 cursor-pointer"
        ref={dragRef}
        style={{ opacity }}
      >
        <FontAwesomeIcon icon="fa-regular fa-message" />
      </div>
    );

  return (
    <div
      className="border border-blue-200 overflow-y-auto h-32"
      ref={dragRef}
      style={{ opacity }}
    >
      {messages.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          {messages.map((m) => (
            <div key={nanoid()}>{m}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedChat;
