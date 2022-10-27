import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

// Project 등록
projectRouter.post("/project", login_required, async (req, res, next) => {
    try {
        if(is.emptyObject(req.body)) {
            throw new Error("header의 Content-Tpye을 application/json으로 설정해주세요");
        }

        const user_id = req.body.user_id;
        const title = req.body.title;
        const description = req.body.description;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const projectData = {
            title,
            description,
            startDate,
            endDate
        }
        const newProject = await projectService.addProject({
            user_id,
            projectData
        });

        if(newProject.errorMessage) {
            throw new Error(newProject.errorMessage);
        }

        res.status(201).json(newProject);
    } catch(err) {
        next(err);
    }
});

// Project 목록 가져오기
projectRouter.get("/projects/:user_id", login_required, async (req, res, next) => {
    try {
            const user_id = req.params.user_id;
            const currentProjectInfo = await projectService.getProjects({ user_id });
            if(currentProjectInfo.errorMessage) {
                throw new Error(currentProjectInfo.errorMessage);
            }

        res.status(200).json(currentProjectInfo);
    } catch(err) {
        next(err);
    }
})

// 특정 Project 수정
projectRouter.put("/project/:object_id", login_required, async (req, res, next) => {
    try {
        const object_id = req.params.object_id;
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
        const startDate = req.body.startDate ?? null;
        const endDate = req.body.endDate ?? null;
        const toUpdate = { title, description, startDate, endDate };
        const updateProject = await projectService.setProject({ object_id, toUpdate });

        if(updateProject.errorMessage) {
            throw new Error(updateProject.errorMessage);
        }

        res.status(200).json(updateProject);
    } catch(err) {
        next(err);
    }
})

// 특정 Project 삭제
projectRouter.delete("/projects/:object_id", login_required, async (req, res, next) => {
    try {
        const object_id = req.params.object_id;
        const deleteProject = await projectService.delProject({ object_id });

        if (deleteProject.errorMessage) {
            throw new Error(deleteProject.errorMessage);
        }

        res.status(200).json(deleteProject);
    } catch(err) {
        next(err);
    }
})

export { projectRouter };