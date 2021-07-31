import {
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  Input,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { User, CreateAccountDto, useCreateAccountMutation } from '../../types/generated.types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

type Props = {
  onSubmit: (createAccount: User) => any;
};

type State = {
  error: boolean;
};

export const errorMessages = {
  noFirstName: `A first name is required`,
  noLastName: `A last name is required`,
  noEmail: `An email is required`,
  invalidEmail: `This is an invalid email`,
  noPassword: `A password is required`,
  invalidPassword: `A valid password must be at least 6 characters`,
  invalidConfirm: `Your password confirmation doesn't match your password`,
  noConfirm: `Confirm your password here`,
};

const schema: yup.SchemaOf<CreateAccountDto> = yup.object().shape({
  first_name: yup.string().required(errorMessages.noFirstName),
  last_name: yup.string().required(errorMessages.noLastName),
  email: yup.string().email(errorMessages.invalidEmail).required(errorMessages.noEmail),
  password: yup.string().min(6, errorMessages.invalidPassword).required(errorMessages.noPassword),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref(`password`)], errorMessages.invalidConfirm)
    .required(errorMessages.noConfirm),
});

const useStyles = makeStyles(() => ({
  formHelperText: {
    '&, & span': {
      height: `2rem`,
      minHeight: `2rem`,
    },
  },
}));

export default function CreateAccountForm({ onSubmit }: Props) {
  const classes = useStyles();
  const [{ error }, setState] = useState<State>({
    error: false,
  });
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateAccountDto>({
    resolver: yupResolver(schema),
  });

  const [attemptCreateUser, { loading }] = useCreateAccountMutation({
    onCompleted: ({ createAccount }) => onSubmit(createAccount),
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
      onSubmit={handleSubmit((newUser: CreateAccountDto) =>
        attemptCreateUser({
          variables: {
            newUser,
          },
        })
      )}
    >
      <Controller
        control={control}
        name="first_name"
        render={({ field }) => {
          const firstNameError = errors?.first_name;
          return (
            <FormControl error={!!firstNameError}>
              <InputLabel htmlFor="first_name">First Name</InputLabel>
              <Input {...field} id="first_name" type="text" />
              <FormHelperText className={classes.formHelperText} aria-hidden={!firstNameError}>
                {firstNameError ? firstNameError.message : ` `}
              </FormHelperText>
            </FormControl>
          );
        }}
      />
      <Controller
        control={control}
        name="last_name"
        render={({ field }) => {
          const lastNameError = errors.last_name;
          return (
            <FormControl error={!!lastNameError}>
              <InputLabel htmlFor="last_name">Last Name</InputLabel>
              <Input {...field} id="last_name" type="text" />
              <FormHelperText className={classes.formHelperText} aria-hidden={!lastNameError}>
                {lastNameError ? lastNameError.message : ` `}
              </FormHelperText>
            </FormControl>
          );
        }}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => {
          const emailError = errors.email;
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
      <Controller
        control={control}
        name="passwordConfirm"
        render={({ field }) => {
          const passwordConfirmError = errors.passwordConfirm;
          return (
            <FormControl error={!!passwordConfirmError}>
              <InputLabel htmlFor="passwordConfirm">Confirm Password</InputLabel>
              <Input {...field} id="passwordConfirm" type="password" />
              <FormHelperText className={classes.formHelperText} aria-hidden={!passwordConfirmError}>
                {passwordConfirmError ? passwordConfirmError.message : ` `}
              </FormHelperText>
            </FormControl>
          );
        }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Button className="submit" type="submit">
          Create Account
        </Button>
      )}
    </form>
  );
}
