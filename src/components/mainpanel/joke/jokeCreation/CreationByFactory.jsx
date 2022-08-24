import React, {useEffect, useState} from 'react';
import Select from "react-select";
import axios from "axios";
import TopicPack from "./creationByFactory/TopicPack";
import {TopicPanelContext} from "./TopicPanelContext";


const CreationByFactory = () => {

    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedTopicIdList, setSelectedTopicIdList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/category-list`).then((res) => {
            setCategoryList(res.data)
        });
    }, [])

    useEffect(() => {
        if (selectedCategory !== null) {
            setSelectedTopicIdList([
                selectedCategory.value
            ])
        }
    }, [selectedCategory])

    const handleCategorySelect = (newSelectedCategory) => {
        setSelectedCategory(newSelectedCategory)
    };

    const addTopicPack = (parentId, topicPackNumber) => {
        setSelectedTopicIdList(oldArray => [...oldArray.slice(0, topicPackNumber + 1),
            parentId
        ]);
    }

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
            <TopicPanelContext.Provider value={{selectedTopicIdList, addTopicPack}}>
                {selectedTopicIdList.map((parentId, index) => (
                    <TopicPack parentId={parentId} topicPackNumber={index}/>
                ))}
            </TopicPanelContext.Provider>
        </div>
    );
}

export default CreationByFactory;