# NestJS AWS SQS BolierPlate

## Initialize

### install

```zsh
npm ci
```

### run docker

```zsh
cd ../docker/localstack && docker-compose up --build -d
cd ../docker/mongo && docker-compose up --build -d
```

### run application

```zsh
npm run start:dev
```

## Test

### guest send message to host

```zsh
curl -X GET http://localhost:3000/guest/send/hello
```

```json
{
  "context": "HostController",
  "event": { "message": "hello", "date": "2023-11-03T11:08:57.958Z" }
}
```

### host send message to guest

```zsh
curl -X GET http://localhost:3000/host/send/welcome
```

```json
{
  "context": "GuestController",
  "event": { "message": "welcome", "date": "2023-11-03T11:09:53.536Z" }
}
```
