import React, {useState} from 'react'
import PropTypes from 'prop-types'
import "./NavigationButton.css"

const NavigationButton = ({ bigButtonLabel }) => {

  const [showSmallButtons, setShowSmallButtons] = useState(false)

  const handleClick = () => {
    setShowSmallButtons((prevState => !prevState))
  }

  return (
      <>
        <button className="navbar-toggler big_button" type="button" onClick={handleClick}>
          {bigButtonLabel}
        </button>
        {
            showSmallButtons && (
                <>
                  <button className="small_button">List</button>
                  <button className="small_button">Create</button>
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