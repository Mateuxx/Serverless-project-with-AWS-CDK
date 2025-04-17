import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Context } from "aws-lambda";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";


const s3Client = new S3Client({})

// We receive a http event by the api gateway(GET OR POST)
async function handler (event: APIGatewayProxyEvent, context: Context) {

    const command = new ListBucketsCommand({})
    
    //await to literally wait for the promisse of the asynchronus operation from the request by AWS S3 client.
    //get the buckets from the aws resource 
    const listBucketResult = (await s3Client.send(command)).Buckets;
    
    // The result from the request with the right format that AWS expect (back to the client)
    const response: APIGatewayProxyResultV2 = {
        statusCode: 200,
        body: JSON.stringify('Hello from lambda! here are ur lambdas: ' + JSON.stringify(listBucketResult))
    }
    console.log(event)
    
    return response;
}

export {handler}

