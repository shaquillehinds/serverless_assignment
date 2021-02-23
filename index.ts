import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from "aws-lambda";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {
  const random = Math.floor(Math.random() * 10);
  const response = {
    statusCode: 200,
    body: JSON.stringify(`Random number is ${random}`),
  };
  return response;
};
