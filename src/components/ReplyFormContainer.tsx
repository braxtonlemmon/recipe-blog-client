import React, { useState } from "react"
import ReplyFormComponent from "./ReplyFormComponent"
import sanityClient from "@sanity/client"

type ReplyFormContainerProps = {
  parent: string
  recipe: string
  setCommentsLoaded: (commentsLoaded: boolean) => void
}

function ReplyFormContainer({
  parent,
  recipe,
  setCommentsLoaded,
}: ReplyFormContainerProps) {
  const [data, setData] = useState({
    name: "",
    content: "",
  })

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const { name, value } = target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e: React.SyntheticEvent, level: number) => {
    e.preventDefault()
    if (data.content.length < 1 || data.content.length > 1000) {
      console.error("Comment must be between 1 and 1000 characters.")
      return
    }

    const client = sanityClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      apiVersion: "2022-01-01",
      token: process.env.SANITY_TOKEN,
    })

    client
      .create({
        _type: "comment",
        name: data.name,
        content: data.content,
        level: level,
        fromAdmin: false,
        answered: false,
        parent: {
          _type: "reference",
          _ref: parent,
        },
        recipe: {
          _type: "reference",
          _ref: recipe,
        },
      })
      .then(() => {
        setData({ name: "", content: "" })
        setCommentsLoaded(false)
      })
      .catch(err => {
        throw new Error(`There was a problem creating comment: ${err.message}`)
      })
  }

  return (
    <ReplyFormComponent
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      data={data}
    />
  )
}

export default ReplyFormContainer
