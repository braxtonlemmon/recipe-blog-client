const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allSanityRecipe(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            slug {
              current
            }
            title
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const pageTemplate = path.resolve("./src/components/RecipePage.tsx")
  const recipes = result.data.allSanityRecipe.edges || []
  recipes.forEach(edge => {
    const path = `recipe/${edge.node.slug.current}`
    createPage({
      path,
      component: pageTemplate,
      context: { title: edge.node.title, slug: edge.node.slug.current },
    })
  })
}
