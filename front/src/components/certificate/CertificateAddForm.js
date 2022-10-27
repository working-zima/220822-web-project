import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function CertificateAddForm({ portfolioOwnerId, setCertificates, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState("");
  //useState로 acquisitionDate 상태를 생성함. 초기값은 현재날짜로 설정
  const [acquisitionDate, setAcquisitionDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "certificate/create" 엔드포인트로 post요청함.
    //0829 user_id: portfolioOwnerId를 user_id: user_id로 수정
    await Api.post("certificate", {
      user_id: user_id,
      title,
      description,
      acquisitionDate,
    });

    // "Certificatelist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("certificates", user_id);
    // certificates를 response의 data로 세팅함.
    setCertificates(res.data);
    // certificate를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
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

      <Form.Group controlId="formBasicDescription" className="mt-3 col-2">
        <DatePicker 
            selected={acquisitionDate}
            onChange={(date) => setAcquisitionDate(date)}
        />
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

export default CertificateAddForm;
