import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

educationRouter.post("/education", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const ongoing = req.body.ongoing;
    const projectData = {
      school,
      major,
      position,
      startDate,
      endDate,
      ongoing,
    }
    // 위 데이터를 학력 db에 추가하기
    const newEducation = await educationService.addEducation({
      user_id,
      projectData
    });
    
    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educations/:user_id", login_required, async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentEducationInfo = await educationService.getEducations({ user_id });
      if (currentEducationInfo.errorMessage) {
          throw new Error(currentEducationInfo.errorMessage);
      }
      
    res.status(200).send(currentEducationInfo);  
    } catch (error) {
      next(error);
    }
});

educationRouter.put("/education/:object_id", login_required, async (req, res, next) => {
    try {
      const object_id = req.params.object_id;
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;
      const startDate = req.body.startDate ?? null;
      const endDate = req.body.endDate ?? null;
      const ongoing = req.body.ongoing ?? null;
      const toUpdate = { school, major, position, startDate, endDate, ongoing };
      const updatedEducation = await educationService.setEducation({ object_id, toUpdate });
       if(updatedEducation.errorMessage){
        throw new Error(updatedEducation.errorMessage);
       }   
      
      
      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.delete('/education/:object_id', login_required, async (req, res, next) => {
  try {
      const object_id = req.params.object_id; 
      const deleteEducation = await educationService.delEducation({ object_id });
      if (deleteEducation.errorMessage) {
          throw new Error(deleteEducation.errorMessage);
      }
      res.status(200).json(deleteEducation);
  } catch(error) {
      next(error);
  }
});

export { educationRouter };
