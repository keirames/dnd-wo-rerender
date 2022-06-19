import React from 'react';
import { useDrop } from 'react-dnd';
import { useBarBucket, useMainBucket } from './drag-container';

const Bar: React.FC = () => {
  const [barBucket, setBarBucket] = useBarBucket();

  const [mainBucket, setMainBucket] = useMainBucket();

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: ['chat'],
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop(interactedItem: any, monitor) {
        const item = mainBucket.find((i) => i.id === interactedItem.id);
        setMainBucket(mainBucket.filter((i) => i.id !== interactedItem.id));
        setBarBucket([
          ...barBucket,
          {
            ...item,
            component: React.cloneElement(item.component, { isIcon: true }),
          },
        ]);
      },
    }),
    [barBucket, mainBucket],
  );

  return (
    <div
      className="pt-8 border border-orange-200 w-full h-96"
      // style={{ backgroundColor: isOver ? "red" : "white" }}
      ref={dropRef}
    >
      <span>{canDrop ? 'Release to drop' : 'Drag a box here'}</span>
      {barBucket.map((i) => i.component)}
      <div id="very-unique-id"></div>
    </div>
  );
};

export default Bar;
