import React, {useEffect, useState} from 'react';
import TopicPack from "components/mainpanel/commons/topicpanel/TopicPack";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import axios from "axios";

const TopicPanel = (props) => {

    const {initialTopicType, initialTopicBlock, topicPanel} = props;
    const [topicItemList, setTopicItemList] = useState([])
    const [topicPackList, setTopicPackList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        refreshTopicItemList()
        axios.get(`http://localhost:8082/api/topics/view/category-list`).then((res) => {
            setCategoryList(res.data)
        });
        if (topicPanel !== undefined) {
            setTopicPackList(topicPanel.topicPackList)
        }
    }, [topicPanel])

    const addTopicPack = (topicPack, topicPackIndex) => {
        console.log("addTopicPack")
        console.log(topicPack)
        setTopicPackList(oldArray => [...oldArray.slice(0, topicPackIndex),
            topicPack
        ]);
    }

    function changeTopicPack(newTopicPack) {
        setTopicPackList(topicPackList.map((oldTopicPack, index) => {
            if (index === newTopicPack.topicPackIndex) {
                return newTopicPack;
            }
            return oldTopicPack
        }))
    }

    function refreshTopicPack(listOfNewTopicPack) {
        setTopicPackList(topicPackList.map((oldTopicPack) => {
            listOfNewTopicPack.forEach(newTopicPack => {
                if (oldTopicPack.topicPackIndex === newTopicPack.topicPackIndex) {
                    oldTopicPack = newTopicPack
                }
            })
            return oldTopicPack
        }))
        console.log(topicPackList)
    }

    function refreshTopicItemList() {
        axios.get(`http://localhost:8082/api/topics/view/list-items`).then((res) => {
            setTopicItemList(res.data)
        });
    }

    return (
        <TopicPanelContext.Provider
            value={{
                selectedTopicIdList: topicPackList,
                addTopicPack,
                topicItemList,
                refreshTopicPack,
                changeTopicPack
            }}>
            <div className="d-flex flex-column align-items-center">
                <TopicBlock
                    topicBlock={initialTopicBlock}
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