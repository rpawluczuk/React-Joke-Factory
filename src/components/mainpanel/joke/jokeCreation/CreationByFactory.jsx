import React, {useEffect, useState} from 'react';
import Select from "react-select";
import axios from "axios";
import TopicChildBlock from "./creationByFactory/topicchildset/TopicChildBlock";
import {TopicContext} from "../../../../context/TopicContext";
import TopicChildSet from "./creationByFactory/TopicChildSet";


const CreationByFactory = () => {

    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [topicCreatorChildList, setTopicCreatorChildList] = useState([])
    const [selectedTopicId, setSelectedTopicId] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/category-list`).then((res) => {
            setCategoryList(res.data)
        });
    }, [])

    useEffect(() => {
        if (selectedCategory !== null) {
            const topicCreatorChildRowRequestDto = {
                parentId: null,
                topicPagination: {
                    currentPage: 0,
                    totalItems: 0,
                    totalPages: 0,
                    pageSize: 20
                }
            }
            console.log(topicCreatorChildRowRequestDto)
            axios.get(`http://localhost:8081/api/topics/topic-creator-child-row`, {
                params: {
                    topicCreatorChildRowRequestDto: JSON.stringify(topicCreatorChildRowRequestDto)
                }
            }).then((res) => {
                console.log(res.data)
                setTopicCreatorChildList(res.data.topicCreatorChildList)
            });
        }

    }, [selectedCategory])

    const handleCategorySelect = newSelectedCategory => {
        setSelectedCategory(newSelectedCategory)
    };

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center">
                <div className="col-8 mt-4">
                    <label>Categorization</label>
                    <Select
                        className="p-0"
                        value={selectedCategory}
                        options={categoryList}
                        onChange={handleCategorySelect}
                        isSearchable={true}
                        placeholder={"Select Category Branch"}
                    />
                </div>
            </div>
            <TopicContext.Provider value={{selectedTopicId, setSelectedTopicId}}>
                <TopicChildSet topicCreatorChildList={topicCreatorChildList}/>
            </TopicContext.Provider>
        </div>
    );
}

export default CreationByFactory;