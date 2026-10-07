import {staticFile} from "remotion";

export const A = {
  black: "#050505",
  white: "#FFFFFF",
  purple: "#7C3AED",
  ink: "#171717",
  muted: "#737373",
  line: "#E7E7E7",
  soft: "#F7F7F7",
  font: "Poppins, Inter, Arial, sans-serif",
  logo: staticFile("logo.svg"),
} as const;
