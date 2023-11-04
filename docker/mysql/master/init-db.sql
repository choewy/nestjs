SET GLOBAL host_cache_size = 0;
SET GLOBAL binlog_expire_logs_seconds = 604800;

CREATE DATABASE IF NOT EXISTS `local`;

CREATE USER 'replica'@'%';
GRANT REPLICATION SLAVE ON *.* TO 'replica'@'%';

FLUSH PRIVILEGES;
