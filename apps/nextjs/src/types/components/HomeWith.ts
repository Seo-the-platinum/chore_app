import type { Chore, House } from "../global";

export type HomeWithProps = {
  home: House & Partial<{ chores: Chore[] }>;
};
