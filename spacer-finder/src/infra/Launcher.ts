import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { ApiStack } from "./stacks/ApiStack";
import { LambdaStack } from "./stacks/LamdaStack";

const app = new App();

const dataStack = new DataStack (app, 'DataStack');
const lambdaStack = new LambdaStack(app, "LambdaStack", {
    spacesTable: dataStack.spacesTable
}) 

new ApiStack  (app, 'ApiStack',{
    spacesLambdaIntegration: lambdaStack.spacesLambdaIntegration
})


