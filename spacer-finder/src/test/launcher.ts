import { handler } from "../service/spaces/handler";


// this is a test to see if the handler is working
// This is a test file that simulates an API Gateway request to our Lambda function
// We're importing the handler function from our spaces service
// The handler function expects an APIGatewayProxyEvent and a Context object
// We're using 'as any' to type cast since we're not providing all required properties
// This allows us to test the handler locally without setting up a full API Gateway event


process.env.TABLE_NAME = 'SpaceStack';
process.env.AWS_REGION = 'us-east-2';

handler({
    httpMethod: 'DELETE',
    queryStringParameters: {
        id: '83afc83d-d3f2-4f3c-b37c-b20920fcaa1b'
    },
    // body: JSON.stringify({
    //     location: 'Brasil updated'
    // })
} as any, {} as any)
    