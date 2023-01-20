import React, {useContext, useEffect, useState} from 'react';
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import {TopicPackContext} from "components/mainpanel/commons/topicpanel/TopicPackContext";
import axios from "axios";
import TopicPackPagination from "components/mainpanel/commons/topicpanel/topicpack/TopicPackPagination";
import {FaRandom} from "react-icons/all";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";
import TopicPackFilter from "components/mainpanel/commons/topicpanel/topicpack/TopicPackFilter";

const TopicPack = (props) => {

    const {topicPack, topicPackIndex, categoryList, changeTopicPack} = props;
    const [categoryFilter, setCategoryFilter] = useState({
        value: 0,
        label: "All"
    })
    const [topicBlockPage, setTopicBlockPage] = useState(topicPack.topicBlockPage)
    const [pagination, setPagination] = useState({
        currentPage: 0,
        pageSize: 20
    })
    const {addTopicPack} = useContext(TopicPanelContext)

    useEffect(() => {
        console.log("topic pack")
        console.log(topicPack)
        setTopicBlockPage(topicPack.topicBlockPage)
    }, [topicPack])

    function handlePageChange(pageNumber) {
        axios.get(`http://localhost:8081/api/topics/panel/get-pack-by-page`, {
                params: {
                    pageNumber: pageNumber,
                    topicPackIndex: topicPackIndex
                }
            }
        ).then((res) => {
            setTopicBlockPage(res.data.topicBlockPage);
        });
        setPagination({...pagination, currentPage: pageNumber})
    }

    function handleCategorySelect(selectedCategory) {
        setCategoryFilter(selectedCategory)
        axios.get(`http://localhost:8081/api/topics/panel/pack-filter`,
            {
                params: {
                    categoryId: selectedCategory.value,
                    topicPackIndex: topicPackIndex
                }
            }).then((res) => {
            changeTopicPack(res.data, topicPackIndex);
        });
    }

    const handleRandomClick = async () => {
        axios.get(`http://localhost:8081/api/topics/panel/random`, {
            params: {
                topicPackIndex: topicPackIndex
            }
        }).then(async (res) => {
            await addTopicPack(res.data[0], topicPackIndex);
            await addTopicPack(res.data[1], topicPackIndex + 1);
        })
    }

    return (
        <TopicPackContext.Provider
            value={{pagination}}>
            <hr></hr>
            {topicPack.topicBlockParent.category === false &&
                <TopicPackFilter
                    categoryFilter={categoryFilter}
                    categoryList={categoryList}
                    onCategorySelect={handleCategorySelect}
                    topicPackIndex={topicPackIndex}
                    >
                </TopicPackFilter>
            }
            <div className="d-flex flex-row justify-content-center mt-3">
                <button className="btn-sm btn-outline-primary" onClick={handleRandomClick}>
                    <div>Random</div>
                    <FaRandom style={{fontSize: "26px"}}/>
                </button>
            </div>
            <div className="d-flex flex-row flex-wrap">
                {topicBlockPage.content.map((topicBlock) => (
                    <TopicBlock
                        key={topicBlock.id}
                        topicBlock={topicBlock}
                        topicPackIndex={topicPackIndex}
                        topicBlockType={TopicBlockType.PRESENTER}
                        isAnySelectionInPack={topicPack.anySelection}
                    />
                ))}
                <TopicBlock
                    topicBlock={{parentId: topicPack.topicBlockParent.id,
                        secondParentId: topicPack.topicBlockSecondParent !== null ? topicPack.topicBlockSecondParent.id : null}}
                    topicBlockType={TopicBlockType.CREATOR}
                    categoryFilter={categoryFilter}
                />
            </div>
            <TopicPackPagination
                pagination={topicBlockPage}
                onPageChange={handlePageChange}>
            </TopicPackPagination>

        </TopicPackContext.Provider>
    );
}

export default TopicPack;