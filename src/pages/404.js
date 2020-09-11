import React from "react"
import SEO from "../components/seo"
import { H1 } from '../components/Headings';
import Button from '../components/Button';
import styled from 'styled-components';
import { Link } from 'gatsby';

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

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Wrapper>
      <H1>404</H1>
      <p>{`It seems you've made your way to the back of the kitchen utensil drawer.`}</p>
      <p>{`There's not much back here other than a lost spoon and some crumbs.`}</p>
      <p>{`The good news is that there's an easy way out. Just click below.`}</p>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </Wrapper>
  </>
)

export default NotFoundPage
