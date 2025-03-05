import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb"; 
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


export async function getSpaces (event: APIGatewayProxyEvent, dynamodbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    //if i have a query string parameters i enter here 
    if (event.queryStringParameters) {
        
        //if we have a query string parameters, we will print it
        console.log("Query string parameters: " + JSON.stringify(event.queryStringParameters))

        // if id is in the query string parameters, we will get the id
        if ("id" in event.queryStringParameters) { 

            // i get the id from the query string parameters
            const spaceId = event.queryStringParameters["id"];

            // i get the item from the dynamo DB (this is basically our query)
            const getItemResponse = await dynamodbClient.send(new GetItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    "id": {
                        S: spaceId
                    }
                }
            }))

            // if the item is found, we will return the item
            if (getItemResponse.Item) {

                // we unmarshall the item from dynamo DB format to JS format
                const unmarshallItem  = unmarshall(getItemResponse.Item);
                return {
                    statusCode: 200, // 200 is ok
                    body: JSON.stringify(unmarshallItem) // we return the unmarshalled item
                };
            } else {
                return {
                    statusCode: 404, // 404 is not found
                    body: JSON.stringify(`Space with id ${spaceId} not found`)
                };
            }
        } else {
            return{
                statusCode: 400, // 400 is bad request
                body: JSON.stringify("Id required!")
            }
        }
        
    } else {
        console.log("No query string parameters")
    }

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