import React, {useEffect, useState} from 'react';
import Select from "react-select";
import axios from "axios";
import TopicPanel from "components/mainpanel/commons/TopicPanel";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";


const CreationByFactory = () => {

    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({
        value: 0,
        label: "All"
    })
    const [topicPanel, setTopicPanel] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/view/category-list`).then((res) => {
            setCategoryList(res.data)
        });
        axios.get(`http://localhost:8081/api/topics/panel/${0}`).then((res) => {
            setTopicPanel(res.data)
        });
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/panel/${selectedCategory.value}`).then((res) => {
            setTopicPanel(res.data)
        })
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
            {topicPanel !== null &&
                <TopicPanel topicPanel={topicPanel}
                            initialTopicType={TopicBlockType.PRESENTER}>
                </TopicPanel>
            }
        </div>
    );
}

export default CreationByFactory;