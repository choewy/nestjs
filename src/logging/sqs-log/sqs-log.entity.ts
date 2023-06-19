import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SQSLogStatus } from './enums';

@Entity()
export class SQSLog {
  public static pendingOf(uuid: string, producer: string, subject: string, data: object) {
    const e = new SQSLog();

    e.uuid = uuid;
    e.producer = producer;
    e.subject = subject;
    e.data = JSON.stringify(data);
    e.status = SQSLogStatus.PENDING;

    return e;
  }

  public static sendOkOf(messageId: string) {
    const e = new SQSLog();

    e.messageId = messageId;
    e.status = SQSLogStatus.SEND_OK;
    e.sendedAt = new Date();

    return e;
  }

  public static sendFailOf(error: any) {
    const e = new SQSLog();

    e.error = JSON.stringify(error);
    e.status = SQSLogStatus.SEND_FAIL;
    e.failedAt = new Date();

    return e;
  }

  public static consumeOkOf(consumer: string) {
    const e = new SQSLog();

    e.consumer = consumer;
    e.status = SQSLogStatus.CONSUME_OK;
    e.consumedAt = new Date();

    return e;
  }

  public static consumeFailOf(consumer: string, error: any) {
    const e = new SQSLog();

    e.consumer = consumer;
    e.error = JSON.stringify(error);
    e.status = SQSLogStatus.CONSUME_FAIL;
    e.failedAt = new Date();

    return e;
  }

  public static processingOkOf() {
    const e = new SQSLog();

    e.status = SQSLogStatus.PROCESSING_OK;
    e.processedAt = new Date();

    return e;
  }

  public static processingFailOf(error: any) {
    const e = new SQSLog();

    e.error = JSON.stringify(error);
    e.status = SQSLogStatus.PROCESSING_FAIL;
    e.failedAt = new Date();

    return e;
  }

  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  uuid: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  messageId: string;

  @Column({ type: 'varchar', length: 50 })
  producer: string;

  @Column({ type: 'varchar', length: 100 })
  subject: string;

  @Column({ type: 'varchar', length: 5012, nullable: true })
  data: string;

  @Column({ type: 'varchar', length: 5012, nullable: true })
  error: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  consumer: string | null;

  @Column({ type: 'enum', enum: SQSLogStatus })
  status: SQSLogStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  sendedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  consumedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  processedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  failedAt: Date | null;
}
