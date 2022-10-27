import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

//certificate 등록
certificateRouter.post("/certificate", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요");
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const acquisitionDate = req.body.acquisitionDate;
    const certificateData = {
      title,
      description,
      acquisitionDate,
  }
  const newCertificate = await certificateService.addCertificate({
      user_id,
      certificateData
  });
    
    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});
//자격증 목록 가져오기
certificateRouter.get(
  "/certificates/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentCertificateInfo = await certificateService.getCertificates({ user_id });
      if(currentCertificateInfo) {
        if (currentCertificateInfo.errorMessage) {
            throw new Error(currentCertificateInfo.errorMessage);
        }
        res.status(200).send(currentCertificateInfo);  
      }
    } catch (error) {
      next(error);
    }
  }
);
//특정 자격증 편집
certificateRouter.put(
  "/certificate/:object_id",
  login_required,
  async function (req, res, next) {
    try {
      const object_id = req.params.object_id;
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const acquisitionDate = req.body.acquisitionDate ?? null;

      const toUpdate = { title, description, acquisitionDate };

      const updatedCertificate = await certificateService.setCertificate({ object_id, toUpdate });

      if(updatedCertificate.errorMessage) {
          throw new Error(updatedCertificate.errorMessage);
      }
      res.status(200).json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.delete('/certificates/:object_id', login_required, async (req, res, next) => {
  try {
      const object_id = req.params.object_id;
      const deleteCertificate = await certificateService.delCertificate({ object_id });
      if (deleteCertificate.errorMessage) {
          throw new Error(deleteCertificate.errorMessage);
      }
      res.status(200).json(deleteCertificate);
  } catch(error) {
      next(error);
  }
});

export { certificateRouter };
