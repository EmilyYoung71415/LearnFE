/*
  use `as const` instead of `enum` in TypeScript?
  enum ButtonType {
    Primary,
    Secondary,
    Success,
    Danger,
  }
*/
const ButtonType = {
  Primary: "Primary",
  Secondary: "Secondary",
  Success: "Success",
  Danger: "Danger",
} as const;

type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];
// ButtonType = "Primary" | "Secondary" | "Success" | "Danger"

interface ButtonProps {
  type: ButtonType;
}
