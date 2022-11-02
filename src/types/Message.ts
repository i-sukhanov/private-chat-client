export type Message = {
  id: string | number;
  text: string;
  fromMe?: boolean;
  timeSent: number;
  userId?: string;
  roomId?: string;
};
