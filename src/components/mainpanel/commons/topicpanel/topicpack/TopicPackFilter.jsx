import React from 'react';
import Select from "react-select";

const TopicPackFilter = (props) => {

    const {categoryFilter, categoryList, onCategorySelect} = props;

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="col-8 mt-4">
                <label>Categorization</label>
                <Select
                    className="p-0"
                    value={categoryFilter}
                    options={categoryList}
                    onChange={onCategorySelect}
                    isSearchable={true}
                    placeholder={"Select Category Branch"}
                />
            </div>
        </div>
    )
};

export default TopicPackFilter;