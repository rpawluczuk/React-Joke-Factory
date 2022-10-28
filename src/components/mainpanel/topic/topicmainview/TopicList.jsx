import React from 'react';
import SingleTopic from "components/mainpanel/topic/topicmainview/topiclist/SingleTopic";
import TopicPagination from "components/mainpanel/topic/topicmainview/topiclist/TopicPagination";

const TopicList = (props) => {

    const {topicList} = props;

    return (
        <>
            <div className="mb-4">
                {topicList.map((topic) => (
                    <SingleTopic key={topic.id} topic={topic}/>
                ))}
            </div>
            <TopicPagination></TopicPagination>
        </>
    )
};

export default TopicList;