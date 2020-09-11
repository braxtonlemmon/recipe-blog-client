import React from "react"
import SEO from "../components/seo"
import { H1 } from '../components/Headings';
import Button from '../components/Button';
import styled, { keyframes } from 'styled-components';
import { Link } from 'gatsby';
import { GiSpoon } from 'react-icons/gi';

const wobble = keyframes`
  0% { transform: rotate(0deg); }
  20% { transform: rotate(30deg); }
  40% { transform: rotate(0deg); }
  60% { transform: rotate(30deg); }
  80% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  padding-top: 2em;
`;

const Title = styled(H1)`
  letter-spacing: 6px;
  font-size: 5em;
`;

const Spoon = styled(GiSpoon)`
  animation: ${wobble} 2.1s linear infinite;
`;

const Blurb = styled.p`
  text-align: center;
  margin: 15px 5px;
  font-size: 1.2em;
  line-height: 1.3em;
`;

const NotFoundPage = () => (
  <>
    <SEO title="404: Oops" />
    <Wrapper>
      <Title>404</Title>
      <Blurb>{`It seems you've made your way to the back of the kitchen utensil drawer. There's not much back here other than a lost spoon and some crumbs.`}</Blurb>
      <Spoon size={120} />
      <Blurb>{`Click below to get out.`}</Blurb>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </Wrapper>
  </>
)

export default NotFoundPage
