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
    const [topicPage, setTopicPage] = useState(topicPack.topicPage)
    const [pagination, setPagination] = useState({
        currentPage: 0,
        pageSize: 20
    })
    const {addTopicPack} = useContext(TopicPanelContext)

    useEffect(() => {
        setTopicPage(topicPack.topicPage)
    }, [topicPack])

    function handlePageChange(pageNumber) {
        axios.get(`http://localhost:8081/api/topics/panel/get-pack-by-page`, {
                params: {
                    pageNumber: pageNumber,
                    topicPackIndex: topicPackIndex
                }
            }
        ).then((res) => {
            setTopicPage(res.data.topicPage);
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
            {topicPack.topicParent.category === false &&
                <TopicPackFilter
                    categoryFilter={categoryFilter}
                    categoryList={categoryList}
                    onCategorySelect={handleCategorySelect}>
                </TopicPackFilter>
            }
            <div className="d-flex flex-row justify-content-center mt-3">
                <button className="btn-sm btn-outline-primary" onClick={handleRandomClick}>
                    <div>Random</div>
                    <FaRandom style={{fontSize: "26px"}}/>
                </button>
            </div>
            <div className="d-flex flex-row flex-wrap">
                {topicPage.content.map((topic) => (
                    <TopicBlock
                        key={topic.id}
                        topic={topic}
                        topicPackIndex={topicPackIndex}
                        topicBlockType={TopicBlockType.PRESENTER}
                    />
                ))}
                <TopicBlock
                    topic={{parentId: topicPack.topicParent.id}}
                    topicBlockType={TopicBlockType.CREATOR}
                />
            </div>
            <TopicPackPagination
                pagination={topicPage}
                onPageChange={handlePageChange}>
            </TopicPackPagination>

        </TopicPackContext.Provider>
    );
}

export default TopicPack;