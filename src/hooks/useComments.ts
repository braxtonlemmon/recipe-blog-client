import { useEffect, useState } from "react"
import sanityClient from "@sanity/client"

const useComments = (recipeId: string) => {
  const [comments, setComments] = useState()

  useEffect(() => {
    const client = sanityClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      apiVersion: "2022-01-01",
      useCdn: false,
    })
    const query = `*[_type == "comment" && recipe._ref == "${recipeId}"]`
    client
      .fetch(query)
      .then(foundComments => {
        setComments(foundComments)
      })
      .catch(error => {
        console.error("Failed to fetch comments from Sanity: ", error)
      })
  }, [])

  return comments
}

export default useComments
