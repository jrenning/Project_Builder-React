import { ChangeEvent, useState } from "react";
/**
 * 
 * @param data The event data from the select box that controls the git setup
 * @returns 
 */
export const useGithub = (
): [boolean, (data: ChangeEvent<HTMLSelectElement>) => void] => {
  const [Github, setGithub] = useState(false);

  const checkGithub = (data: ChangeEvent<HTMLSelectElement>) => {
    if (data.target.value == "Connect to existing repo") {
      setGithub(true);
    } else {
      setGithub(false);
    }
  };

  return [Github, checkGithub];
};