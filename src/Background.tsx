import React from "react";
import { AbsoluteFill } from "remotion";
import { Box } from "@mui/material";

const Background: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#82FFBE", padding: 54 }}>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "white",
          // eslint-disable-next-line @remotion/slow-css-property
          boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
        }}
      ></Box>
    </AbsoluteFill>
  );
};

export default Background;
