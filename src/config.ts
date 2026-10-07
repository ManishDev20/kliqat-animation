import {staticFile} from "remotion";

export const A = {
  black: "#050505",
  white: "#fff",
  purple: "#7C3AED",
  gray: "#A1A1AA",
  font: "Poppins",
  logo: staticFile("logo.svg"),
  projects: staticFile("screenshots/projects.jpg"),
  detail: staticFile("screenshots/project-detail.jpg"),
  gallery: staticFile("screenshots/gallery.jpg"),
  assignments: staticFile("screenshots/assignments.jpg"),
} as const;
