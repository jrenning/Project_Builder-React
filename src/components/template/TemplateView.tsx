import React, { ChangeEvent, ReactComponentElement, ReactNode, useState } from "react";
import styled from "styled-components";
import { FormLabel } from "../../styles/FormStyles";
import { languages } from "../../utility/constants";
import { SelectBox } from "../shared/SelectBox";
import TemplateBox from "./TemplateBox";

const LanguageSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const TemplateViewDiv = styled.div`
    padding: .25rem;
    margin-bottom: 2rem;
`

type Props = {
    BoxViewComponent: any
}


function TemplateView({BoxViewComponent}: Props) {
  const [templateLanguages, setTemplateLanguages] = useState(languages);
  const updateTemplateLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "All") {
      setTemplateLanguages(languages);
    } else {
      setTemplateLanguages([e.target.value]);
    }
  };

  return (
    <TemplateViewDiv>
        <LanguageSelect>
          <FormLabel />
          <SelectBox
            select_name="Choose Lanaguage"
            options={languages}
            default_option="All"
            onChange={updateTemplateLanguage}
          />
        </LanguageSelect>
        {templateLanguages.map((language, index) => (
          <BoxViewComponent language={language} key={index} />
        ))}
    </TemplateViewDiv>
  );
}

export default TemplateView;
