import { AwardModel } from "../schemas/award";

class Award {
    // Award 데이터 생성
    static async create({ newAward }) {
        const createNewAward = await AwardModel.create(newAward);
        return createNewAward;
    }

    // Award 데이터 가져오기
    static async findById({ user_id }) {
        // console.log(user_id);
        const Award = await AwardModel.findOne({user_id: user_id});
        return Award;
    }

    // Award 데이터 업데이트
    static async update({ user_id, fieldToUpdate, newValue }) {
        console.log(fieldToUpdate)
        console.log(newValue)
        const filter = { user_id: user_id };
        const update = { list:[{ [fieldToUpdate]: newValue }] };
        // 배열안에 든 객체들을 추가 및 수정! 방법 찾기
        const option = { returnOriginal: false };

        const updatedUser = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return AwardModel;
    }

    // Award 데이터 삭제
    static async remove({ user_id }) {
        const filter = { id: user_id };
        const Award = await AwardModel.findOneAndDelete({ filter });
        
        return Award;
    }
}


export { Award };