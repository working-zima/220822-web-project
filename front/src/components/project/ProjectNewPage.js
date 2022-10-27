// import * as Api from "../../api";
import React, { useContext, useEffect, useState} from "react";
import { Container, Col, Row } from "react-bootstrap";


function ProjectNewPage() {
    // const [projects, setProjects] = useState([]);

    // const res = Api.get('projects/234b5c8b-6ba6-49f2-8f59-4ab29680e871');
    
    // setProjects(res.data);
    
    // const projectList = projects.map((project) => (
    //     <Col key = {project.id}> {projectList} </Col>
    // ));
    // console.log(projectList);

    return (
        <Container fluid>
        <Row>
           <Col md="3" lg="3">
             프로젝트 목록
             {//페이지 완쪽 : 프로젝트 목록 간략히 
              //Api.get으로 불러오고 싶은데 미완성
              //projectList
             }
           </Col>
           <Col>
           <Col className = "m-2">
             프로젝트 목적
           </Col>
           <Col className = "m-2">
             프로젝트 요약 (wall paper 이미지 등 파일 업로드 기능)
           </Col>
           <Col className = "m-2">
             프로젝트 개선
           </Col>
           <Col className = "m-2">
             프로젝트 동료 리뷰 (댓글 기능, 익명 기능);
           </Col>
           </Col>
         
         </Row>

       </Container>
    )
}

export default ProjectNewPage;