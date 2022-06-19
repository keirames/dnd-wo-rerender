import { atom, useAtom } from 'jotai';
import React, { useState } from 'react';
import Chat from '../widgets/chat';
import Bar from './bar';
import Box from './box';
import PortalBox from './portal-box';

const mainBucket = atom<any[]>([
  { id: '1', component: <Chat id="1" type="chat" key={1} /> },
]);

const barBucket = atom<any[]>([]);

export const useBarBucket = () => useAtom(barBucket);

export const useMainBucket = () => useAtom(mainBucket);

const DragContainer = () => {
  return (
    <div className="relative pt-8">
      <span className="font-medium absolute top-0 left-0">drag container</span>
      <div className="pt-8 flex flex-row justify-around items-center">
        <Bar />
        <Box id="1" />
        <PortalBox />
      </div>
    </div>
  );
};

export default DragContainer;
