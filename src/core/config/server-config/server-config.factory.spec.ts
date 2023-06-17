import { InvalidServerHostError, InvalidServerPortError } from './server-config.error';
import { ServerConfigFactory } from './server-config.factory';

describe('ServerConfigFactory', () => {
  describe('Throw Error Case', () => {
    it('환경변수에 SERVER_HOST가 없으면 InvalidServerHostError를 던진다.', () => {
      expect(() => new ServerConfigFactory({}).host).toThrowError(InvalidServerHostError);
    });

    it('환경변수에 SERVER_PORT가 없으면 InvalidServerPortError를 던진다.', () => {
      expect(() => new ServerConfigFactory({}).port).toThrowError(InvalidServerPortError);
    });

    it('환경변수에 SERVER_PORT가 있으나, Integer 타입이 아니면 InvalidServerPortError를 던진다.', () => {
      expect(() => new ServerConfigFactory({ SERVER_PORT: 'port' }).port).toThrowError(InvalidServerPortError);
    });
  });

  describe('Return Value Case', () => {
    it('환경변수에 SERVER_HOST가 있으면 값을 반환한다.', () => {
      expect(new ServerConfigFactory({ SERVER_HOST: '::' }).host).toEqual('::');
    });

    it('환경변수에 SERVER_PORT가 있고, Integer 타입이 맞으면 값을 반환한다.', () => {
      expect(new ServerConfigFactory({ SERVER_PORT: '3000' }).port).toEqual(3000);
    });
  });
});
