import React from 'react';
import styled from 'styled-components';
import SEO from '../components/seo';
import { H1 } from '../components/Headings';
import PageTransition from "gatsby-plugin-page-transitions"

const Wrapper = styled.div`

`

function About() {
  return (
    <>
      <SEO title="About" description="About page" />
      <PageTransition>
        <Wrapper>
          <H1>About</H1>
          <ul>
            <li>Recipes should include both metric and imperial units</li>
            <li>If you are using a tablet or laptop, the ingredients shoud always be visible</li>
            <li>The page should not be bloated with photos and ads</li>
            <li>You should be able to visibly keep track of where you are in the recipe</li>
          </ul>
        </Wrapper>
      </PageTransition>
    </>
  )
}

export default About;