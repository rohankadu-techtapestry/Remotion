// export type User = {
//   username: string;
//   id: string;
//   avatar: string | null;
//   joined: number;
//   lastUsernameChange: boolean;
//   admin: boolean;
//   verified?: boolean;
// };

export type ChatMessage = {
  _id: string;
  text: string;
  createdAt: number;
  uni_identifier: string;
  university: "UZH";
  userId: string;
  system?: boolean;
  likes?: string[];
  quotes?: string;
};

export type SingleMessageApiResponse = {
  messages: ChatMessage;
  user: User;
  userWhoLiked: User[];
};
interface User {
  fullName: string;
  id: number;
  username: string;
}

export interface MessageProps {
  body: string;
  id: number;
  likes: number;
  postId: number;
  user: User;
}
