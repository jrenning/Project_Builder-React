import { useEffect } from "react";
import { useIsMount } from "./useIsMount";

export const useFormSubmit = (
  submitHandler: (data: any) => Promise<void>,
  formState: any,
  setPath: React.Dispatch<React.SetStateAction<any>>
) => {

  const isMount = useIsMount()
  // only call when state has been fully updated
  useEffect(() => {
    // skip submit on initial page load
    if (!isMount) {
      const submitProject = async () => {
        await submitHandler(formState);
      };
      submitProject();
      // set path fpr vscode open button
      setPath(formState.Path + "\\" + formState.Project_Name);
    }
  }, [formState]);
};