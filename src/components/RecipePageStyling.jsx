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
  @media (min-width: 768px) {
    grid-template-columns: 30vw 70vw;
    grid-template-areas:
      "title title"
      "pic pic"
      "about about"
      "ingredients steps"
      "commentForm commentForm"
      "commentBox commentBox"
    ;
  }

  @media (min-width: 1000px) {
    grid-template-columns: 1fr 4fr;
    grid-template-columns: 20vw 75vw;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  /* margin: 5px; */
  align-items: center;
`;

const AboutBox = styled(InfoBox)`
  grid-area: about;
  width: 90%;
  padding: 15px 0;
  margin-bottom: 15px;
  border-bottom: 5px solid black;
`;

const IngredientsBox = styled(InfoBox)`
  /* display: grid; */
  padding-top: 15px;
  grid-area: ingredients;
  z-index: 500;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  width: 90%;
  height: auto;
  @media (min-width: 768px) {
    box-shadow: -2px 2px 2px lightgrey, 2px -2px 2px lightgrey;
    box-shadow: 0 0 12px lightgrey;
    position: ${props => props.fixed ? 'sticky' : 'relative'};
    top: ${props => props.fixed ? `${props.navHeight + 10}px` : '0'};
    position: sticky;
    top: ${props => `${props.navHeight + 10}px`};
    /* height: 80vh; */
    padding-top: 0;
    /* padding: 0 10px 10px 10px; */
    max-height: 80vh;
    margin: 15px auto;
    .ingredients-box-title {
      position: sticky;
      top: 0px;
      background: white;
      padding: 10px 0;
      margin-bottom: 0;
      width: 100%;
      border-radius: 20px 20px 0 0;
      box-shadow: 0px 4px 3px lightgrey;
    }
    ul {
      overflow-y: auto;
      margin: 0 10px 10px 10px;
    }
  }
  .ingredient-label {
    cursor: pointer;
  }
`;

const StepsBox = styled(InfoBox)`
  grid-area: steps;
  width: 90%;
  padding: 15px 0;
  @media (min-width: 768px) {
    border-left: 2px dashed black;
    padding-left: 20px;
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
  /* box-shadow: 0 0 20px grey; */
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
    height: 1.3em;
    width: 1.3em;
    box-shadow: 1px 1px 1px grey;
    outline: none;
  }
  .checkbox:checked:after {
    content: "✓";
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.3em;
    font-weight: 600;
    height: 100%;
    width: 100%;
    color: black;
    background-color: lightgoldenrodyellow;
  }
`

const Step = styled.li`
  margin: 5px 10px 15px 10px;
  padding-bottom: 10px;
  border-bottom: 1px dotted black;
  display: grid;
  grid-template-columns: 3em 1fr;
  align-items: center;
  gap: 5px;
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
  /* @media (min-width: 768px) {
    width: 40vw;

  }
  @media (min-width: 1000px) {
    width: 50vw;

  } */
  width: 100%;

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
