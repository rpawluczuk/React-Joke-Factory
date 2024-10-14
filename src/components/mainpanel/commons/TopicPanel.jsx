import React, {useEffect, useState} from 'react';
import TopicPack from "components/mainpanel/commons/topicpanel/TopicPack";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import axios from "axios";

const TopicPanel = (props) => {

        const {initialParentId, initialTopicType} = props;
        const [topicItemList, setTopicItemList] = useState([])
        const [categoryList, setCategoryList] = useState([])
        const [topicPackList, setTopicPackList] = useState([])

        useEffect(() => {
            const packRequest = {
                parentId: initialParentId,
                pageNumber: 0,
                pageSize: 23
            };
            refreshTopicPackList(packRequest)
            refreshTopicItemList()
            axios.get(`http://localhost:8082/api/topics/view/category-list`).then((res) => {
                setCategoryList(res.data)
            });
        }, [])

        const addTopicPack = (topicPack, topicPackIndex) => {
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

        //
        // function refreshTopicPack(listOfNewTopicPack) {
        //     setTopicPackList(topicPackList.map((oldTopicPack) => {
        //         listOfNewTopicPack.forEach(newTopicPack => {
        //             if (oldTopicPack.topicPackIndex === newTopicPack.topicPackIndex) {
        //                 oldTopicPack = newTopicPack
        //             }
        //         })
        //         return oldTopicPack
        //     }))
        // }

        function refreshTopicItemList() {
            axios.get(`http://localhost:8082/api/topics/view/list-items`).then((res) => {
                setTopicItemList(res.data)
            });
        }

        function refreshTopicPackList(packRequest) {
            axios.post(`http://localhost:8082/api/topics/panel/get-pack`, packRequest).then((res) => {
                setTopicPackList([res.data]);
            });
        }

        return (
            <TopicPanelContext.Provider
                value={{
                    selectedTopicIdList: topicPackList,
                    addTopicPack,
                    topicItemList,
                    changeTopicPack
                    //     refreshTopicPack
                }}>
                {topicPackList !== null &&
                    <div>
                        <div className="d-flex flex-column align-items-center">
                            {topicPackList.length > 0 && (
                                <TopicBlock
                                    topicBlock={topicPackList[0].topicBlockParent}
                                    showChildren={false}
                                    topicBlockType={initialTopicType}>
                                </TopicBlock>
                            )}
                        </div>
                        {topicPackList.length > 0
                            && topicPackList[0].topicBlockParent.id !== null
                            && topicPackList.map((topicPack, index) => (
                            <TopicPack
                                topicPack={topicPack}
                                topicPackIndex={index}
                                categoryList={categoryList}
                                changeTopicPack={changeTopicPack}
                                key={topicPack}
                            />
                        ))}
                    </div>
                }
            </TopicPanelContext.Provider>
        )
    }
;

export default TopicPanel;