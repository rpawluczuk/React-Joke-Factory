import React from 'react';
import "./Sidebar.css"
import NavigationButton from "./navigationbutton/NavigationButton";

const Sidebar = () => {

  return (
      <div className="sidebar fixed-top">
        <img src="logo.png" className="sidebar_logo" alt="logo"/>
          <NavigationButton bigButtonLabel={'Jokes'}/>
          <NavigationButton bigButtonLabel={"Structures"}/>
          <NavigationButton bigButtonLabel={"Authors"}/>
      </div>
  )
}
export default Sidebar;