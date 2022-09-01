import React from 'react';
import "./Sidebar.css";
import logo from './logo.png';
import NavigationButton from "./navigationbutton/NavigationButton";

const Sidebar = () => {

  return (
      <div className="sidebar fixed-top">
        <img src={logo} className="sidebar_logo" alt="logo"/>
          <NavigationButton bigButtonLabel={'Jokes'} mainViewLink={'joke-list/'} creationLink={'/joke-creation'}/>
          <NavigationButton bigButtonLabel={"Structures"} mainViewLink={'/structure'} creationLink={'/structure-creation'}/>
          <NavigationButton bigButtonLabel={"Authors"} mainViewLink={'/author-list'} creationLink={'/author-creation'}/>
          <NavigationButton bigButtonLabel={"Topics"} mainViewLink={'/topic-list'} creationLink={'/topic-creation'}/>
      </div>
  )
}
export default Sidebar;