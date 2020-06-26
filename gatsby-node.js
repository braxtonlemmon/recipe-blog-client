const path = require('path');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      recipes: allMongodbTestRecipes {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `)

  const pageTemplate = path.resolve('./src/components/RecipePage.jsx');

  for (const { node } of data.recipes.edges) {
    const title = node.title.toLowerCase().replace(/ /g, '-');
    createPage({
      path: `/recipe/${title}/`,
      component: pageTemplate,
      context: {
        id: node.id,
      },
    })
  }
}

const isEmpty = val => {
  if (val === undefined || val.length === 0) {
    return true;
  } else {
    return false
  }
}

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions

  if (node.internal.type === 'mongodbTestRecipes') {
    if (node.images && !isEmpty(node.images)) {
      const images = await Promise.all(
        node.images.map(url =>
          createRemoteFileNode({
            url: url,
            parentNodeId: node.id,
            store,
            cache,
            createNode,
            createNodeId,
          })
        )
      )
      
      await createNodeField({
        node, 
        name: "images",
        value: images,
      })

      node.fields.images.forEach((image, i) => {
        image.localFile___NODE = images[i].id
      })
    }
  }
}

