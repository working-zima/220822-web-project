import { Award } from "../db";

class awardAuthService {
    static async addAward({ user_id, title, description }) {
        const user = await Award.findAll({ user_id });
        const id = user_id;
        
        if(user.length > 0) {
            const errorMessage = user.map(user => {
                if(user.title === title) {
                    return "같은 이름의 수상내역이 있습니다."
                }
            });
            if(errorMessage[0] != undefined) {
                return errorMessage;
            }
        }
        
        const newAward = { id, title, description };
        const createNewAward = await Award.create({ newAward });
        return createNewAward;
    }

    static async getAward({ user_id }) {
        const user = await Award.findById({ user_id });

        return user;
    }

    static async getAwards({ user_id }) {
        const user = await Award.findAll({ user_id });

        return user;
    }

    static async setAward({ _id, toUpdate }) {
        let award = null;

        if(toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            award = await Award.update({ _id, fieldToUpdate, newValue });
        }
        if(toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            award = await Award.update({ _id, fieldToUpdate, newValue });
        }
        
        return award;
    }
    
    static async delAward({ _id }) {
        const user = await Award.delete({ _id });

        return user;
    }
}

export { awardAuthService };