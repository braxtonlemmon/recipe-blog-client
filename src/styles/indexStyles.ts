import styled from "styled-components"
import { Link } from "gatsby"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
  position: relative;
`

export const Announcement = styled(Link)`
  font-size: 1.5em;
  color: ${props => props.theme.colors.dark};
  padding: 15px;
  width: 70%;
  max-width: 700px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 40px;
  &:hover {
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
  }
`

export const Recipes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: 2em;
  a {
    margin: 20px;
  }
  @media (min-width: 1000px) {
    max-width: 90%;
  }
`
