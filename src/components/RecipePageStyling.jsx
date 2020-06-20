import { H1 } from './Headings';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  align-items: baseline;
  padding-bottom: 25px;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-areas:
    "title"
    "pic"
    "about"
    "ingredients"
    "steps"
    "commentForm"
    "commentBox"
  ;
  @media (min-width: 1000px) {
    grid-template-columns: 1fr 4fr;
    grid-template-areas:
      "title title"
      "pic pic"
      "about about"
      "ingredients steps"
      "commentForm commentForm"
      "commentBox commentBox"
    ;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 5px;
  align-items: center;
`;

const AboutBox = styled(InfoBox)`
  grid-area: about;
`;

const IngredientsBox = styled(InfoBox)`
  grid-area: ingredients;
  z-index: 500;
  box-shadow: -2px 2px 2px lightgrey, 2px -2px 2px lightgrey;
  background: #ffffff;
  @media (min-width: 1000px) {
    position: ${props => props.fixed ? 'sticky' : 'relative'};
    top: ${props => props.fixed ? `${props.navHeight + 10}px` : '0'};
  }
  .ingredient-label {
    cursor: pointer;
  }
`;

const StepsBox = styled(InfoBox)`
  grid-area: steps;
  width: 90%;
  @media (min-width: 1000px) {
    border-left: 2px dashed black;
    justify-self: left; 
  }
  .sidenote {
    font-style: italic;
    font-size: 0.9em;
  }
  ul {
    margin-top: 20px;
  }
`;

const MyH1 = styled(H1)`
  grid-area: title;
  width: 100%;
`

const Image = styled.div`
  grid-area: pic;
  height: 250px;
  width: 250px;
  box-shadow: -12px 7px 2px #383838, 12px 12px 2px #5c5c5c;
  margin: 20px;
  @media (min-width: 600px) {
    height: 500px;
    width: 500px;
  }
  .main-image {
    height: 100%;
  }
`;

const Ingredient = styled.li`
  margin: 10px;
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: 2.5em 1fr;
  align-items: center;
  border-bottom: 1px dotted black;
  .checkbox {
    appearance: none;
    border: 2px solid black;
    border-radius: 5px;
    cursor: pointer;
    background-color: white;
    height: 1.8em;
    width: 1.8em;
    box-shadow: 1px 1px 1px grey;
    outline: none;
  }
  .checkbox:checked:after {
    content: '🧀'; 
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.5em;
    font-weight: 600;
    height: 100%;
    width: 100%;
    color: black;
    background-color: lightgoldenrodyellow;
  }
`;

const Step = styled.li`
  margin: 5px 10px 15px 10px;
  padding-bottom: 10px;
  border-bottom: 1px dotted black;
  display: grid;
  grid-template-columns: 3em 1fr;
  align-items: center;
  gap: 10px;
  .step-box-holder {
    height: 2.2em;
    width: 2.2em;
    position: relative;
    display: flex;
    justify-content: center;
  }
  input {
    appearance: none;
    height: 0;
    width: 0;
  }
  .step-number {
    position: absolute;
    font-size: 2em;
    z-index: 5;
    cursor: pointer;
  }
  .step-text {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: ${props => props.done ? 'line-through' : 'none'};
    color: ${props => props.done ? 'grey' : 'black'};
  }
  input:checked + label {
    color: grey;
  }
  @media (min-width: 1000px) {
    width: 66vw;
  }
`;

export {
  Wrapper,
  AboutBox,
  IngredientsBox,
  StepsBox,
  MyH1,
  Image,
  Ingredient,
  Step
}
