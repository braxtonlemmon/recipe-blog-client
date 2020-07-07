import React from 'react';
import styled from 'styled-components';
import SEO from '../components/seo';
import { H1 } from '../components/Headings';
import { graphql } from 'gatsby';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-content: center;
  /* text-align: justify; */
  width: 80%;
  padding-top: 2em;
`;

const Content = styled.div`
  h2 {
    font-size: 1.8em; 
    margin-top: 40px;
    text-align: left; 
  }

  h3 {
    padding-left: 10px;
    padding-top: 20px;
    text-decoration: underline;
    text-align: left;
  }

  h4 {
    font-weight: bolder;
    padding-left: 10px;
    font-size: 1.5em;
  }
  p {
    margin: 15px 0;
    padding-left: 10px;
    font-size: 1.2em;
    line-height: 1.5em;
  }
  ul {
    margin-left: 20px;
    padding-bottom: 20px;
  }
  li {
    /* list-style: disc; */
    margin-left: 20px;
    margin-right: 20px;
    text-align: justify;
  }
`;

function About({ data }) {
  const { markdownRemark } = data;
  const { html } = markdownRemark;

  return (
    <>
      <SEO title="About" description="About page" />
      <Wrapper>
        <H1>About</H1>
        <Content
          dangerouslySetInnerHTML={{ __html: html }}
        ></Content>
        {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
      </Wrapper>
    </>
  )
}

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { title: { eq: "About"}}) {
      html
    }
  }
`;

export default About;