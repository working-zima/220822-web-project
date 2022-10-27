// import {useState} from 'react';
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function ProjectCard({ project, isEditable, setIsEditing, setProjects}) {
  
  const today = new Date(); 
  const endDate = new Date(project.endDate);

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted">{project.startDate}</span> ~ 
          { // endDate 값이 오늘보다 늦을 시, 현재 진행중으로 표기
           today > endDate ? (                              
           <span className="text-muted"> {project.endDate}</span> 
           ) : (
           <span className="text-muted"> 현재 진행중 </span>)}
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
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              
              const user_id = project.user_id;
              const object_id = project.object_id;  
              await Api.delete('projects', object_id);
              const res = await Api.get("projects", user_id);
              setProjects(res.data);
              setIsEditing(false);
            }}
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
