import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {

  const [title, setTitle] = useState(currentAward.title);
  const [description, setDescription] = useState(currentAward.description);
  const [awardDate, setAwardDate] = useState(new Date(currentAward.awardDate));

  const user_id = currentAward.user_id;

  const object_id = currentAward.object_id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await Api.put(`award/${currentAward.object_id}`, {
      object_id,
      title,
      description,
      awardDate,
    });

    const res = await Api.get("awards", user_id);
    setAwards(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
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

      <Form.Group as={Row} className="mt-3">
        <Col>
          수상일 <DatePicker 
          dateFormat = "yyyy.MM.dd"
          selected={awardDate}
          onChange={(date) => setAwardDate(date)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
