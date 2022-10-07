import React from 'react';
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";
import TopicPanel from "components/mainpanel/commons/TopicPanel";

const TopicCreation = () => {

    return(
        <div>
            <p className="Data-header">Add a new topic</p>
            <div className="d-flex flex-column align-items-center">
                <TopicPanel
                    initialTopicType={TopicBlockType.CREATOR}>
                </TopicPanel>
            </div>
        </div>
    )
}

export default TopicCreation;