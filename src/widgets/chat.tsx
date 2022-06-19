import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { faker } from '@faker-js/faker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      type: 'chat',
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  );

  useEffect(() => {
    return () => console.log('component unmount', id);
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
            <div className="">{m}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
