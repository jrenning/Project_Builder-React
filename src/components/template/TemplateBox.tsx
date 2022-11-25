import React, { useEffect } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTemplates } from "../../hooks/useTemplates";
import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { toast } from "react-toastify";

type Props = {
  language: string;
};

const LanguageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const TemplateNameCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  font-weight: bold;
  outline: solid 0.5px;
  margin-left: 10px;
`;
const TemplateLocationCell = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: whitesmoke;
  font-weight: bold;
`;

const TemplateTitle = styled.h1`
  color: white;
`;

function TemplateBox({ language }: Props) {
  const { template_names, template_locations } = useTemplates(language);

  const handleTemplateDelete = async (e: any, name: string, language: string) => {
    const result = await invoke("delete_template_data", {
      language: language.toLowerCase(),
      name: name,
    })
      .then(() =>
        toast(`Template ${name} successfully deleted`, {
          type: "success",
          hideProgressBar: true,
        })
      )
      .catch( () =>
        toast(`Template ${name} could not be deleted`, {
          type: "error",
          hideProgressBar: true,
        })
      );

  };

  return (
    <div>
      <TemplateTitle>{language} Templates</TemplateTitle>
      <LanguageGrid>
        {template_names.map((name, index) => (
          <React.Fragment key={name}>
            <TemplateNameCell key={index}>
              <div onClick={(e) => handleTemplateDelete(e, name, language)}>
                <DeleteIcon></DeleteIcon>
              </div>
              {name}
            </TemplateNameCell>
            <TemplateLocationCell key={name}>
              {template_locations[index]}
            </TemplateLocationCell>
          </React.Fragment>
        ))}
      </LanguageGrid>
    </div>
  );
}

export default TemplateBox;
