// backend/src/handlers.ts

import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB, S3 } from 'aws-sdk';
import axios from 'axios';

const dynamoDb = new DynamoDB.DocumentClient();
const s3 = new S3();

// Function to add a comment
export const addComment: APIGatewayProxyHandler = async (event) => {
  const { transcriptId, commentText, start, end } = JSON.parse(event.body || '{}');
  const files = event.multiValueHeaders?.files || [];
  const fileUrls: string[] = [];

  // Upload files to S3
  for (const file of files) {
    const fileData = Buffer.from(file, 'base64');
    const fileName = `comment_${Date.now()}_${Math.random()}.png`;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME || '',
      Key: fileName,
      Body: fileData,
      ACL: 'public-read',
    };

    await s3.upload(params).promise();
    fileUrls.push(`https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`);
  }

  // Prepare comment object
  const comment = {
    id: `comment_${Date.now()}`,
    transcriptId,
    commentText,
    start,
    end,
    fileUrls,
    createdAt: new Date().toISOString(),
  };

  // Store comment in DynamoDB
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME || '',
    Item: comment,
  };

  await dynamoDb.put(params).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Comment added', commentId: comment.id }),
  };
};

// Function to get comments for a transcript
export const getComments: APIGatewayProxyHandler = async (event) => {
  const { transcriptId } = event.pathParameters || {};

  if (!transcriptId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Transcript ID is required' }),
    };
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME || '',
    KeyConditionExpression: 'transcriptId = :transcriptId',
    ExpressionAttributeValues: {
      ':transcriptId': transcriptId,
    },
  };

  const result = await dynamoDb.query(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
};

// Function to generate summary
export const generateSummary: APIGatewayProxyHandler = async (event) => {
  const { transcriptId } = JSON.parse(event.body || '{}');

  if (!transcriptId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Transcript ID is required' }),
    };
  }

  // Fetch transcript and comments from DynamoDB
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME || '',
    KeyConditionExpression: 'transcriptId = :transcriptId',
    ExpressionAttributeValues: {
      ':transcriptId': transcriptId,
    },
  };

  const comments = await dynamoDb.query(params).promise();

  // Placeholder transcript text
  const transcript = 'Full transcript text here';

  const response = await axios.post(process.env.OPENAI_API_KEY || "", {
    prompt: `Summarize the following sales transcript and comments: ${transcript} ${JSON.stringify(comments.Items)}`,
    max_tokens: 500,
    temperature: 0.7,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ summary: response.data.choices[0].text }),
  };
};
