import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { existsSync } from "fs";
import { join } from "path";

export class UiDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //create the  bucket for storage the ui stuff
    const deploymentBucket = new Bucket(this, "uiDeploymentBucket", {
      bucketName: `space-finder-frontend-dev`.toLowerCase(),
    });

    // the dir of the ui folder
    const uiDir = join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "spacer-finder-frontend",
      "dist"
    );
    // ExistsSync verifies if a path exists
    if (!existsSync(uiDir)) {
      console.warn("Ui dir not found: " + uiDir);
      return;
    }

    new BucketDeployment(this, "SpacesFinderDeployment", {
      destinationBucket: deploymentBucket,
      sources: [Source.asset(uiDir)], //ui directory
    });

    const originIdentity = new OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );
    deploymentBucket.grantRead(originIdentity);

    const distribution = new Distribution(this, "SpacesFinderDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new S3Origin(deploymentBucket, {
          originAccessIdentity: originIdentity,
        }),
      },
    });

    new CfnOutput(this, "SpaceFinderUrl", {
      value: distribution.distributionDomainName,
    });
  }
}
