import React from 'react';
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';

const TopicSearch = (props) => {

    const {onSearchControlChange, searchControl, onSearchFormSubmit} = props;

    return (
        <div className="card card-body mt-3 px-5 mb-5">
            <Form onSubmit={onSearchFormSubmit}>
                <Stack gap={3} direction="horizontal">
                    <Form.Control
                        type="text"
                        value={searchControl}
                        placeholder="Search for topics ..."
                        onChange={onSearchControlChange}
                    />
                    <Button
                        variant="outline-primary"
                        type="submit"
                        className="my-2 my-sm-0"
                    >
                        Search
                    </Button>
                </Stack>
            </Form>
        </div>
    );
};

export default TopicSearch;