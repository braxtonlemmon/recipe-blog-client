import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import RecipeCard from "../components/RecipeCard"
import SEO from "../components/SEOv2"
import Hero from "../components/Hero"
import PropTypes from "prop-types"
import makeSlug from "../utils/makeSlug"
import Loader from "../components/Loader"
import { Announcement, Recipes, Wrapper } from "./styles/indexStyles"

function IndexPage({ data, setLoader }) {
  const recipes = data.allSanityRecipe.edges
  const filteredRecipes = recipes.filter(recipe => recipe.title !== null)
  const [recipeClicked, setRecipeClicked] = useState(false)

  const handleRecipeClick = () => {
    setRecipeClicked(true)
  }

  useEffect(() => {
    setLoader(false)
  }, [])

  return (
    <>
      <SEO
        title="Peel the Garlic"
        description="Recipes that invite you to slow down and peel the garlic."
      />
      <Wrapper>
        <Hero setRecipeClicked={setRecipeClicked} />
        <div id="recipes-index"></div>
        <Announcement to="/Newsletter">
          Want to know when I post a new recipe? Click here.
        </Announcement>
        <Recipes>
          {filteredRecipes.map(({ node }) => {
            const slug = makeSlug(node.title)
            if (node.is_published) {
              return (
                <Link
                  key={node._id}
                  to={`/recipe/${slug}`}
                  onClick={handleRecipeClick}
                  aria-label={`Go to recipe ${node.title}`}
                >
                  <RecipeCard recipe={node} key={`card~${node._id}`} />
                </Link>
              )
            }
          })}
        </Recipes>
        {recipeClicked && <Loader message="Loading" />}
      </Wrapper>
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
  setLoader: PropTypes.func,
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allSanityRecipe(sort: { fields: [publish_date], order: DESC }) {
      edges {
        node {
          _id
          title
          quote
          is_published
          publish_date(formatString: "MMMM DD, YYYY")
          photos {
            asset {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
`
