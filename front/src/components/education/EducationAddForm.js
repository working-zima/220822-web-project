import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function EducationAddForm({ portfoiloOwnerId, setEducations, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [school, setSchool] = useState("");
  //useState로 description 상태를 생성함.
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("재학중");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const today = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfoiloOwnerId;
    // "academy/create" 엔드포인트로 post요청함.
    await Api.post("education", {
      user_id:user_id,
      school,
      major,
      position,
      startDate,
      endDate,
    });

    // "academylist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("educations", user_id);
    // academys를 response의 data로 세팅함.
    setEducations(res.data);
    // academy를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="학교이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        
        <Col>
        시작일 <DatePicker 
          selected={startDate}
          onChange={(date) => {
            if (date > today) {
              alert("시작일이 오늘보다 늦습니다.");
            } else {setStartDate(date)}
            }}
          />
        </Col>
        <Col>
        종료일 (오늘 날짜 이후 입력 시, '현재 진행중'으로 표기) <DatePicker 
          selected={endDate}
          onChange={(date) => {
            if (date < startDate){
              alert("종료일이 시작일보다 빠릅니다.");
            } else { setEndDate(date)}
          }}
          />
        </Col>
      
        
      </Form.Group>

      <div key={`inline-radio`} className="mb-3 mt-3">
        <Form.Check
          inline
          label="재학중"
	      id="radio1"
          type="radio"
          name="position"
          value="재학중"
          checked={position === "재학중"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="학사졸업"
		  id="radio2"
          type="radio"
          name="position"
          value="학사졸업"
          checked={position === "학사졸업"}
          onChange={(e) => setPosition(e.target.value)}

        />
        <Form.Check
          inline
          label="석사졸업"
		  id="radio3"
          type="radio"
          name="position"
          value="석사졸업"
          checked={position === "석사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="박사졸업"
		  id="radio4"
          type="radio"
          name="position"
          value="박사졸업"
          checked={position === "박사졸업"}
          onChange={(e) => setPosition(e.target.value)}

        />
      </div>

      
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

export default EducationAddForm;

