import React, {useState} from 'react'
import PropTypes from 'prop-types'
import "./NavigationButton.css"
import {useNavigate} from "react-router-dom";

const NavigationButton = ({bigButtonLabel, mainViewLink, creationLink}) => {
  const [showSmallButtons, setShowSmallButtons] = useState(false)

  const handleClick = () => {
    setShowSmallButtons((prevState => !prevState))
    console.log({creationLink})
    console.log({mainViewLink})
    console.log({bigButtonLabel})
  }

  let navigate = useNavigate();

  return (
      <>
        <button className="navbar-toggler big_button" type="button" onClick={handleClick}>
          {bigButtonLabel}
        </button>
        {
            showSmallButtons && (
                <>
                    <button
                        onClick={() => {navigate('' + mainViewLink)}}
                        className="small_button">List</button>
                    <button
                        onClick={() => {navigate('' + creationLink)}}
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