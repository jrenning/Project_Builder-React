import React from "react";
import styled from "styled-components";

type Props = {
  language: string;
};

const LanguageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PathNameCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  font-weight: bold;
  outline: solid 0.5px;
  margin-left: 10px;
`;
const PathLocationCell = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: whitesmoke;
  font-weight: bold;
`;


function PathBox({ language }: Props) {
  const testTemplateLocations = [
    "C://pppp",
    "C:/home/desktop/desktop/folder/folder",
  ];

  const retrievePaths = () => {
    // TODO get paths
  };

  return (
    <div>
      <LanguageGrid>
        <PathNameCell>{language}</PathNameCell>
        <PathLocationCell>{testTemplateLocations[0]}</PathLocationCell>
      </LanguageGrid>
    </div>
  );
}

export default PathBox;
