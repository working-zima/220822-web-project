import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";


function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const today = new Date();
  const date = today.toLocaleDateString();

  const [startDate, setStartDate] = useState(date)
  const [endDate, setEndDate] = useState(date)



  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId;

    await Api.post("project/create", {
      user_id: portfolioOwnerId,
      title,
      description,
    });

    const res = await Api.get("projectlist", user_id);
    setProjects(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Row>
        <Col>
      <Form.Group controlId='formStartDate' className = "mt-3">
                <Form.Control
                    type = 'date'
                    placeholder = {date}
                    value = {startDate}
                    onChange = {(e)=>setStartDate(e.target.value)}
                    />
      </Form.Group> 
      </Col>
      <Col>
        <Form.Group controlId='formEndDate' className = "mt-3">
                <Form.Control
                    type = 'date'
                    placeholder = {date}
                    value = {endDate}
                    onChange = {(e)=>setEndDate(e.target.value)}
                    />
        </Form.Group>
        </Col>
        </Row>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectAddForm;
