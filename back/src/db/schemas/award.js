import { Schema, model } from "mongoose";

const Awardchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AwardModel = model("Award", Awardchema);

export { AwardModel };