import { mongoose } from "../../../database";
const Schema = mongoose.Schema;
import { userMongoTbl, userStatus, userRole } from "../../../config";

export const userMongoSchema = new Schema({
  name: {
    type: String, 
    required: true,
    trim: true,
    regExp: /\w+/ig
  },
  email: {
    type: String, 
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  status: {
    type: String,
    index: true,
    required: true,
    enumValues: [ userStatus.ACTIVE, userStatus.IN_ACTIVE, userStatus.DELETED ]
  },
  role: {
    type: String,
    index: true,
    required: true,
    enumValues: [ userRole.ADMIN, userRole.CLIENT ]
  },
  dbName: {
    type: String
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