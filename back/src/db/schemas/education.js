import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    startDate:{
      type: String,
      required: true,
    },
    endDate:{
      type: String,
      required: false,
    },
    ongoing:{
      type: Boolean,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
