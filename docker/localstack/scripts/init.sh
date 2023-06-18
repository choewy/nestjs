#!/usr/bin/env bash

aws --endpoint-url=http://localhost:4566 sqs create-queue\
  --queue-name user-queue.fifo\
  --attributes FifoQueue=true

aws --endpoint-url=http://localhost:4566 sqs create-queue\
  --queue-name system-queue.fifo\
  --attributes FifoQueue=true