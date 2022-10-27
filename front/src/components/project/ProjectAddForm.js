import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);   // 초기값 오늘 > null 로 바꿈
  const [endDate, setEndDate] = useState(null);

  const today = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "project" 엔드포인트로 post요청함.
    await Api.post("project", {
      user_id: portfolioOwnerId,
      title,
      description,
      startDate,
      endDate,
    });


    // "projects/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("projects", user_id);
    // projects를 response의 data로 세팅함.
    setProjects(res.data);
    // project를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
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
          종료일 (오늘 날짜 이후 입력 시, '현재 진행중'으로 표기) <DatePicker 
          selected={endDate}
          onChange={(date) => {
            if (date < startDate){
              alert("종료일이 시작일보다 빠릅니다.");
            } else { setEndDate(date);}
          }}
          />
        </Col>

        {/* 렌더링 너무 많아서 에러
        { differenceInDays(startDate, endDate) > 0 ?
          setCheckDiffInDate(false) : setCheckDiffInDate(true)
        } */}  
        
      </Form.Group>


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
