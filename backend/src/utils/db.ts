// backend/utils/db.ts
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const addCommentToDynamoDB = async (comment: any) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME || "",
    Item: comment,
  };
  await dynamoDb.put(params).promise();
};

export const getCommentsFromDynamoDB = async (transcriptId: string) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME || "",
    KeyConditionExpression: 'transcriptId = :transcriptId',
    ExpressionAttributeValues: {
      ':transcriptId': transcriptId,
    },
  };
  const result = await dynamoDb.query(params).promise();
  return result.Items;
};
