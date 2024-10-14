import React from 'react';
import {useParams} from "react-router-dom";
import TopicPanel from "components/mainpanel/commons/TopicPanel";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";

const TopicEdition = () => {

    const params = useParams();

    return (
        <div className="container">
            <p className="Data-header">Edit topic</p>
            <TopicPanel
                initialParentId={params.id}
                initialTopicType={TopicBlockType.EDITOR}
            ></TopicPanel>
        </div>
    )
}

export default TopicEdition;