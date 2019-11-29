import { mongoose, ObjectId } from "../../../database";
const Schema = mongoose.Schema;
import { userMongoTbl, userStatus } from "../../../config";

export const userMongoSchema = new Schema({
  name: {
    type: String, 
    required: true,
    trim: true,
    regExp: /\w+/ig
  },
  status: {
    type: String,
    index: true,
    required: true,
    enumValues: [ userStatus.COMPLETE, userStatus.IN_COMPLETE, userStatus.IN_PROGRESS ]
  },
  ref: {
    type: ObjectId,
    index: true,
    default: null
  },
  startDate: {
    type: Date,
    default: null,
    min: Date.now
  },
  endDate: {
    type: Date,
    default: null,
    min: Date.now
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
})

export const UserMongooseModel =  mongoose.model(userMongoTbl, userMongoSchema);