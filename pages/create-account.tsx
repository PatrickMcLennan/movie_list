import { Container } from '@material-ui/core';
import CreateAccountForm from 'components/CreateAccountForm/CreateAccountForm';
import { User } from 'types/generated.types';

export default function CreateAcccount() {
  const onSubmit = (gqlRes: User) => console.log(gqlRes);
  return (
    <Container maxWidth="md">
      <h1>Log In</h1>
      <CreateAccountForm onSubmit={onSubmit} />
    </Container>
  );
}
