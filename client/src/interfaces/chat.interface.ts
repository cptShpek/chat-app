export interface Chat {
  _id: string;
  createdAt: string;
  updatedAt: string;
  users: ChatUser[];
  messages: Message[];
}

export interface ChatUser {
  name: string;
  email: string;
  _id: string;
}

export interface Message {
  text: string;
  name: string;
  createdAt: string;
}
