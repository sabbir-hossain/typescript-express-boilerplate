import { mongoose, ObjectId } from "../../../database";
const Schema = mongoose.Schema;
import { todoMongoTbl, todoStatus } from "../../../config";

export const todoMongoSchema = new Schema({
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
    enumValues: [ todoStatus.COMPLETE, todoStatus.IN_COMPLETE, todoStatus.IN_PROGRESS ]
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

export const TodoMongooseModel =  mongoose.model(todoMongoTbl, todoMongoSchema);