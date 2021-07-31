import { CreateAccountDto, LoginDto } from 'types/generated.types';

export const authResolvers = {
  Query: {
    login: (_: any, { email, password }: LoginDto) => {
      console.log(email);
      console.log(password);
      console.log(password);

      // return mock user for now
      return {
        first_name: `John`,
        last_name: `Doe`,
        email: `john@doe.com`,
        created_at: Date.parse(new Date().toString()),
        updated_at: Date.parse(new Date().toString()),
      };
    },
  },
  Mutation: {
    createAccount: (
      _: any,
      { first_name, last_name, email, password, passwordConfirm }: CreateAccountDto
    ) => {
      console.log(first_name);
      console.log(last_name);
      console.log(email);
      console.log(password);
      console.log(passwordConfirm);
      // return mock user for now
      return {
        first_name: `John`,
        last_name: `Doe`,
        email: `john@doe.com`,
        created_at: Date.parse(new Date().toString()),
        updated_at: Date.parse(new Date().toString()),
      };
    },
  },
};
