import React from "react"
import SEO from "../components/seo"
import PageTransition from 'gatsby-plugin-page-transitions';

const NotFoundPage = () => (
  <>
    <PageTransition>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>Boo</p>
    </PageTransition>
  </>
)

export default NotFoundPage
