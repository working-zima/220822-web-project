import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

function EducationForm() {
  //useState로 position 상태를 생성함.
    const [position, setPosition] = useState("재학중")

  return (
    <Form>
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

      {/* <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            제출
          </Button>
        </Col>
      </Form.Group> */}
    </Form>
  );
}

export default EducationForm