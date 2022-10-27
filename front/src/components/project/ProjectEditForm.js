import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function ProjectEditForm({currentProject, setProjects, setIsEditing }) {
  // useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentProject.title);
  // useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentProject.description);
  // useState로 startDate, endDate 상태를 생성함.
  const [startDate, setStartDate] = useState(new Date(currentProject.startDate));
  const [endDate, setEndDate] = useState(new Date(currentProject.endDate));

  const today = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentProject의 user_id를 user_id 변수에 할당함.
    const object_id = currentProject.object_id;
    const user_id = currentProject.user_id;

    // "project/object_id" 엔드포인트로 PUT 요청함.
    await Api.put(`project/${currentProject.object_id}`, {
      object_id,
      title,
      description,
      startDate, 
      endDate,
    });

    // "project/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("projects", user_id);
    // projects를 response의 data로 세팅함.
    setProjects(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="프로젝트 상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        
        <Col>
          시작일 <DatePicker 
          selected={startDate}
          onChange={(date) => {
            if (date > today) {
              alert("시작일이 오늘보다 늦습니다.");
            } else {setStartDate(date);}
          }}
          />
        </Col>
        <Col>
          종료일 <DatePicker 
          selected={endDate}
          onChange={(date) => {
            if (date < startDate){
              alert("종료일이 시작일보다 빠릅니다.");
            } else { setEndDate(date);}
          }}
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

export default ProjectEditForm;
