import React from 'react'
import styled from 'styled-components';
type Props = {
    name: string
}

const LeftBlock = styled.div`
  width: 50vw;
  background-color: ${(props) => props.theme.colors.secondary_color};
  position: relative;
  right: 50px;
  height: 10px;
  top: 18px;
  overflow: hidden;
`;

const RightBlock = styled.div`
  background-color: ${(props) => props.theme.colors.secondary_color};
  width: 50vw;
  position: relative;
  left: 50px;
  height: 10px;
  top: 18px;
  overflow: hidden;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const HeaderText = styled.div`
  color: white;
  text-align: center;
  font-size: xx-large;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`;

function SubHeader({name}: Props) {
  return (
    <HeaderDiv>
      <LeftBlock />
      <HeaderText>{name}</HeaderText>
      <RightBlock />
    </HeaderDiv>
  );
}

export default SubHeader