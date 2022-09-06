import React, {useEffect, useState} from 'react';
import Select from "react-select";
import axios from "axios";
import TopicPanel from "components/mainpanel/commons/TopicPanel";


const CreationByFactory = () => {

    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [initialTopicId, setInitialTopicId] = useState(null)


    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/category-list`).then((res) => {
            setCategoryList(res.data)
        });
    }, [])

    useEffect(() => {
        if (selectedCategory !== null) {
            setInitialTopicId(selectedCategory.value)
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
                <TopicPanel initialTopicId={initialTopicId}></TopicPanel>
            }
        </div>
    );
}

export default CreationByFactory;