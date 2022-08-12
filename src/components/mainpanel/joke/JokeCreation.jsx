import React, {useEffect, useState} from 'react';
import "../../../App.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import FastCreation from "./jokeCreation/FastCreation";

const JokeCreation = () => {

    return (
        <div className="px-4">
            <p className="Data-header">Add a new joke</p>

            <Tabs
                defaultActiveKey="fastCreation"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="fastCreation" title="Fast Creation">
                    <FastCreation/>
                </Tab>
                <Tab eventKey="creationByFactory" title="Creation by Factory">
                    <h1>In progress</h1>
                </Tab>
            </Tabs>
        </div>
    )
}
export default JokeCreation;