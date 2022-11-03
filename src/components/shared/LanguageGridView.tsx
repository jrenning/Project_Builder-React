import React, { ChangeEvent, ReactComponentElement, ReactNode, useState } from "react";
import styled from "styled-components";
import { FormLabel } from "../../styles/FormStyles";
import { languages } from "../../utility/constants";

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
          {/* Select Box component unnecessary here  */}
          <select onChange={updateTemplateLanguage}>
            <option>All</option>
            {languages.map((language, index) => (
              <option key={index}>{language}</option>
            ))}
          </select>
        </LanguageSelect>
        {templateLanguages.map((language, index) => (
          <BoxViewComponent language={language} key={index} />
        ))}
    </TemplateViewDiv>
  );
}

export default TemplateView;
