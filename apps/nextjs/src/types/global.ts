export type House = {
  id: string;
  name: string;
  adminId: string;
} & Partial<{ admin: User }>;

export type HomesProps = {
  homes: House[];
};

type User = {
  id: string;
  name: string | null;
};
