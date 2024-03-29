import React from 'react';
import SingleTopic from "components/mainpanel/topic/topicmainview/topiclist/SingleTopic";
import TopicPagination from "components/mainpanel/topic/topicmainview/topiclist/TopicPagination";

const TopicList = (props) => {

    const {topicView, onPageChange, onSizeChange} = props;

    return (
        <>
            <div className="mb-4">
                {topicView.content.map((topic) => (
                    <SingleTopic key={topic.id} topic={topic}/>
                ))}
            </div>
            <TopicPagination
                number={topicView.number}
                totalPages={topicView.totalPages}
                onPageChange={onPageChange}
                onSizeChange={onSizeChange}>
            </TopicPagination>
        </>
    )
};

export default TopicList;