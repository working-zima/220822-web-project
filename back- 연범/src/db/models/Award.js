import { AwardModel } from "../schemas/award";

class Award {
    // Award 데이터 생성
    static async create({ newAward }) {
        const createNewAward = await AwardModel.create(newAward);
        
        return createNewAward;
    }

    // Award 데이터 가져오기
    static async findById({ user_id }) {
        const Award = await AwardModel.findOne({id: user_id});
        console.log("findById" + Award);
        return Award;
    }

    //Award 해당 데이터 전부 가져오기
    static async findAll({ user_id }) {
        const Award = await AwardModel.find({id: user_id});
        console.log("findAll" + Award);
        return Award;
    }

    // Award 데이터 업데이트
    static async update({ _id, fieldToUpdate, newValue }){
        const filter = { _id: _id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
        const updatedUser = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        
        return updatedUser;
    }

    // Award 데이터 삭제
    static async delete({ _id }) {
        const filter = { _id: _id };
        const Award = await AwardModel.remove({ filter });
        return Award;
    }
}


export { Award };