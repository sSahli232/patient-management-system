export const I_TOKEN_GENERATOR = Symbol('I_TOKEN_GENERATOR');

type Input = {
  key: string;
  expiresIn: number | string;
};

export interface ITokenGenerator {
  generate(input: Input): Promise<string>;
  validate(token: string): Promise<string>;
  decode(token: string): Promise<string>;
}
