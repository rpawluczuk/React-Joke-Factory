import React, {useEffect, useState} from 'react';
import TopicPack from "components/mainpanel/commons/topicpanel/TopicPack";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import axios from "axios";

const TopicPanel = (props) => {

    const {initialTopicType, topicPanel} = props;
    const [topicItemList, setTopicItemList] = useState([])
    const [topicPackList, setTopicPackList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        refreshTopicItemList()
        axios.get(`http://localhost:8081/api/topics/category-list`).then((res) => {
            setCategoryList(res.data)
        });
        setTopicPackList(topicPanel.topicPackList)
    }, [topicPanel])

    const addTopicPack = (topicPack, topicPackIndex) => {
            setTopicPackList(oldArray => [...oldArray.slice(0, topicPackIndex),
                topicPack
            ]);
    }

    function changeTopicPack(newTopicPack, topicPackIndex) {
        setTopicPackList(topicPackList.map((oldTopicPack, index) => {
            if (index === topicPackIndex) {
                return newTopicPack;
            }
            return oldTopicPack
        }))
    }

    function refreshTopicItemList() {
        axios.get(`http://localhost:8081/api/topics/list-items`).then((res) => {
            setTopicItemList(res.data)
        });
    }

    return (
        <TopicPanelContext.Provider
            value={{selectedTopicIdList: topicPackList, addTopicPack, topicItemList}}>
            <div className="d-flex flex-column align-items-center">
                <TopicBlock
                    topic={topicPanel.initialTopic}
                    showChildren={false}
                    topicBlockType={initialTopicType}>
                </TopicBlock>
            </div>
            {topicPackList.length > 0 && topicPackList.map((topicPack, index) => (
                <TopicPack
                    topicPack={topicPack}
                    topicPackIndex={index}
                    categoryList={categoryList}
                    changeTopicPack={changeTopicPack}
                    key={topicPack}
                />
            ))}
        </TopicPanelContext.Provider>
    )
};

export default TopicPanel;