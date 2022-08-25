import { Award } from "../db";

class awardAuthService {
    static async createAward({ user_id, title, description }) {
        const user = await Award.findById({ user_id });
        
        let createNewAward = null;
        let createAddAward = null;
        if(user) {
            const list = user.list;
            if(list.title === title) {
                const errorMessage = "같은 이름의 수상내역이 있습니다."
                return errorMessage;
            }
            if(title) {
                const fieldToUpdate = "title";
                const newValue = title;
                createAddAward = await Award.update({ user_id, fieldToUpdate, newValue });
            }
            if(description) {
                const fieldToUpdate = "description";
                const newValue = description;
                createAddAward = await Award.update({ user_id, fieldToUpdate, newValue });
            }
            return createAddAward;
        }
        
        const newAward = { user_id, list: [{ title, description }]}
    
        createNewAward = await Award.create({ newAward });

        return createNewAward;
    }

    static async getAward({ user_id }) {
        
        const user = await Award.findById({ user_id });
        const awards = user.list;

        return awards;
    }

    static async setAward({ user_id, toUpdate }) {
        const user = await Award.findById({ user_id });
        const list =  user.list;
        console.log(list)
        let award = null;

        if(!list.title === toUpdate.title) {
            const errorMessage = "같은 이름의 수상내역이 있습니다."
            return errorMessage;
        }
        
        // let num = 0;
        // const awardIndex = list.map(award => {
        //     if(award.title === title) {
        //         return num;
        //     }
        //     num ++;
        // });
        console.log("성공")
        if(toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            award = await Award.update({ user_id, fieldToUpdate, newValue });
        }

        if(toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            award = await Award.update({ user_id, fieldToUpdate, newValue });
        }

        return award;
    }
    
    static async deleteAward({ user_id }) {

        const user = await Award.deleteAward({ user_id });

        if(user) {
            const errorMessage = "삭제를 실패하였습니다."
            return errorMessage;
        }

        return user;
    }
}

export { awardAuthService };