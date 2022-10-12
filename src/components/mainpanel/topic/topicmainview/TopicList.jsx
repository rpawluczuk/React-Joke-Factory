import React from 'react';
import SingleTopic from "components/mainpanel/topic/topicmainview/topiclist/SingleTopic";
import TopicPagination from "components/mainpanel/topic/topicmainview/topiclist/TopicPagination";

const TopicList = (props) => {

    const {topicList} = props;

    return (
        <>
            {topicList.map((topic) => (
                <SingleTopic key={topic.id} topic={topic}/>
            ))}
            <TopicPagination></TopicPagination>
        </>
    )
};

export default TopicList;