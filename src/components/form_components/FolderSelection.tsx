import { open } from "@tauri-apps/api/dialog";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import FormButton from "../shared/FormButton";
import { Input } from "./Input";

type Props = {
  form: any;
};


function FolderSelection({ form }: Props) {
    
  const openFileSelection = async (e: any) => {
    e.preventDefault();
    // select directory
    let result = await open({
      defaultPath: "",
      directory: true,
      multiple: false,
    });
    // if selection isn't null set as path
    if (result != null && !Array.isArray(result)) {
      // add result to form page for easy reference
      form.setValue("Path", result);
    }
  };
  return (
    <>
      <FormButton name="Choose Path" onClick={openFileSelection} />
      <Input
        label="Path"
        type="text"
        placeholder="Path"
        readOnly={true}
        {...form.register("Path")}
      />
    </>
  );
}

export default FolderSelection;
