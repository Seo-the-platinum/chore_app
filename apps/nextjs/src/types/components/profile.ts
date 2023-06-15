import type { House, User } from "../global";

export type ProfileProps = {
  user: User & Partial<{ homes: House[] }>;
};
