import React from 'react';
import "./Sidebar.css"
import NavigationButton from "./navigationbutton/NavigationButton";

const Sidebar = () => {

  return (
      <div className="sidebar fixed-top">
        <img src="logo.png" className="sidebar_logo" alt="logo"/>
          <NavigationButton bigButtonLabel={'Jokes'} mainViewLink={'/'} creationLink={'/joke-creation'}/>
          <NavigationButton bigButtonLabel={"Structures"} mainViewLink={'/structure'} creationLink={'/structure-creation'}/>
          <NavigationButton bigButtonLabel={"Authors"} mainViewLink={'/author'} creationLink={'/author-creation'}/>
      </div>
  )
}
export default Sidebar;