FROM localstack/localstack

EXPOSE 4566 4572

ADD ./scripts/init.sh /etc/localstack/init/ready.d/init-aws.sh
RUN chmod +x /etc/localstack/init/ready.d/init-aws.sh
