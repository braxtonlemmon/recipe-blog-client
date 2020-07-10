import { H1 } from './Headings';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  align-items: baseline;
  padding: 2em 15px 25px 15px;
  /* padding-bottom: 25px; */
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-areas:
    "title"
    "pic"
    "links"
    "about"
    "ingredients"
    "steps"
    "commentForm"
    "commentBox";
  @media (min-width: 760px) {
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      "title title"
      "pic pic"
      "links links"
      "about about"
      "ingredients steps"
      "ingredients commentForm"
      "ingredients commentBox";
  }

  @media (min-width: 1300px) {
    /* grid-template-areas:
      "title title"
      "pic pic"
      "links links"
      "about about"
      "ingredients steps"
      "commentForm commentForm"
      "commentBox commentBox"; */

    grid-template-columns: 1fr 3.5fr;
  }
`

const Links = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-area: links;
  margin: 15px 0;
  padding: 10px 15px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  text-align: center;
  .links-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-flow: column;
    gap: 10px;
    margin-top: 10px;
    width: 100%;
    justify-content: center;
  }
  .scrollLink {
    cursor: pointer;
    /* border: 1px solid black; */
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    padding: 5px;
    text-align: center;
    background: #cdcbd6af;
    background: white;
    &:hover {
      background: #cdcbd6;
    }
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
  border-bottom: 5px solid #2f3020;
`;

const Details = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 20px;
  color: lightslategrey;
  margin-bottom: 10px;
`;

const IngredientsBox = styled(InfoBox)`
  /* display: grid; */
  padding-top: 15px;
  grid-area: ingredients;
  z-index: 500;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  min-width: 50%;
  max-width: 90%;
  @media (min-width: 760px) {
    box-shadow: -2px 2px 2px lightgrey, 2px -2px 2px lightgrey;
    box-shadow: 0 0 12px lightgrey;
    position: ${props => props.fixed ? 'sticky' : 'relative'};
    top: ${props => props.fixed ? `${props.navHeight + 10}px` : '0'};
    position: sticky;
    top: ${props => `${props.navHeight + 10}px`};
    padding-top: 0;
    max-height: 90vh;

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
      margin: 5px 10px 10px 10px;
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
  @media (min-width: 760px) {
    /* border-left: 2px dashed black; */
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
  height: 260px;
  width: 260px;
  box-shadow: -10px 8px 2px #383838, 10px 12px 2px #5c5c5c;
  box-shadow: 0 0 35px grey;
  border-radius: 8px;
  margin: 20px 0;
  @media (min-width: 600px) {
    height: 500px;
    width: 500px;
  }
  .main-image {
    height: 100%;
    border-radius: 8px;
  }
`;

const Ingredient = styled.li`
  margin: 10px;
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: 2.5em 1fr;
  align-items: center;
  border-bottom: 1px dotted black;
  line-height: 1.2em;
  letter-spacing: 0.15px;
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
    padding-left: 5px;
    padding-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.3em;
    font-weight: 600;
    height: 100%;
    width: 100%;
    color: black;
    /* background-color: lightgoldenrodyellow; */
  }
`

const Step = styled.li`
  /* margin: 5px 10px 15px 10px; */
  /* padding-bottom: 10px; */
  padding: 10px 0;
  border-bottom: 1px dotted black;
  display: grid;
  grid-template-columns: 3em 1fr;
  align-items: center;
  gap: 5px;
  line-height: 1.2em;
  letter-spacing: 0.15px;
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
  width: 100%;
`;

export {
  Wrapper,
  Links,
  AboutBox,
  Details,
  IngredientsBox,
  StepsBox,
  MyH1,
  Image,
  Ingredient,
  Step
}
