import { atom, useAtom } from "jotai";
import React, { Component, useState } from "react";
import { HtmlPortalNode } from "react-reverse-portal";
import Chat from "../widgets/chat";
import Bar from "./bar";
import Box from "./box";
import PortalBox from "./portal-box";

const mainBucket = atom<any[]>([
  { id: "1", component: <Chat id="1" type="chat" key={1} /> },
]);
export const useMainBucket = () => useAtom(mainBucket);

const barBucket = atom<any[]>([]);
export const useBarBucket = () => useAtom(barBucket);

const node = atom<HtmlPortalNode<Component<any>> | null>(null);
export const useNode = () => useAtom(node);

const iconBucket = atom<string[]>([]);
export const useIconBucket = () => useAtom(iconBucket);

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
