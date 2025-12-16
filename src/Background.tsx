import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import useMsgStore from "./store/useMsgStore";
import { interpolate, useCurrentFrame } from "remotion";

const FRAMES_PER_MESSAGE = 60;
const ANIMATION_DURATION = 30;

const Background: React.FC = () => {
  const message = useMsgStore((state) => state.message);
  const frame = useCurrentFrame();
  const getWordOpacity = (frame: number, startFrame: number, index: number) => {
    const delay = index * 4; // speed (lower = faster)
    return interpolate(
      frame,
      [startFrame + delay, startFrame + delay + 10],
      [0, 1],
      { extrapolateRight: "clamp" },
    );
  };

  const getColorFromUserIdForAvtar = (userId: number) => {
    const colors = [
      "#00C1FC",
      "#FF6B6B",
      "#FFD93D",
      "#6BCB77",
      "#845EC2",
      "#FF9671",
      "#4D96FF",
      "#F9A826",
      "#2D3436", // Charcoal
      "#6D214F", // Wine
    ];

    return colors[userId % colors.length];
  };

  const getColorFromUserId = (userId: number) => {
    const colors = [
      "#2D3436", // Charcoal
      "#6D214F", // Wine
      "#1B1464", // Navy

      "#833471", // Purple
      "#006266", // Deep Teal
      "#2C2C54", // Midnight
      "#3B3B98", // Dark Indigo
      "#00C1FC",
      "#FF6B6B",
    ];

    return colors[userId % colors.length];
  };

  const getdatedFromUserId = (userId: number) => {
    const dates = [
      "9:20 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:15 AM",
      "11:35 AM",
      "12:00 PM",
      "12:45 PM",
      "1:00 PM",
      "1:10 PM",
    ];
    return dates[userId % dates.length];
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#82FFBE", padding: 54 }}>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "white",
          // eslint-disable-next-line @remotion/slow-css-property
          boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
          borderRadius: 10,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            p: 4,
            background: "#2ECC71", // Emerald
          }}
        >
          <Typography sx={{ fontSize: 50 }}>Today's Messages</Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            // gridTemplateColumns: "auto auto",
            gap: 5,
            padding: 5,
            mt: 1,
          }}
        >
          {message &&
            message.length > 0 &&
            message.map((msg, index) => {
              const startFrame = index * FRAMES_PER_MESSAGE;

              if (frame < startFrame) return null;

              const opacity = interpolate(
                frame,
                [startFrame, startFrame + ANIMATION_DURATION],
                [0, 1],
                { extrapolateRight: "clamp" },
              );

              const translateY = interpolate(
                frame,
                [startFrame, startFrame + ANIMATION_DURATION],
                [20, 0],
                { extrapolateRight: "clamp" },
              );
              return (
                <Box
                  key={msg.id}
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    mb: 5,

                    background: getColorFromUserId(msg.user.id),
                    color: "white",
                    borderRadius: 10,
                    padding: 2,
                    // eslint-disable-next-line @remotion/slow-css-property
                    boxShadow: "0 5px 10px rgba(0,0,0,0.5)",
                    opacity,
                    transform: `translateY(${translateY}px)`,
                    ":hover": {
                      // eslint-disable-next-line @remotion/slow-css-property
                      boxShadow: "0 5px 10px rgba(0,0,0,1)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        mt: 0.5,

                        mb: 2,
                      }}
                    >
                      <Stack direction={"row"}>
                        <Avatar
                          sx={{
                            mt: 0.89,
                            bgcolor: getColorFromUserIdForAvtar(msg.user.id),
                            width: 56,
                            height: 56,
                            fontSize: 22,
                            fontWeight: "bold",
                          }}
                        >
                          {msg.user.fullName
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}
                        </Avatar>
                        <Typography
                          sx={{
                            fontSize: 50,
                            fontWeight: "bold",
                            ml: 2,
                          }}
                        >
                          {msg.user.fullName}
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 5,
                          mt: 1,
                          mb: 0.5,
                          mr: 5,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 30,
                          }}
                        >
                          {msg.likes} ❤️
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 30,
                          }}
                        >
                          {msg.postId} Posts
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: 40,
                        ml: 9,
                        lineHeight: 1.4,
                        wordWrap: "break-word",
                      }}
                    >
                      {msg.body.split(" ").map((word, i) => (
                        <span
                          key={i}
                          style={{
                            opacity: getWordOpacity(frame, startFrame, i),
                            display: "inline-block",
                            marginRight: 8,
                          }}
                        >
                          {word}
                        </span>
                      ))}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 12,
                      right: 16,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 25,
                        opacity: 0.8,
                      }}
                    >
                      {getdatedFromUserId(msg.user.id)}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </AbsoluteFill>
  );
};

export default Background;
