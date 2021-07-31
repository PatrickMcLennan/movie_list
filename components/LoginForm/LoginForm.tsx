import {
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  Input,
  CircularProgress,
  makeStyles,
  Link as MuiLink,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { LoginDto, User, useLoginLazyQuery } from '../../types/generated.types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import Link from 'next/link';

type Props = {
  onSubmit: (login: User) => any;
};

type State = {
  error: boolean;
};

export const errorMessages = {
  noEmail: `An email is required`,
  invalidEmail: `This is an invalid email`,
  noPassword: `A password is required`,
  invalidPassword: `A valid password must be at least 6 characters`,
};

const schema: yup.SchemaOf<LoginDto> = yup.object().shape({
  email: yup.string().email(errorMessages.invalidEmail).required(errorMessages.noEmail),
  password: yup.string().min(6, errorMessages.invalidPassword).required(errorMessages.noPassword),
});

const useStyles = makeStyles(() => ({
  formHelperText: {
    '&, & span': {
      height: `2rem`,
    },
  },
}));

export default function LoginForm({ onSubmit }: Props) {
  const classes = useStyles();
  const [{ error }, setState] = useState<State>({
    error: false,
  });
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<LoginDto>({
    resolver: yupResolver(schema),
  });

  const [attemptLogin, { loading }] = useLoginLazyQuery({
    onCompleted: ({ login }) => onSubmit(login),
    onError: (err) => {
      /**
       * TODO:
       * logic for error handling here
       */
      console.error(err);
      return setState((prevState) => ({ ...prevState, error: true }));
    },
  });

  return (
    <form
      className="login-form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit((user: LoginDto) =>
        attemptLogin({
          variables: {
            user,
          },
        })
      )}
    >
      <Controller
        control={control}
        name="email"
        render={({ field }) => {
          const emailError = errors?.email;
          return (
            <FormControl error={!!emailError}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input {...field} id="email" type="email" />
              <FormHelperText className={classes.formHelperText} aria-hidden={!emailError}>
                {emailError ? emailError.message : ` `}
              </FormHelperText>
            </FormControl>
          );
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => {
          const passwordError = errors.password;
          return (
            <FormControl error={!!passwordError}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input {...field} id="password" type="password" />
              <FormHelperText className={classes.formHelperText} aria-hidden={!passwordError}>
                {passwordError ? passwordError.message : ` `}
              </FormHelperText>
            </FormControl>
          );
        }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Button className="submit" type="submit">
          Log In
        </Button>
      )}
      <Link href="/create-account" passHref>
        <MuiLink>Don&quot;t have an account? Create one here.</MuiLink>
      </Link>
    </form>
  );
}
