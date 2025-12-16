import { create } from "zustand";
import { type MessageProps } from "../types";

type setMessagesPropsFn = (
  updater: ((prev: MessageProps[]) => MessageProps[]) | MessageProps[],
) => void;
interface MsgStore {
  message: MessageProps[];
  setMessage: setMessagesPropsFn;
}

const useMsgStore = create<MsgStore>((set) => ({
  message: [],
  setMessage: (msg) =>
    set((state) => ({
      message: typeof msg === "function" ? msg(state.message) : msg,
    })),
}));

export default useMsgStore;
