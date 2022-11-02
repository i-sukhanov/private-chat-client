export type Message = {
  id: string | number;
  text: string;
  author?: boolean;
  timeSent: number;
  userId?: string;
  roomId?: string;
};
