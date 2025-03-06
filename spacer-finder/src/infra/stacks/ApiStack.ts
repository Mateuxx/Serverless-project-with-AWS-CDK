import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

//API Gateway 
/*
This file defines the API Gateway stack in AWS CDK. Let me break it down:

1. The ApiStack creates a REST API using AWS API Gateway
2. It receives a LambdaIntegration as a prop, which connects the API to our Lambda function
3. The flow works like this:
   - Client makes HTTP request to API Gateway endpoint
   - API Gateway forwards request to the connected Lambda function
   - Lambda processes request and sends response back through API Gateway to client

Key parts:
- RestApi creates the API Gateway instance
- api.root.addResource('spaces') creates the /spaces endpoint
- addMethod() connects HTTP methods (GET/POST/PUT/DELETE) to our Lambda
- props.spacesLambdaIntegration links the Lambda function that will handle requests

This creates a fully serverless API where API Gateway triggers our Lambda function
for each incoming request to process the CRUD operations on our DynamoDB table.
*/

interface ApiStackProps extends StackProps {
    spacesLambdaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {

    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        // Data stack resources
        const api = new RestApi(this, 'SpacesApi')
        
        // add a resource by hand
        const SpacesResource = api.root.addResource('spaces');

        SpacesResource.addMethod('GET', props.spacesLambdaIntegration)
        SpacesResource.addMethod('POST', props.spacesLambdaIntegration)
        SpacesResource.addMethod('PUT', props.spacesLambdaIntegration)
        SpacesResource.addMethod('DELETE', props.spacesLambdaIntegration)
    }
}