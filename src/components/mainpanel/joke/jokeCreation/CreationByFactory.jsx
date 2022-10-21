import React, {useEffect, useState} from 'react';
import Select from "react-select";
import axios from "axios";
import TopicPanel from "components/mainpanel/commons/TopicPanel";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";


const CreationByFactory = () => {

    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({
        value: null,
        label: "All"
    })
    const [initialTopic, setInitialTopic] = useState({
        id: null,
        parentId: null,
        name: "All"
    })

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/category-list`).then((res) => {
            setCategoryList(res.data)
        });
    }, [])

    useEffect(() => {
        const initialTopicId = selectedCategory.value;
        if (initialTopicId !== null) {
            axios.get(`http://localhost:8081/api/topics/${initialTopicId}`).then((res) => {
                setInitialTopic(res.data)
            })
        } else {
            setInitialTopic({
                id: null,
                parentId: null,
                name: "All"
            })
        }
    }, [selectedCategory])

    const handleCategorySelect = (newSelectedCategory) => {
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
            {selectedCategory !== null &&
                <TopicPanel initialTopic={initialTopic}
                            initialTopicType={TopicBlockType.PRESENTER}>
                </TopicPanel>
            }
        </div>
    );
}

export default CreationByFactory;