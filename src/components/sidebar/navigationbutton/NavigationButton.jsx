import React, {useState} from 'react'
import PropTypes from 'prop-types'
import "./NavigationButton.css"
import {useNavigate} from "react-router-dom";

const NavigationButton = ({bigButtonLabel, mainViewLink, creationLink}) => {
  const [showSmallButtons, setShowSmallButtons] = useState(false)
  const navigate = useNavigate();

  const handleBigButtonClick = () => {
    setShowSmallButtons((prevState => !prevState))
  }

  return (
      <>
        <button className="navbar-toggler big_button" type="button" onClick={handleBigButtonClick}>
          {bigButtonLabel}
        </button>
        {
            showSmallButtons && (
                <>
                    <button
                        onClick={() => {navigate(mainViewLink)}}
                        className="small_button">List</button>
                    <button
                        onClick={() => {navigate(creationLink)}}
                        className="small_button">Create</button>
                </>
            )
        }
      </>
  )
}

NavigationButton.propTypes = {
  bigButtonLabel: PropTypes.string.isRequired
}

export default NavigationButton;