import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardAuthService } from "../services/awardService";

const awardAuthRouter = Router();

awardAuthRouter.post('/award/create', login_required, async function(req, res, next) {
    try {
        if(is.emptyObject(req.body)) {
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }
            
        const user_id = req.body.user_id;
        const title = req.body.title;
        const description = req.body.description;
        const newAward = await awardAuthService.addAward({
            user_id,
            title,
            description,
        });

        if (newAward.errorMessage) {
            throw new Error(newAward.errorMessage);
        }
        
        res.status(201).json(newAward);
    } catch(error) {
        next(error);
    }
});

awardAuthRouter.get(
    "/awardlist/:id",
    login_required,
    async function (req, res, next) {
      try {
        const user_id = req.params.id;
        const currentAwardInfo = await awardAuthService.getAwards({ user_id });
        if(currentAwardInfo) {
            if (currentAwardInfo.errorMessage) {
                throw new Error(currentAwardInfo.errorMessage);
            }
            res.status(200).send(currentAwardInfo);  
        }
        

      } catch (error) {
        next(error);
      }
    }
  );

awardAuthRouter.put('/awards/:id', login_required, async function(req, res, next) {
    try {
        const user_id = req.params.id;
        const titleHidden = req.body.titleHidden ?? null;
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
        const toUpdate = { title, description };

        const user = await awardAuthService.getAwards({ user_id });
        const _id = user.map(user => {
            if(user.title === titleHidden) {
                return user._id;
            }
        })

        const updatedAward = await awardAuthService.setAward({ _id, toUpdate });

        if(updatedAward.errorMessage) {
            throw new Error(updatedAward.errorMessage);
        }
        res.status(200).json(updatedAward);
    } catch(error) {
        next(error);
    }
});

awardAuthRouter.post('/award/delete/:id', login_required, async function(req, res, next) {
    try {
        const _id = req.params.id;
        console.log("성공")
        const fieldToDelete = await awardAuthService.delAward({ _id });
        console.log(fieldToDelete)
        if (fieldToDelete.errorMessage) {
            throw new Error(fieldToDelete.errorMessage);
        }
        res.status(200).json(fieldToDelete);
    } catch(error) {
        next(error);
    }
});

export { awardAuthRouter };