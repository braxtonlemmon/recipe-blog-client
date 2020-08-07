import { H1 } from './Headings';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  display: grid;
  justify-items: center;
  align-items: baseline;
  padding: 2em 15px 10px 15px;
  /* padding-bottom: 25px; */
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-areas:
    "title"
    "pic"
    "share"
    "links"
    "ratings"
    "about"
    "ingredients"
    "steps"
    "commentForm"
    "commentBox"
    "toTop";
  @media (min-width: 760px) {
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      "title title"
      "pic pic"
      "share share"
      "links links"
      "ratings ratings"
      "about about"
      "ingredients steps"
      "ingredients commentForm"
      "ingredients commentBox"
      "toTop toTop";
  }

  @supports not (display: grid) {
    align-items: center;
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
  .scrollLink {
    cursor: pointer;
    /* border: 1px solid black; */
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    padding: 10px 8px;
    text-align: center;
    background: #cdcbd6af;
    background: white;
    &:hover {
      background: #cdcbd6;
    }
  }
  .button-w-icon {
    display: flex;
    display: grid;
    grid-auto-flow: row;
    gap: 5px;
    justify-content: center;
    align-items: center;
    text-align: center;
    justify-items: center;
    @supports not (display: grid) {
      margin: 0 5px;
    }
  }
`

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  /* margin: 5px; */
  align-items: center;
`;

// const AboutBox = styled(InfoBox)`
//   grid-area: about;
//   width: 90%;
//   padding: 15px 0;
//   margin-bottom: 15px;
//   border-bottom: 5px solid ${props => props.theme.colors.dark};
// `;

const Details = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: lightslategrey;
  margin-bottom: 10px;
  margin: 10px 0;
`;

const IngredientsBox = styled(InfoBox)`
  /* display: grid; */
  padding-top: 15px;
  grid-area: ingredients;
  z-index: 500;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  margin-right: 10px;
  @media (min-width: 760px) {
    box-shadow: -2px 2px 2px lightgrey, 2px -2px 2px lightgrey;
    box-shadow: 0 0 12px lightgrey;
    /* position: ${props => (props.fixed ? "sticky" : "relative")}; */
    /* top: ${props => (props.fixed ? `${props.navHeight + 10}px` : "0")}; */
    position: -webkit-sticky;
    position: sticky;
    top: ${props => `${props.navHeight + 10}px`};
    padding-top: 0;
    max-height: 90vh;
    margin: 15px auto;



    .ingredients-box-title {
      position: -webkit-sticky;
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
  @supports not (display: grid) {
    position: relative;
    padding-bottom: 30px;
    .ingredients-box-title {
      position: relative;
    }
  }
`

const StepsBox = styled(InfoBox)`
  grid-area: steps;
  width: 90%;
  padding: 15px 0;
  /* border: 1px solid blue; */
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
    width: 100%;
  }
  @supports not (display: grid) {
    margin-top: 30px;
  }
`;

const MyH1 = styled(H1)`
  grid-area: title;
  width: 100%;
`

const Image = styled.div`
  grid-area: pic;
  height: 275px;
  width: 275px;
  box-shadow: -10px 8px 2px #383838, 10px 12px 2px #5c5c5c;
  box-shadow: 0 0 35px grey;
  border-radius: 8px;
  margin: 20px 0;
  @media (min-width: 412px) {
    height: 380px;
    width: 380px;
  }
  @media (min-width: 600px) {
    height: 500px;
    width: 500px;
  }
  @media (min-width: 768px) {
    height: 650px;
    width: 650px;
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
  padding: 15px 0;
  border-bottom: 1px dotted black;
  display: grid;
  /* grid-template-columns: 3em 1fr; */
  grid-template-columns: 3em 1fr;
  display: flex;
  align-items: center;
  gap: 5px;
  line-height: 1.2em;
  letter-spacing: 0.15px;
  width: 100%;
  @media (min-width: 1300px) {
    padding: 20px 0;
  }
  .step-box-holder {
    /* height: 2.2em; */
    /* width: 2.2em; */
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    /* border: 1px solid red; */
  }
  input {
    appearance: none;
    height: 0;
    width: 0;
  }
  .step-label {
    display: grid;
    grid-template-columns: 3em 1fr;
    align-items: center;
    height: 100%;
    width: 100%;
    text-decoration: ${props => props.done === 'yes' ? 'line-through' : 'none'};
    color: ${props => props.done === 'yes' ? 'grey' : 'black'};
  }

  .step-number {
    /* position: absolute; */
    font-size: 2em;
    z-index: 5;
    cursor: pointer;
  }
  .step-text {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    /* text-decoration: ${props => props.done === 'yes' ? 'line-through' : 'none'};
    color: ${props => props.done === 'yes' ? 'orange' : 'black'}; */
  }
  input:checked + label {
    color: grey;
    text-decoration: line-through;
  }
  width: 100%;
`;

export {
  Wrapper,
  InfoBox,
  IngredientsBox,
  StepsBox,
  MyH1,
  Image,
  Ingredient,
  Step,
}
