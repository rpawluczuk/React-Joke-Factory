import React, {useState, useEffect} from 'react';
import {Badge, Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const SingleTopic = ({topic}) => {

    const [isCategory, setIsCategory] = useState(false);

    return (
        <Card>
            <Card.Body>
                <div className="d-flex flex-row">
                    <div className="col-9">
                        <Card.Title className="mb-2">
                            <div className="d-flex flex-row">
                                <h5 className="me-4"> {topic.name} </h5>
                                <div className="text-muted"> { topic.dateCreated } </div>
                            </div>
                        </Card.Title>
                        <Card.Text>
                            <span className="d-inline-block me-1"> Connected Topics: </span>
                            {topic.children.map((connectedTopicName) => (
                                <Badge pill bg="primary" className="d-inline-block me-1">
                                    {connectedTopicName}
                                </Badge>
                            ))}
                        </Card.Text>
                    </div>
                    <div>
                        {isCategory
                            ? <Button variant="primary" className="me-3">Category</Button>
                            : <Button variant="outline-primary" className="me-3">Category</Button>
                        }
                        <Button className="me-3">Edit</Button>
                        <Button>Delete</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SingleTopic;