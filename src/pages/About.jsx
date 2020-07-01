import React from 'react';
import styled from 'styled-components';
import SEO from '../components/seo';
import { H1 } from '../components/Headings';
// import { graphql } from 'gatsby';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-content: center;
  padding: 0 15px;
  text-align: justify;
`;

// const Content = styled.div`
//   h2 {
//     font-size: 1.5em; 
//     margin-top: 40px; 
//   }
//   p {
//     margin: 15px 0;
//   }
//   ul {
//     margin-left: 20px;
//   }
//   li {
//     list-style: disc;
//   }
// `;

function About({ data }) {
  const { html } = data.markdownRemark;

  return (
    <>
      <SEO title="About" description="About page" />
      <Wrapper>
        <H1>About</H1>
        {/* <Content
          dangerouslySetInnerHTML={{ __html: html }}
        ></Content>
        <div dangerouslySetInnerHTML={{ __html: html }} /> */}
      </Wrapper>
    </>
  )
}

// export const pageQuery = graphql`
//   query AboutData {
//     markdownRemark(id: { eq: "2ee6619d-860f-53a5-9702-462760a91b67" }) {
//       html
//     }
//   }
// `;

export default About;