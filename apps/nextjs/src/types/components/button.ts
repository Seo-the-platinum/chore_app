export type ButtonProps = {
  label: string;
  handle?: () => void;
  type?: "button" | "submit" | "reset";
};
