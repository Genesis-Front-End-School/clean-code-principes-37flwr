import { fancyTimeFormat } from '../formatters';

describe('formatter functions', () => {
  describe('fancy format', () => {
    it('should return only seconds', () => {
      const response = fancyTimeFormat(30);

      expect(response).toEqual('0:30');
    });

    it('should return minutes and seconds', () => {
      const response = fancyTimeFormat(63);

      expect(response).toEqual('1:03');
    });

    it('should return hours, minutes and seconds', () => {
      const response = fancyTimeFormat(3663);

      expect(response).toEqual('1:01:03');
    });

    it('should return hours, minutes (10+) and seconds', () => {
      const response = fancyTimeFormat(4203);

      expect(response).toEqual('1:10:03');
    });
  });
});
