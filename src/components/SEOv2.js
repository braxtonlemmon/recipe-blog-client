import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const transformTime = time => {
  if (time > 59) {
    const hours = Math.floor(time / 60)
    const mins = time % 60
    return mins > 0 ? `PT${hours}H${mins}M` : `PT${hours}H`
  } else {
    return `PT${time}M`
  }
}

const generateSteps = steps => {
  return steps.map(step => ({
    "@type": "HowToStep",
    name: step,
    text: step,
  }))
}

const averageRatings = ratings => {
  const sum = ratings.reduce((accumulator, current) => {
    return accumulator + current
  })
  return sum / ratings.length
}

const makeRecipeObject = (recipe, url) => {
  const prepTime = transformTime(recipe.prep_time)
  const cookTime = transformTime(recipe.cook_time)
  const totalTime = transformTime(recipe.prep_time + recipe.cook_time)
  const instructions = generateSteps(recipe.steps)

  let recipeObject = {
    "@context": "http://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    keywords: recipe.keywords,
    image: recipe.images,
    url: url,
    recipeIngredient: recipe.ingredients,
    prepTime: prepTime,
    cookTime: cookTime,
    totalTime: totalTime,
    recipeYield: recipe.size,
    recipeCategory: recipe.category,
    cookingMethod: recipe.cook_method,
    recipeCuisine: recipe.cuisine,
    datePublished: recipe.publish_date,
    author: {
      "@type": "Person",
      name: "Braxton - Peel the Garlic",
    },
    recipeInstructions: instructions,
  }

  if (recipe.ratings.length > 0) {
    recipeObject["aggregateRating"] = {
      "@type": "AggregateRating",
      ratingValue: averageRatings(recipe.ratings), //string number out of 5, need to PROCESS from recipe.ratings
      ratingCount: recipe.ratings.length, //string number need to PROCESS from recipe.ratings
    }
  }

  return recipeObject
}

const getSchemaOrgJSONLD = ({ isRecipe, url, recipe }) => {
  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "Website",
      name: "Peel the Garlic",
      url: "https://www.peelthegarlic.com",
    },
  ]

  return isRecipe
    ? [...schemaOrgJSONLD, makeRecipeObject(recipe, url)]
    : schemaOrgJSONLD
}

function SEO({ recipe, isRecipe, title, description, url, lang }) {
  const { site } = useStaticQuery(
    graphql`
      query Seo2Query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const image = recipe ? recipe.images[0] : ""
  const shortDescription = metaDescription.substring(0, 160) + " ..."

  // const recipeMeta = recipeData || {};
  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isRecipe,
    url,
    recipe,
    title,
  })

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      {/* General tags */}
      <meta name="description" content={shortDescription} />
      <meta name="title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={shortDescription} />
      <meta property="og:site_name" content="Peel the Garlic" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={shortDescription} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: "en",
  description: "",
  title: "",
}

SEO.propTypes = {
  recipe: PropTypes.object,
  isRecipe: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string,
  lang: PropTypes.string,
}

export default SEO
