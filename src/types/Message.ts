export type Message = {
  id: string;
  text: string;
  author?: boolean;
  timeSent: number;
  userId?: string;
  roomId?: string;
  read?: boolean;
};
