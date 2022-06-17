import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { faker } from "@faker-js/faker";

const Chat = ({
  type,
  id,
  isIcon = false,
}: {
  type: string;
  id: string;
  isIcon: boolean;
}) => {
  const [messages, setMessages] = useState<string[]>([]);

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "chat",
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  useEffect(() => {
    return () => console.log("component unmount", id);
  }, []);

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
        <div>chat icon</div>
      </div>
    );

  return (
    <div
      className="border border-blue-200 overflow-y-auto h-32"
      ref={dragRef}
      style={{ opacity }}
    >
      <span>
        chat {id} isIcon = {isIcon ? "yes" : "no"}
      </span>
      {messages.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          {messages.map((m) => (
            <div className="">{m}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
