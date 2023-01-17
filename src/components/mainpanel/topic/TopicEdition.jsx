import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TopicPanel from "components/mainpanel/commons/TopicPanel";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";
import axios from "axios";

const TopicEdition = () => {

    const [topicPanel, setTopicPanel] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/panel/${params.id}`).then((res) => {
            setTopicPanel(res.data)
        });
    }, [])

    const params = useParams();

    return (
        <div className="container">
            <p className="Data-header">Edit topic</p>
            {topicPanel !== null &&
                <TopicPanel
                    topicPanel={topicPanel}
                    initialTopicBlock={topicPanel.initialTopic}
                    initialTopicType={TopicBlockType.EDITOR}
                ></TopicPanel>
            }
        </div>
    )
}

export default TopicEdition;