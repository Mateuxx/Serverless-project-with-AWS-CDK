import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

//API Gateway 
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
    }
}