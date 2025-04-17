import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  // id da funcção lambda e tals - identifica unicamente a requisição pela api gateway
  const lambdaRequestId = context.awsRequestId;
  const mehtod = event.httpMethod;
  if (event.resource === "/produtcs") {
    if (mehtod === "GET") {
      console.log("GET");
    }
    return {
      statusCode: 200, //OK
      body: JSON.stringify({
        message: "GET products - OK",
      }),
    };
  }

  return {
    statusCode: 400, // bad request,
    body: JSON.stringify({
      message: "Bad request",
    }),
  };
}
