import { ChangeEvent, useState } from "react";

export const useGithub = (): [
  boolean,
  (data: ChangeEvent<HTMLSelectElement>) => void
] => {
  const [Github, setGithub] = useState(false);

  const checkGithub = (data: ChangeEvent<HTMLSelectElement>) => {
    if (
      data.target.value == "Create repo and connect" ||
      data.target.value == "Connect to existing repo"
    ) {
      setGithub(true);
    } else {
      setGithub(false);
    }
  };

  return [Github, checkGithub];
};