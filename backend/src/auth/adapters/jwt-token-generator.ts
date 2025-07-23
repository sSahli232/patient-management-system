import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { ITokenGenerator } from '../ports/token-generator.interface';

export class JwtTokenGenerator implements ITokenGenerator {
  constructor(private readonly secret: string) {}

  async generate({
    key,
    expirationInMs,
  }: {
    key: string;
    expirationInMs: number;
  }): Promise<string> {
    const exirationInSeconds = expirationInMs / 1000;

    return sign({ key }, this.secret, { expiresIn: exirationInSeconds });
  }

  async validate(token: string): Promise<string> {
    const payload = verify(token, this.secret) as JwtPayload;

    return payload.key;
  }
}
