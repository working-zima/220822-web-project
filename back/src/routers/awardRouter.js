import is from "@sindresorhus/is";
import { Router } from "express";
import { awardAuthService } from "../services/awardService";

const awardAuthRouter = Router();

awardAuthRouter.post('/award/create', async function(req, res, next) {
    try {
        if(is.emptyObject(req.body))
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");

        const user_id = req.body.user_id;
        const title = req.body.title;
        const description = req.body.description;
        const newAward = await awardAuthService.createAward({
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

awardAuthRouter.put('/awards/:id', async function(req, res, next) {
    try {
        const user_id = req.params.id;
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;

        const toUpdate = { title, description };
        
        const updateAward = await awardAuthService.setAward({ user_id, toUpdate });

        if(updateAward.errorMessage) {
            throw new Error(updateAward.errorMessage);
        }
        res.status(200).json(updateAward);
    } catch(error) {
        next(error);
    }
});

awardAuthRouter.get('/awardlist/:id', async function(req, res, next) {
    try {
        const user_id = req.params.id;
        const currentAwardInfo = await awardAuthService.getAward({ user_id });

        if(currentAwardInfo.errorMessage) {
            throw new Error(currentAwardInfo.errorMessage);
        }

        res.status(200).json(currentAwardInfo);
    } catch(error) {
        next(error);
    }
});

awardAuthRouter.post('/award/delete', async function(req, res, next) {
    try {
        console.log("성공")
        const user_id = req.params.user_id;

        const deleteAwardInfo = await awardAuthService.deleteAward({ user_id });
        
        if (deleteAwardInfo.errorMessage) {
            throw new Error(deleteAwardInfo.errorMessage);
        }
        res.status(200).json(deleteAwardInfo);
    } catch(error) {
        next(error);
    }
});

export { awardAuthRouter };