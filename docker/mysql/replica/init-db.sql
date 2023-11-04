SET GLOBAL host_cache_size = 0;
SET GLOBAL binlog_expire_logs_seconds = 604800;

CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='mysql-master',
  SOURCE_LOG_FILE='mysql-bin.000001',
  SOURCE_LOG_POS=0,
  SOURCE_SSL=0;

START REPLICA USER='replica';
