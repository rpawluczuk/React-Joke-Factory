import React, {useEffect, useState} from 'react';
import "../../../App.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import FastCreation from "./jokeCreation/FastCreation";
import CreationByFactory from "./jokeCreation/CreationByFactory";

const JokeCreation = () => {

    return (
        <div className="px-4">
            <p className="Data-header">Add a new joke</p>

            <Tabs
                defaultActiveKey="creationByFactory"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="fastCreation" title="Fast Creation">
                    <FastCreation/>
                </Tab>
                <Tab eventKey="creationByFactory" title="Creation by Factory">
                    <CreationByFactory/>
                </Tab>
            </Tabs>
        </div>
    )
}
export default JokeCreation;