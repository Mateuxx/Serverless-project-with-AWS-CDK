### AWS CDK 
- AWS CDK -> Cloud Development Kit
- We can write in programming language to write aws resources and cloudFormation templates so aws can run 

### AWS Serverless 
- Com Serverless, você só paga pelo tempo de execução do código e não se preocupa com infraestrutura.
- AWS will take care of scalability and other stuffs like that 

### AWS LAMBDA
- A basic piece of code wich can be run on demand(**AWS only will execute when its receive a request**)
- the heart of a serverless archicture

### AWS API Gateway 
- A Resource that let us do some requests( REST api or HTTP) over some resources that we have in our aws account.

### DynamoDB 
- A Database Nosql from aws, great for: low latency, high performance and scabillity 

###  NodejsFunction CCDK construct 
![alt text](image.png)

### AWS Lambda Architecture 
![alt text](image-1.png)

From a basic point of view of a basic serverles application, we have: 

#### What if we extending a application 

- 1. Multiple lambdas:
  - ![alt text](image-2.png)
  - deploy independently
  - **easier to log and monitor**

- 2. Group by Gateway Resource 
  - Which means that all the methods will be in one lambda for the things for a API Gateway 
  - ![alt text](image-3.png)

- 3. Monolithic Lambda
  - All in a one single Lambda
  - Not the recommendation by AWS

- **Just a reminder: pay attention to Cold start for lambda!**