#!/usr/bin/env bash

# Create S3 Bucket
aws --endpoint-url=http://localhost:4566 s3 mb s3://assets

# Create SQS FIFO Queue
aws --endpoint-url=http://localhost:4566 sqs create-queue\
  --queue-name user-queue.fifo\
  --attributes FifoQueue=true

aws --endpoint-url=http://localhost:4566 sqs create-queue\
  --queue-name system-queue.fifo\
  --attributes FifoQueue=true