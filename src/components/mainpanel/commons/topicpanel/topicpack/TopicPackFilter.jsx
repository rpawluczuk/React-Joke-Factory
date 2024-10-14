import React, {useState, useEffect} from 'react';
import Select from "react-select";
import axios from "axios";

const TopicPackFilter = (props) => {

    const {
        categoryFilter,
        categoryList,
        onCategorySelect,
        parentId
    } = props;

    const [questionFilter, setQuestionFilter] = useState({
        value: 0,
        label: "Not Selected"
    })
    const [questionList, setQuestionList] = useState([])

    useEffect(() => {
        if (parentId !== null) {
            axios.get(`http://localhost:8082/api/topics/panel/question-list`, {
                params: {
                    topicId: parentId
                }
            }).then((res) => {
                setQuestionList(res.data)
            });
        }
    }, [])

    function handleQuestionSelect(selectedQuestion) {
        setQuestionFilter(selectedQuestion)
        axios.get(`http://localhost:8082/api/topics/panel/pack-filter/by-question`,
            {
                params: {
                    questionId: selectedQuestion.value,
                    // topicPackIndex: topicPackIndex
                }
            }).then((res) => {
                onCategorySelect(res.data.categoryFilter)
        });
    }

    function handleCategorySelect(selectedCategory) {
        setQuestionFilter({
            value: 0,
            label: "Not Selected"
        })
        onCategorySelect(selectedCategory)
    }

    return (
        <div className="d-flex flex-row justify-content-center">
            <div className="col-5 mt-4">
                <label>Question</label>
                <Select
                    className="p-0"
                    value={questionFilter}
                    options={questionList}
                    onChange={handleQuestionSelect}
                    isSearchable={true}
                    placeholder={"Select Question"}
                />
            </div>
            <div className="col-5 mt-4 ms-5">
                <label>Categorization</label>
                <Select
                    className="p-0"
                    value={categoryFilter}
                    options={categoryList}
                    onChange={handleCategorySelect}
                    isSearchable={true}
                    placeholder={"Select Category"}
                />
            </div>
        </div>
    )
};

export default TopicPackFilter;