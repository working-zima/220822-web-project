import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateCard({ certificate, isEditable, setIsEditing }) {
 
  // const [description, setDescription] = useState(currentCertificate.description);
  const [title, setTitle] = useState("");
  
  const handleDelete = async (e, _id) => {
    e.preventDefault();
    e.stopPropagation();

    // currentCertificate의 user_id를 user_id 변수에 할당함.
    // const user_id = currentCertificate.user_id;

    // "Certificates/수상 id" 엔드포인트로 PUT 요청함.
      Api.post(`certificate/delete/${certificate.id}`, {
        title
      });
    };


  return (
  <Card.Text>
    <Row className="align-items-center">
      <Col>
        <span>{certificate.title}</span>
        <br />
        <span className="text-muted">{certificate.description}</span>
      </Col>
      {isEditable && (
        <Col xs lg="1">
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => setIsEditing((prev) => !prev)}
            className="mr-3"
          >
            Edit
          </Button>
          <Button
            variant="outline-info"
            size="sm"
            value={certificate._id}
            onClick={(e)=> handleDelete(e, setTitle(certificate.id))}
            className="mr-3"
          >
            삭제
          </Button>
        </Col>
        )}
      </Row>
     </Card.Text>
  );
}

export default CertificateCard;
