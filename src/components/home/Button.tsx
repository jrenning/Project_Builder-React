import React from 'react'
import styled from "styled-components";

const Btn = styled.button`
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.secondary_color};
  padding: 15px 20px;
  color: ${(props) => props.theme.colors.text_color};
  box-shadow: 0 4px 6px -1px rgb(0 0 255 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  &:hover {
    background-color: ${(props) => props.theme.colors.button_hover_color};
    color: ${(props) => props.theme.colors.primary_color};
  }
  @media (min-width: 640px) {
    padding: 1rem 1.5rem;
    font-size: larger;
  }
`;
type Props = {
    name: string
}
function Button({name}: Props) {
    return <Btn className='button'>{name}</Btn>
}

export default Button