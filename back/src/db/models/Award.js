import { AwardModel } from "../schemas/award";

class Award {
    // Award 등록
    static async create({ newAward }) {
        const createNewAward = await AwardModel.create(newAward);

        return createNewAward;
    }

    // Award 목록 가져오기
    static async findAll({ user_id }) {
        const Awards = await AwardModel.find({user_id: user_id},);
        const award_list = Awards.map((data) => {
            return {
                object_id: data._id,
                user_id: data.user_id,
                title: data.title,
                description: data.description,
                awardDate: data.awardDate.substr(0, 10)
            };
        });
        return award_list;
    }

    // 특정 Award 수정
    static async update({ object_id, fieldToUpdate, newValue }){
        const filter = { _id: object_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        
        return updatedAward;
    }

    // 특정 Award 삭제
    static async delete({ object_id }) {
        const filter = { _id: object_id };
        const Award = await AwardModel.deleteOne(filter);

        return Award;
    }
}


export { Award };