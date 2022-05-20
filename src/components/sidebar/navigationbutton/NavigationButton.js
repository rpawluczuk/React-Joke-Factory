import React, {useState} from 'react';
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
export default NavigationButton;