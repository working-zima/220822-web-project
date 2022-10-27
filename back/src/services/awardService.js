import { Award } from "../db";

class awardService {
    // Award 등록
    static async addAward({ user_id, title, description, awardDate }) {
        const users = await Award.findAll({ user_id });
        if(users.length > 0) {
            const errorMessage = users.map(user => {
                if(user.title === title) {
                    return "같은 이름의 수상내역이 있습니다.";
                }
            });
            if(errorMessage[0] != undefined) {
                return errorMessage;
            }
        }
        
        const newAward = { user_id, title, description, awardDate };
        const createNewAward = await Award.create({ newAward });
        
        return createNewAward;
    }

    // Award 목록 가져오기
    static async getAwards({ user_id }) {
        const users = await Award.findAll({ user_id });

        return users;
    }

    // 특정 Award 수정
    static async setAward({ object_id, toUpdate }) {
        let award = null;

        if(toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            award = await Award.update({ object_id, fieldToUpdate, newValue });
        }
        if(toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            award = await Award.update({ object_id, fieldToUpdate, newValue });
        }
        if(toUpdate.awardDate) {
            const fieldToUpdate = "awardDate";
            const newValue = toUpdate.awardDate;
            award = await Award.update({ object_id, fieldToUpdate, newValue });
        }
        
        return award;
    }
    
    // 특정 Award 삭제
    static async delAward({ object_id }) {
        const deleteAward = await Award.delete({ object_id });

        return deleteAward;
    }
}

export { awardService };