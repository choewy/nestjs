#!/bin/bash

cd docker

cd mysql && docker-compose up --build -d && cd ..
cd mongo && docker-compose up --build -d && cd ..
cd redis && docker-compose up --build -d && cd ..
cd localstack && docker-compose up --build -d && cd ..

exit 0