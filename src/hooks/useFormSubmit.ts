import { useEffect } from "react";
import { useIsMount } from "./useIsMount";

/**
 * Hook that allows for state to be updated before a submission happens
 * Additionally, it stops itself from running on first render
 * @param submitHandler Handler that takes in the form data and makes a project from it
 * @param formState The current form state of the form in question
 * @param setPath A setter for the global path for the specific language, used to enable the vscode open button
 */
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