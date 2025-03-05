import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


export async function getSpaces (event: APIGatewayProxyEvent, dynamodbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    //use a complete scan from our table from the dynamo DB
    const result = await dynamodbClient.send(new ScanCommand({
        // we neeed the table name from it
        TableName: process.env.TABLE_NAME,
    }));

    console.log("Result items " + result.Items);

    return {
        statusCode: 201,
        body: JSON.stringify(result.Items)
    }
} 