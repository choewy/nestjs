export class AddTaskMessageJobBodyDto {
  receiverId?: number;
  chatId?: string;
  senderId: number;
  message: string;
  createdAt: Date;
}
