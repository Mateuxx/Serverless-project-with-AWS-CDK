import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

//para acessar a lambda de produtos
interface EcommerceApiStackProps extends StackProps {
  productsFetchHanlder: lambdaNodeJS.NodejsFunction;
}

export class EcommerceApiStack extends Stack {
  //proprs passa a ser obrigatorio e recebe a interface que extendr props (pode ter o mesmo comportamento de antes com algo a mais que eu posso colocar)
  constructor(scope: Construct, id: string, props: EcommerceApiStackProps) {
    super(scope, id, props);

    //cria o api gateway
    const apiGateway = new RestApi(this, "EcommerceApiGateway", {
      restApiName: "EcommerceApiGateway",
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
