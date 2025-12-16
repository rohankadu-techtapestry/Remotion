import React, { useCallback, useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender } from "remotion";
// import { Box, Typography } from "@mui/material";
import Background from "./Background";

import useMsgStore from "./store/useMsgStore";

const Stories: React.FC<{ messageIds: number[] }> = ({ messageIds }) => {
  const [handle] = useState(() => delayRender());

  const message = useMsgStore((state) => state.message);
  const setMessages = useMsgStore((state) => state.setMessage);

  const fetchMessage = useCallback(async () => {
    const fetchMessages = await Promise.all(
      messageIds.map(async (msg) => {
        const response = await fetch(`https://dummyjson.com/comments/${msg}`);
        const json = await response.json();
        return json;
      }),
    );
    console.log(fetchMessages);
    setMessages(fetchMessages);
    continueRender(handle);
  }, [handle, messageIds, setMessages]);

  useEffect(() => {
    fetchMessage();
  }, [fetchMessage]);

  if (!message) return null;

  return (
    <AbsoluteFill>
      <Background />
    </AbsoluteFill>
  );
};

export default Stories;
