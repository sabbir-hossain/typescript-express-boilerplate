import * as aws from "aws-sdk";

import {configENV} from "../../config";
const { endpoint, region} = configENV["aws"].db;

aws.config.update({ region });

export const docClient = new aws.DynamoDB.DocumentClient( endpoint ? { endpoint } : {} );

