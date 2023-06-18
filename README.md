# NestJS Aws SQS Test with Docker(Local Stack)

## Initialize

### Install

```zsh
npm install
```

### Create `.env` file

```zsh
npm run env
```

### Run local-stack with docker

```zsh
npm run docker
```

### Test

```zsh
npm run test
```

## Structures

### ConfigModule

```mermaid
graph TD;
    NestJSConfigModule --> ConfigModule
    NetsJSConfigServie --> ConfigModule
    ConfigModule --> NestJSConfigService:export
```

### CoreModule

```mermaid
graph TD;
  EventEmitterModule --> CoreModule
  ConfigModule --> CoreModule
  CoreModule --> ConfigModule:export
```

### SystemModule

```mermaid
graph TD;
  EventEmitter2 --> SystemSQSConsumer
  NestJSConfigService --> SystemSQSConsumer
  AwsSQSConsumer <--> SystemSQSConsumer
  SystemSQSConsumer --> SystemModule

  NestJSConfigService --> SystemSQSProducer
  AwsSQSProducer <--> SystemSQSProducer
  SystemSQSProducer --> SystemModule

  SystemSQSProducer --> SystemController
  SystemController --> SystemModule
```

### UserModule

```mermaid
graph TD;
  EventEmitter2 --> UserSQSConsumer
  NestJSConfigService --> UserSQSConsumer
  AwsSQSConsumer <--> UserSQSConsumer
  UserSQSConsumer --> UserModule

  NestJSConfigService --> UserSQSProducer
  AwsSQSProducer <--> UserSQSProducer
  UserSQSProducer --> UserModule

  UserSQSProducer --> UserController
  UserController --> UserModule
```

### RootModule

```mermaid
graph TD;
  CoreModule --> RootModule
  SystemModule --> RootModule
  UserModule --> RootModule

  RootModule --> Application
```

## Logic

### User to System

```zsh
curl -X POST "http://localhost:3000/users"
```

```mermaid
graph TD;
  http://localhost:3000/users --> UserController --> UserProducer --> produce[send to sqs] --> sqs_producer[(user:hello)]

  sqs_consumer[(user:hello)] --> AwsSQSConsumer --> handleMessage --> emit[emit event user:hello]

  SystemConsumer --> onHelloFromUser --> done
```

### System to User

```zsh
curl -X POST "http://localhost:3000/system"
```

```mermaid
graph TD;
  http://localhost:3000/system --> SystemController --> SystemProducer --> produce[send to sqs] --> sqs_producer[(system:welcome)]

  sqs_consumer[(system:welcome)] --> AwsSQSConsumer --> handleMessage --> emit[emit event system:welcome]

  UserConsumer --> onWelcomeFromSystem --> done
```
