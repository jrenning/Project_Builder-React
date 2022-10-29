import React from 'react'
import styled from "styled-components";

type Props = {
    language: string
}

const LanguageGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`

const TemplateNameCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: whitesmoke;
    font-weight: bold;
    outline: solid .5px;
    margin-left: 10px;

`
const TemplateLocationCell = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: whitesmoke;
  font-weight: bold;
`;

const TemplateTitle = styled.h1`
    color: white;
`


function TemplateBox({language}: Props) {

    const testTemplateNames = ["Test1", "Test2"]
const testTemplateLocations = ["https://jrenning.gihub.com/", "C:/home/desktop/desktop/folder/folder"]

const retrieveTemplates = () => {
    // TODO get templates here
    // TODO add truncating for long paths/urls
}

  return (
    <div>
      <TemplateTitle>{language} Templates</TemplateTitle>
      <LanguageGrid>
          {testTemplateNames.map((name, index) => (
            <>
            <TemplateNameCell key={index}>
                {name}
            </TemplateNameCell>
            <TemplateLocationCell key={index}>
                {testTemplateLocations[index]}
            </TemplateLocationCell>
            </>
          ))}
      </LanguageGrid>
    </div>
  );
}

export default TemplateBox