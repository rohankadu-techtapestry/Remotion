import React, { useCallback, useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender } from "remotion";
// import { Box } from "@mui/material";
import Background from "./Background";

import { type MessageProps } from "./types";

const Stories: React.FC<{ messageIds: number[] }> = ({ messageIds }) => {
  const [handle] = useState(() => delayRender());
  const [message, setMessages] = useState<MessageProps[] | null>(null);
  const fetchMessage = useCallback(async () => {
    const messages = await Promise.all(
      messageIds.map(async (msg) => {
        const response = await fetch(`https://dummyjson.com/comments/${msg}`);
        const json = await response.json();
        return json;
      }),
    );
    console.log(messages);
    setMessages(messages);
    continueRender(handle);
  }, [handle, messageIds]);

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
