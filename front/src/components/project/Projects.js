import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

function Projects({ portfolioOwnerId, isEditable }) {
  const navigate = useNavigate();
    //useState로 projects 상태를 생성함.
  const [projects, setProjects] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "projects/유저id"로 GET 요청하고, response의 data로 projects를 세팅함.
    Api.get("projects", portfolioOwnerId).then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        
        <Card.Title>프로젝트 이력</Card.Title>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button 
        variant="outline-primary"
        size="sm"
        location="align-right"
        onClick={() => navigate("/newPage")}
        portfolioOwnerId={portfolioOwnerId}
        projects = {projects}
        setProjects={setProjects}
        isEditable={isEditable}
        > 
        페이지 이동
        </Button></div>
      

        {projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            setProjects={setProjects}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}> + </Button>
            </Col>
          </Form.Group>
        )}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={setProjects}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Projects;
