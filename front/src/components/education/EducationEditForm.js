import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";


function EducationEditForm({ currentEducation, setEducations, setIsEditing }) {
  const [school, setSchool] = useState(currentEducation.school);
  //useState로 description 상태를 생성함.
  const [major, setMajor] = useState(currentEducation.major);
  const [position, setPosition] = useState(currentEducation.position);
  const [startDate, setStartDate] = useState(new Date(currentEducation.startDate));
  const [endDate, setEndDate] = useState(new Date(currentEducation.endDate));

  const today = new Date();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentAward의 user_id를 user_id 변수에 할당함.
    const user_id = currentEducation.user_id;
    const object_id = currentEducation.object_id;

    // "awards/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`education/${currentEducation.object_id}`, {
      object_id,
      school,
      major,
      position,
      startDate, 
      endDate,
    });

    // "awardlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("educations", user_id);
    // awards를 response의 data로 세팅함.
    setEducations(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="학교명"
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
      <Form.Group>
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

export default EducationEditForm;


