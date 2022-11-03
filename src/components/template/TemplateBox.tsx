import React from "react";
import styled from "styled-components";
import { useTemplates } from "../../hooks/useTemplates";

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

  return (
    <div>
      <TemplateTitle>{language} Templates</TemplateTitle>
      <LanguageGrid>
        {template_names.map((name, index) => (
          <>
            <TemplateNameCell key={index}>{name}</TemplateNameCell>
            <TemplateLocationCell key={index}>
              {template_locations[index]}
            </TemplateLocationCell>
          </>
        ))}
      </LanguageGrid>
    </div>
  );
}

export default TemplateBox;
