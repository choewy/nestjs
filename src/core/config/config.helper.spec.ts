import { ConfigHelper } from './config.helper';
import { NodeEnv } from './enums';

describe('ConfigHelper', () => {
  const JEST_NODE_ENV = process.env.NODE_ENV;

  afterAll(() => {
    process.env.NODE_ENV = JEST_NODE_ENV;
  });

  describe('Check Test Environment', () => {
    it('테스트 환경에서는 NODE_ENV가 NodeEnv.TEST로 정의되어야 한다.', () => {
      expect(ConfigHelper.nodeEnv).toEqual(NodeEnv.TEST);
    });

    it('테스트 환경에서는 envFilePath가 .env.test로 정의되어야 한다.', () => {
      expect(ConfigHelper.envFilePath).toEqual('.env.test');
    });
  });

  describe('Return Value Case', () => {
    it('환경변수에 NODE_ENV가 있고, NodeEnv 타입이 맞으면 값을 반환한다.', () => {
      expect(Object.values(NodeEnv)).toContain(ConfigHelper.nodeEnv);
    });

    it('환경변수에 NODE_ENV가 있고, NodeEnv 타입이 맞으면 값을 반환한다.', () => {
      expect(Object.values(NodeEnv)).toContain(ConfigHelper.nodeEnv);
    });

    it('테스트 환경이 아닌 경우, envFilePath는 .env가 되어야 한다.', () => {
      process.env.NODE_ENV = NodeEnv.LOCAL;

      expect(ConfigHelper.envFilePath).toEqual('.env');
    });
  });
});
