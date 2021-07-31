import { Container } from '@material-ui/core';
import { User } from 'types/generated.types';
import LoginForm from '../components/LoginForm/LoginForm';

export default function Login() {
  const onSubmit = (gqlRes: User) => console.log(gqlRes);
  return (
    <Container maxWidth="md">
      <h1>Log In</h1>
      <LoginForm onSubmit={onSubmit} />
    </Container>
  );
}
