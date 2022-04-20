import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import Button from "./Button"
import Stars from "./Stars"
import PropTypes from "prop-types"
import sanityClient from "@sanity/client"

const grow = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.08); }
  100% { transform: scale(1); }
`

const Wrapper = styled.div`
  padding: 10px 5px;
  margin: 10px 0;
  /* height: 100px; */
  width: 90%;
  max-width: 320px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  grid-area: ratings;
  transition: height 500ms ease 2s, transform 500ms ease 2s;
  height: ${props => (props.rated ? "0px" : "150px")};
  transform: ${props => (props.rated ? "scaleY(0)" : "scaleY(100%)")};
  .star {
    height: 30px;
    width: 30px;
    margin: 0 2px;
    color: ${props => props.theme.colors.star};
  }
  .ratings-text {
    font-size: 1.2em;
    text-align: center;
  }

  .made-it {
    margin-right: 15px;
  }
  .rate-it {
    margin-left: 15px;
    animation: ${grow} 1.3s ease-in-out infinite;
  }
`
const Top = styled.div`
  display: flex;
`

const Mid = styled.div`
  display: flex;
`

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 15px;
`

function Ratings({ id, handleNewRating }) {
  const [selected, setSelected] = useState(5)
  const [rated, setRated] = useState(false)

  const handleOptionChange = value => {
    setSelected(value)
  }

  const handleRate = () => {
    const client = sanityClient({
      projectId: process.env.GATSBY_SANITY_PROJECT_ID,
      dataset: process.env.GATSBY_SANITY_DATASET,
      apiVersion: "2022-01-01",
      token: process.env.GATSBY_SANITY_TOKEN,
    })

    client
      .patch(id)
      .setIfMissing({ ratings: [] })
      .append("ratings", [selected])
      .commit()
      .catch(err => {
        throw new Error(`There was a problem submitting rating: ${err.message}`)
      })
      .finally(() => {
        handleNewRating()
        setSelected(5)
        setRated(true)
      })
  }

  return (
    <Wrapper rated={rated}>
      <Top>
        {!rated && (
          <Stars selected={selected} handleOptionChange={handleOptionChange} />
        )}
      </Top>
      <Mid>
        {!rated && <p className="made-it ratings-text">Made it?</p>}
        {!rated && <p className="rate-it ratings-text">Rate it!</p>}
      </Mid>
      <Bottom>
        {rated ? (
          <p className="ratings-text">Thanks for rating!</p>
        ) : (
          <Button onClick={handleRate}>Rate</Button>
        )}
      </Bottom>
    </Wrapper>
  )
}

Ratings.propTypes = {
  id: PropTypes.string,
  handleNewRating: PropTypes.func,
}

export default Ratings
