import { User } from "./types";

export const mockUsers: User[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  skills: ["JavaScript", "React", "Node.js"].slice(
    0,
    Math.floor(Math.random() * 3) + 1
  ),
  github: `https://github.com/user${index + 1}`,
  projects: [
    {
      name: `Project ${index + 1}-1`,
      url: `https://github.com/user${index + 1}/project1`,
    },
    {
      name: `Project ${index + 1}-2`,
      url: `https://github.com/user${index + 1}/project2`,
    },
  ],
}));
