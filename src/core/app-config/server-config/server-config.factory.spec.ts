import { NodeEnv } from './enums';
import { InvalidNodeEnvError, InvalidServerHostError, InvalidServerPortError } from './server-config.error';
import { ServerConfigFactory } from './server-config.factory';

describe('ServerConfigFactory', () => {
  const TEST_NODE_ENV = process.env.NODE_ENV;

  describe('Throw Error Case', () => {
    it('환경변수에 NODE_ENV가 없으면 InvalidNodeEnvError 던진다.', () => {
      process.env.NODE_ENV = undefined;

      expect(() => new ServerConfigFactory().env).toThrowError(InvalidNodeEnvError);
    });

    it('환경변수에 NODE_ENV가 있으나, NodeEnv 타입이 아니면 InvalidNodeEnvError 던진다.', () => {
      process.env.NODE_ENV = 'none';

      expect(() => new ServerConfigFactory().env).toThrowError(InvalidNodeEnvError);
    });

    it('환경변수에 SERVER_HOST가 없으면 InvalidServerHostError를 던진다.', () => {
      expect(() => new ServerConfigFactory().host).toThrowError(InvalidServerHostError);
    });

    it('환경변수에 SERVER_PORT가 없으면 InvalidServerPortError를 던진다.', () => {
      expect(() => new ServerConfigFactory().port).toThrowError(InvalidServerPortError);
    });

    it('환경변수에 SERVER_PORT가 있으나, Integer 타입이 아니면 InvalidServerPortError를 던진다.', () => {
      process.env.SERVER_PORT = 'port';

      expect(() => new ServerConfigFactory().port).toThrowError(InvalidServerPortError);
    });
  });

  describe('Return Value Case', () => {
    it('테스트 환경에서는 NODE_ENV가 NodeEnv.TEST로 정의되어야 한다.', () => {
      expect(TEST_NODE_ENV).toEqual(NodeEnv.TEST);
    });

    it('환경변수에 NODE_ENV가 있고, NodeEnv 타입이 맞으면 값을 반환한다.', () => {
      process.env.NODE_ENV = NodeEnv.LOCAL;

      expect(Object.values(NodeEnv)).toContain(new ServerConfigFactory().env);
    });

    it('환경변수에 SERVER_HOST가 있으면 값을 반환한다.', () => {
      process.env.SERVER_HOST = '::';

      expect(new ServerConfigFactory().host).toEqual('::');
    });

    it('환경변수에 SERVER_PORT가 있고, Integer 타입이 맞으면 값을 반환한다.', () => {
      process.env.SERVER_PORT = '3000';

      expect(new ServerConfigFactory().port).toEqual(3000);
    });
  });
});
