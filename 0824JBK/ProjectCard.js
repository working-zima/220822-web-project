import { Card, Button, Row, Col } from "react-bootstrap";

function ProjectCard({ project, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <span className="text-muted">{project.period}</span>
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
          </Col>
        )}

        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              // onClick={() => }
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

export default ProjectCard;
