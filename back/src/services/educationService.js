import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class educationService {
  static async addEducation({ user_id, projectData }) {
    
    const newEducation = { user_id, ...projectData};
    const createdNewEducation = await Education.create({ newEducation });
    
    return createdNewEducation;
  }

  static async getEducations({ user_id }) {
    const educations = await Education.findAll({ user_id });

    return educations;
  }

  static async setEducation({ object_id, toUpdate }) {
    let education = null;
    
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ object_id, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ object_id, fieldToUpdate, newValue });
    }

    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.update({ object_id, fieldToUpdate, newValue });
    }

    if(toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate
      education = await Education.update({ object_id, fieldToUpdate, newValue });
    }
    if(toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate
      education= await Education.update({ object_id, fieldToUpdate, newValue });
  }
    if(toUpdate.ongoing) {
      const fieldToUpdate = "ongoing";
      const newValue = toUpdate.ongoing
      education= await Education.update({ object_id, fieldToUpdate, newValue });
  } else if(toUpdate.ongoing === false) {
      const fieldToUpdate = "ongoing";
      const newValue = toUpdate.ongoing
      education= await Education.update({ object_id, fieldToUpdate, newValue });
  }

    return education;
  }

  static async delEducation({ object_id }) {
    const deleteEducation = await Education.delete({ object_id });
    return deleteEducation;
}
}

export { educationService };


