import { ProjectModel } from "../schemas/project";

class Project {
    // Project 등록
    static async create({ newProject }) {
        const createNewProject = await ProjectModel.create(newProject);

        return createNewProject;
    }

    // Project 목록 가져오기
    static async findAll({ user_id }) {
        const filter = { user_id: user_id };
        const Projects = await ProjectModel.find(filter);
        const project_list = Projects.map((data) => {   
            return {
                object_id: data._id,
                user_id: data.user_id,
                title: data.title,
                description: data.description,
                startDate: data.startDate.substr(0, 10),
                endDate: data.endDate.substr(0, 10)
            }
        });

        return project_list;
    }

    // 특정 Project 수정
    static async update({  object_id, fieldToUpdate, newValue }) {
        const filter = { _id: object_id }
        const update = { [fieldToUpdate]: newValue } ;
        const option = { returnOriginal: false };
        const updateProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updateProject;
    }

    // 특정 Project 삭제
    static async delete({ object_id }) {
        const filter = { _id: object_id };
        const deleteProject = await ProjectModel.deleteOne(filter);
        
        return deleteProject;
    }
}

export { Project };