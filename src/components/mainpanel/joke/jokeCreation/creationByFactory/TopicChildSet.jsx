import React from 'react';
import TopicChildBlock from "./topicchildset/TopicChildBlock";

const TopicChildSet = ({topicCreatorChildList}) => {

    return (
        <div className="d-flex flex-row flex-wrap">
            {topicCreatorChildList.map((topic) => (
                <TopicChildBlock key={topic.id} topic={topic}/>
            ))}
        </div>
    );
}

export default TopicChildSet;