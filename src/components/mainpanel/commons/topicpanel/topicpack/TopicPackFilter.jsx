import React, {useState, useEffect} from 'react';
import Select from "react-select";
import axios from "axios";

const TopicPackFilter = (props) => {

    const {
        categoryFilter,
        categoryList,
        onCategorySelect,
        topicPackIndex
    } = props;

    const [questionFilter, setQuestionFilter] = useState({
        value: 0,
        label: "Not Selected"
    })
    const [questionList, setQuestionList] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/panel/question-list`, {
            params: {
                topicPackIndex: topicPackIndex
            }
        }).then((res) => {
            setQuestionList(res.data)
        });
    }, [])

    function handleQuestionSelect(selectedQuestion) {
        setQuestionFilter(selectedQuestion)
        axios.get(`http://localhost:8081/api/topics/panel/pack-filter/by-question`,
            {
                params: {
                    questionId: selectedQuestion.value,
                    topicPackIndex: topicPackIndex
                }
            }).then((res) => {
                onCategorySelect(res.data.categoryFilter)
            console.log(res.data)
        });
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
                    onChange={onCategorySelect}
                    isSearchable={true}
                    placeholder={"Select Category"}
                />
            </div>
        </div>
    )
};

export default TopicPackFilter;