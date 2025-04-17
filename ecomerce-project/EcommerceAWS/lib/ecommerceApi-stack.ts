import { Stack, StackProps } from "aws-cdk-lib";
import {
  AccessLogFormat,
  LambdaIntegration,
  LogGroupLogDestination,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs";
import { LogGroup } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

//para acessar a lambda de produtos
interface EcommerceApiStackProps extends StackProps {
  productsFetchHanlder: lambdaNodeJS.NodejsFunction;
}

export class EcommerceApiStack extends Stack {
  //proprs passa a ser obrigatorio e recebe a interface que extendr props (pode ter o mesmo comportamento de antes com algo a mais que eu posso colocar)
  constructor(scope: Construct, id: string, props: EcommerceApiStackProps) {
    super(scope, id, props);

    const logGroup = new LogGroup(this, "EcommerceApiGatewayLogs");

    //cria o api gateway
    const apiGateway = new RestApi(this, "EcommerceApiGateway", {
      restApiName: "EcommerceApiGateway",
      cloudWatchRole: true,
      deployOptions: {
        accessLogDestination: new LogGroupLogDestination(logGroup), //onde o api gateway deve gerar os logs
        //logs configs
        accessLogFormat: AccessLogFormat.jsonWithStandardFields({
          httpMethod: true,
          ip: true,
          protocol: true,
          requestTime: true,
          resourcePath: true,
          responseLength: true,
          status: true,
          caller: true,
          user: true,
        }),
      },
    });

    //cria a integração da api gateway com a lambda de products
    // assim que nos configuramos a api gateway para invocar
    const productsFechtIntegration = new LambdaIntegration(
      props.productsFetchHanlder
    );

    //"/produtcs"
    const productsResource = apiGateway.root.addResource("products");
    productsResource.addMethod("GET", productsFechtIntegration);
  }
}
