import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

function Projects({ portfolioOwnerId, isEditable }) {
  const test0825 = [{
                      user_id: "userP1",
                      title: "프젝1",
                      description: "화이팅 할 수 있다",
                      startDate: "8/22",
                      endDate: "진행중"
                    }]
  //useState로 projects 상태를 생성함.
  const [projects, setProjects] = useState(test0825);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "projectlist/유저id"로 GET 요청하고, response의 data로 projects를 세팅함.
    Api.get("projectlist", portfolioOwnerId).then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트 이력</Card.Title>
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
