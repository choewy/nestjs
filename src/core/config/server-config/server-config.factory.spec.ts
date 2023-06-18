import { InvalidServerHostError, InvalidServerPortError } from './server-config.error';
import { ServerConfigFactory } from './server-config.factory';

const SERVER_HOST = '::';
const SERVER_PORT = '3000';

describe('ServerConfigFactory', () => {
  describe('Throw Error Case', () => {
    it('환경변수에 SERVER_HOST가 없으면 InvalidServerHostError를 던진다.', () => {
      expect(() => new ServerConfigFactory({ SERVER_PORT })).toThrowError(InvalidServerHostError);
    });

    it('환경변수에 SERVER_PORT가 없으면 InvalidServerPortError를 던진다.', () => {
      expect(() => new ServerConfigFactory({ SERVER_HOST })).toThrowError(InvalidServerPortError);
    });

    it('환경변수에 SERVER_PORT가 있으나, Integer 타입이 아니면 InvalidServerPortError를 던진다.', () => {
      expect(() => new ServerConfigFactory({ SERVER_HOST, SERVER_PORT: 'port' })).toThrowError(InvalidServerPortError);
    });
  });

  describe('Return Value Case', () => {
    it('환경변수에 SERVER_*가 있으면 ServerConfigFactory 인스턴르를 반환한다.', () => {
      expect(new ServerConfigFactory({ SERVER_HOST, SERVER_PORT })).toBeInstanceOf(ServerConfigFactory);
    });
  });
});
