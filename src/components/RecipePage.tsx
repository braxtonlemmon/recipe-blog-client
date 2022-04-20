/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from "react"
import { graphql } from "gatsby"
import Comments from "./Comments"
import ShareLinks from "./ShareLinks"
import ImageSlider from "./ImageSlider"
import Ratings from "./Ratings"
import Shortcuts from "./Shortcuts"
import SEO from "./SEOv2"
import Ingredients from "./Ingredients"
import Steps from "./Steps"
import Details from "./Details"
import ToTop from "./ToTop"
import GoUp from "./GoUp"
import { Wrapper, MyH1, Image, Quote } from "./RecipePageStyling"
import PropTypes from "prop-types"
import Printable from "./Printable"
import { useReactToPrint } from "react-to-print"
import useSiteMetadata from "../hooks/use-site-metadata"
import sanityClient from "@sanity/client"

const convertDuration = duration => {
  if (duration > 59) {
    const hours = Math.floor(duration / 60)
    const mins = duration % 60
    return `${hours}h ${mins}min`
  } else {
    return `${duration}min`
  }
}

function RecipePage({ data, location }) {
  const recipe = data.sanityRecipe
  const images = data.sanityRecipe.photos
  const content = data.markdownRemark.html
  const [viewShare, setViewShare] = useState(false)
  const [checkboxes, setCheckboxes] = useState(loadCheckboxes())
  const [ratings, setRatings] = useState([])
  const [ratingsLoaded, setRatingsLoaded] = useState(false)
  const [comments, setComments] = useState<object[]>()
  const [commentsLoaded, setCommentsLoaded] = useState(false)
  const { siteUrl } = useSiteMetadata()
  const url = `${siteUrl}${location.pathname}`

  // PRINTING
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  // helper functions
  function loadCheckboxes() {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage != "undefined"
    ) {
      const storedData = JSON.parse(localStorage.getItem(recipe._id))
      return storedData === null ? {} : storedData
    } else {
      return {}
    }
  }

  function handleCheck(e) {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage != "undefined"
    ) {
      const storedData = JSON.parse(localStorage.getItem(recipe._id))
      storedData[e.target.id] = e.target.checked
      localStorage.setItem(recipe._id, JSON.stringify(storedData))
      setCheckboxes(storedData)
    }
  }

  function handleNewRating() {
    setRatingsLoaded(false)
  }

  function resetCheckboxes() {
    setCheckboxes({})
    localStorage.setItem(recipe._id, JSON.stringify({}))
    window.location.reload()
  }

  // loads saved data from localStorage
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage != "undefined"
    ) {
      const storedData = JSON.parse(localStorage.getItem(recipe._id))
      if (storedData === null) {
        localStorage.setItem(recipe._id, JSON.stringify({}))
      } else {
        setCheckboxes({ ...storedData })
      }
    }
  }, [recipe._id])

  useEffect(() => {
    const client = sanityClient({
      projectId: process.env.GATSBY_SANITY_PROJECT_ID,
      dataset: process.env.GATSBY_SANITY_DATASET,
      token: process.env.GATSBY_SANITY_TOKEN,
      apiVersion: "2022-01-01",
      useCdn: false,
    })
    const query = `*[_type == "recipe" && _id == "${recipe._id}"] {
      ratings
    }`
    client
      .fetch(query)
      .then(results => {
        const foundRatings =
          results.length > 0 && results[0]?.ratings ? results[0].ratings : []
        setRatings(foundRatings)
        setRatingsLoaded(true)
      })
      .catch(err => {
        console.error("Request failed", err)
      })
  }, [ratingsLoaded])

  useEffect(() => {
    const client = sanityClient({
      projectId: process.env.GATSBY_SANITY_PROJECT_ID,
      dataset: process.env.GATSBY_SANITY_DATASET,
      token: process.env.GATSBY_SANITY_TOKEN,
      apiVersion: "2021-12-18",
      useCdn: false, // `false` if you want to ensure fresh data
    })
    const query = `*[_type == "comment" && recipe._ref == "${recipe._id}"]`
    client
      .fetch(query)
      .then(foundComments => {
        setComments(foundComments)
      })
      .then(() => {
        setCommentsLoaded(true)
      })
      .catch(err => console.error("Request failed", err))
  }, [commentsLoaded])

  return (
    <>
      <SEO
        recipe={recipe}
        isRecipe={true}
        title={recipe.title}
        description={recipe.description}
        url={url}
      />
      <Wrapper id="page-top">
        <MyH1>{recipe.title}</MyH1>
        {viewShare && <ShareLinks setViewShare={setViewShare}></ShareLinks>}
        <Image>
          <ImageSlider images={images} />
        </Image>
        <Quote>{recipe.quote}</Quote>
        <Shortcuts handlePrint={handlePrint} setViewShare={setViewShare} />
        <Ratings id={recipe._id} handleNewRating={handleNewRating} />
        <Details
          recipe={recipe}
          convertDuration={convertDuration}
          ratings={ratings}
          content={content}
        />
        <Ingredients
          recipe={recipe}
          checkboxes={checkboxes}
          handleCheck={handleCheck}
        />
        <Steps
          recipe={recipe}
          checkboxes={checkboxes}
          handleCheck={handleCheck}
          resetCheckboxes={resetCheckboxes}
        />
        <Comments
          handleNewRating={handleNewRating}
          comments={comments}
          commentsLoaded={commentsLoaded}
          setCommentsLoaded={setCommentsLoaded}
          setRatingsLoaded={setRatingsLoaded}
          recipe={recipe._id}
        />
        <Printable
          ref={componentRef}
          recipe={recipe}
          convertDuration={convertDuration}
        />
        <ToTop />
        <GoUp />
      </Wrapper>
    </>
  )
}
RecipePage.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
}

export default RecipePage

export const pageQuery = graphql`
  query RecipePageQuery($title: String!, $slug: String!) {
    sanityRecipe(title: { eq: $title }) {
      _id
      title
      description
      keywords
      prep_time
      cook_time
      ingredients
      category
      cook_method
      cuisine
      intro
      size
      steps
      photos {
        asset {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      quote
      ratings
      publish_date(formatString: "MMMM DD, YYYY")
    }
    markdownRemark(frontmatter: { title: { eq: $slug } }) {
      html
    }
  }
`
