import React from 'react';
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";
import TopicPanel from "components/mainpanel/commons/TopicPanel";

const TopicCreation = () => {

    return(
        <div className="container">
            <p className="Data-header">Add a new topic</p>
                <TopicPanel
                    initialTopicBlock={{
                        id: undefined,
                        parentId: null,
                        name: null
                    }}
                    initialTopicType={TopicBlockType.CREATOR}>
                </TopicPanel>
        </div>
    )
}

export default TopicCreation;