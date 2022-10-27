import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateEditForm({ currentCertificate, setCertificates, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentCertificate.title);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentCertificate.description);
  //useState로 acquisitionDate 상태를 생성함.
  const [acquisitionDate, setAcquisitionDate] = useState(new Date(currentCertificate.acquisitionDate));

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();


    const user_id = currentCertificate.user_id;
    //각각의 certificate의 object_id를 할당받음.
    const object_id = currentCertificate.object_id; 

    // "Certificates/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`certificate/${currentCertificate.object_id}`, {
      object_id,
      title,
      description,
      acquisitionDate,
    });

    // "Certificatelist/portfolioOwnerId" 엔드포인트로 GET 요청함.
    const res = await Api.get("certificates", user_id);
    // Certificates를 response의 data로 세팅함.
    setCertificates(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
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

export default CertificateEditForm;
