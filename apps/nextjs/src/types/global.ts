export type House = {
  id: string;
  name: string;
  adminId: string;
} & Partial<{ admin: User }>;

export type HomesProps = {
  homes: House[];
};

export type User = {
  id: string;
  name: string | null;
  username: string | null;
};

export type InviteProps = {
  invite: {
    id: string;
    houseId: string;
    userId: string;
  } & Partial<{ house: House }>;
  mutate: ({}: ReplyObject) => void;
};

type ReplyObject = {
  inviteId: string;
  accepted: boolean;
};

export type Chore = {
  id: string;
  title: string;
  description: string;
  houseId: string;
  userId: string;
  completed: boolean;
  due: Date;
};
