FROM localstack/localstack
EXPOSE 4566

ADD ./scripts/init-aws.sh /etc/localstack/init/ready.d/init-aws.sh
RUN chmod +x /etc/localstack/init/ready.d/init-aws.sh
