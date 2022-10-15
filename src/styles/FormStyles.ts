import styled from "styled-components";

export const FormLabel = styled.label`
  align-self: flex-start;
  color: ${(props) => props.theme.colors.text_color};
  font-weight: 650;
  font-size: larger;
`;

// page 1 button div
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  align-items: center;
`;
