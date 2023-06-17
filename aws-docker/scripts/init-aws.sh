#!/usr/bin/env bash

aws --region us-east-1 --endpoint-url=http://localhost:4566 sqs create-queue \
  --queue-name user-queue.fifo\
  --attributes FifoQueue=true

aws --region us-east-1 --endpoint-url=http://localhost:4566 sqs create-queue \
  --queue-name system-queue.fifo\
  --attributes FifoQueue=true