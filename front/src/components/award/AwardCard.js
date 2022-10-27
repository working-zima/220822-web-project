import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function AwardCard({ award, isEditable, setIsEditing, setAwards }) {

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.description}</span>
          <br />
          <span className="text-muted">{award.awardDate}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>

            <Button
              variant="outline-info"
              size="sm"
              onClick={async (e)=> {
                e.preventDefault();
                e.stopPropagation();

                const user_id = award.user_id;
                const object_id = award.object_id;
                await Api.delete('awards', object_id);
                const res = await Api.get("awards", user_id);
                setAwards(res.data);
                setIsEditing(false);
              }}
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
