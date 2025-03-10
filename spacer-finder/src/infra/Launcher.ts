import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { ApiStack } from "./stacks/ApiStack";
import { LambdaStack } from "./stacks/LamdaStack";

// Main CDK app configuration file that:
// - Creates DynamoDB table (DataStack)
// - Sets up Lambda functions (LambdaStack) 
// - Configures API Gateway (ApiStack)
// All stacks are connected to work together as a serverless API


const app = new App();

const dataStack = new DataStack (app, 'DataStack');
const lambdaStack = new LambdaStack(app, "LambdaStack", {
    spacesTable: dataStack.spacesTable
}) 

new ApiStack  (app, 'ApiStack',{
    spacesLambdaIntegration: lambdaStack.spacesLambdaIntegration
})

