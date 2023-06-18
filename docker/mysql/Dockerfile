FROM mysql:8.0
EXPOSE 3306

ADD ./scripts/* /docker-entrypoint-initdb.d
ADD ./my.cnf /etc/mysql/conf.d/my.cnf

CMD ["mysqld"]