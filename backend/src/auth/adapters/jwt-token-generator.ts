import { sign, verify, JwtPayload, decode } from 'jsonwebtoken';
import { ITokenGenerator } from '../ports/token-generator.interface';

export class JwtTokenGenerator implements ITokenGenerator {
  constructor(private readonly secret: string) {}

  async generate({
    key,
    expiresIn,
  }: {
    key: string;
    expiresIn: number;
  }): Promise<string> {
    const exiration = expiresIn;

    return sign({ key }, this.secret, { expiresIn: exiration });
  }

  async validate(token: string): Promise<string> {
    const payload = verify(token, this.secret) as JwtPayload;

    return payload.key;
  }

  async decode(token: string): Promise<string> {
    const result = decode(token) as string;
    return result;
  }
}
