import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationCard({ education, isEditable, setIsEditing, setEducations}) {
  const today = new Date(); 
  const endDate = new Date(education.endDate);

  const delHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const user_id = education.user_id;
    const object_id = education.object_id;
    await Api.delete('education', object_id)
    const res = await Api.get("educations", user_id);
    setEducations(res.data);
    setIsEditing(false);}
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{education.school}</span>
          &nbsp;&nbsp;&nbsp;
          <span className="text-muted"> {education.position}</span>
          <br />
          <span className="text-muted">{education.major}</span>
          <br />
          <span className="text-muted">{education.startDate}</span>
          &nbsp; ~&nbsp;
          { // endDate 값이 오늘보다 늦을 시, 현재 진행중으로 표기
           today > endDate ? (                              
           <span className="text-muted"> {education.endDate}</span> 
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
            >편집
            </Button>

            <Button
              variant="outline-info"
              size="sm"
              onClick={delHandler}
              className = "mr-3"  
            >삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard
