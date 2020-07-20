import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

const transformTime = (time) => {
  if (time > 59) {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return mins > 0 ? `PT${hours}H${mins}M` : `PT${hours}H`;
  } else {
    return `PT${time}M`
  }
}

const generateSteps = (steps) => {
  return steps.map(step => ( 
      {
        "@type": "HowToStep",
        "name": step,
        "text": step,
      }
    )
  )
}

// 1
const getSchemaOrgJSONLD = ({
  isRecipe,
  url,
  recipe,
}) => {
  const prepTime = isRecipe ? transformTime(recipe.prep_time) : null;
  const cookTime = isRecipe ? transformTime(recipe.cook_time) : null;
  const totalTime = isRecipe ? transformTime(recipe.prep_time + recipe.cook_time) : null;
  const instructions = isRecipe ? generateSteps(recipe.steps) : null;
  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "Website",
      "name": "Peel the Garlic",
      "url": "https://www.peelthegarlic.com"
    }
  ]
  
  return isRecipe
    ? [ 
      ...schemaOrgJSONLD,
      {
        "@context": "http://schema.org",
        "@type": "Recipe",
        "name": recipe.title, 
        "description": recipe.description, 
        "keywords": recipe.keywords, 
        "image": recipe.images, 
        "url": url, 
        "recipeIngredient": recipe.ingredients, 
        "prepTime": prepTime, 
        "cookTime": cookTime, 
        "totalTime": totalTime, 
        "recipeYield": recipe.size, 
        "recipeCategory": recipe.category, 
        "cookingMethod": recipe.cook_method, 
        "recipeCuisine": recipe.cuisine, 
        "datePublished": recipe.publish_date, 
        "author": {
          "@type": "Person",
          "name": "Braxton - Peel the Garlic",
        },
        "recipeInstructions": instructions,
        // "aggregateRating": {
        //   "@type": "AggregateRating",
        //   "ratingValue": '4.8', //string number out of 5, need to PROCESS from recipe.ratings
        //   "ratingCount": '125'//string number need to PROCESS from recipe.ratings
        // }
      }
    ] : schemaOrgJSONLD;
}

function SEO({ recipe, isRecipe, title, description, url, lang }) {
  const { site } = useStaticQuery(
    graphql`
      query {
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

  const metaDescription = description || site.siteMetadata.description;

  // const recipeMeta = recipeData || {};
  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isRecipe,
    url,
    recipe,
    title
  });

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      {/* General tags */}
      <meta name="description" content={metaDescription} />
      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: 'en',
  description: '',
  title: '',
}

SEO.propTypes = {
  recipe: PropTypes.object,
  isRecipe: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string,
  lang: PropTypes.string
}

export default SEO;