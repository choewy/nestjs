#!/usr/bin/env bash

aws --endpoint-url=http://localhost:4566 sqs create-queue\
  --queue-name queue-local-1.fifo\
  --attributes FifoQueue=true

aws --endpoint-url=http://localhost:4566 sqs create-queue\
  --queue-name queue-local-2.fifo\
  --attributes FifoQueue=true

exit 0