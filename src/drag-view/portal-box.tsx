import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

const PortalBox: React.FC = () => {
  const el = useRef();

  const target = document.querySelector('#very-unique-id');
  console.log('target', target);
  console.log('outside', document.querySelector('#outside'));

  if (!el.current) return null;

  return ReactDOM.createPortal(
    <div>hehe</div>,
    document.querySelector('#outside')!,
  );

  // return (
  //   <div className="border border-black-400 w-full h-96">
  //     <span>portal box</span>
  //   </div>
  // );
};

export default PortalBox;
