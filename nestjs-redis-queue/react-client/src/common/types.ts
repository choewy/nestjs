export type Auth = {
  userId: number | null;
  chatId: string | null;
};

export type Notificate = {
  userId?: number;
  title: string;
  contents: string;
};

export type Message = {
  senderId: number;
  receiverId: number | null;
  chatId: string | null;
  message: string;
  createdAt: Date;
};
