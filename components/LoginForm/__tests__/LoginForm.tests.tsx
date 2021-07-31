/**
 * @jest-environment jsdom
 */

import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import LoginForm, { errorMessages } from '../LoginForm';
import { ApolloProvider } from '@apollo/client';
import { clientGraphQl } from '../../../utils/clients.utils';

const onSubmit = jest.fn();

describe(`<LoginForm />`, () => {
  it(`should show the proper errors when no values are entered`, async () => {
    render(<LoginForm onSubmit={onSubmit} />);

    userEvent.click(screen.getByRole(`button`));

    await waitFor(async () => {
      expect(await screen.getByText(errorMessages.noEmail)).toBeInTheDocument();
      expect(await screen.getByText(errorMessages.noPassword)).toBeInTheDocument();
      expect(onSubmit).not.toBeCalled();
      expect(onSubmit).toBeCalledTimes(0);
    });
  });

  it(`should show the proper errors when invalid values are entered`, async () => {
    render(<LoginForm onSubmit={onSubmit} />);

    userEvent.type(screen.getByLabelText(`Email`), `invalid email`);
    userEvent.type(screen.getByLabelText(`Password`), `12345`);
    userEvent.click(screen.getByRole(`button`));

    await waitFor(async () => {
      expect(await screen.getByText(errorMessages.invalidEmail)).toBeInTheDocument();
      expect(await screen.getByText(errorMessages.invalidPassword)).toBeInTheDocument();
      expect(onSubmit).not.toBeCalled();
      expect(onSubmit).toBeCalledTimes(0);
    });
  });

  it(`should call the hook with the proper values, then the callback with the hooks resolved value`, async () => {
    render(
      <ApolloProvider client={clientGraphQl}>
        <LoginForm onSubmit={onSubmit} />
      </ApolloProvider>
    );

    userEvent.type(screen.getByLabelText(`Email`), `valid@valid.com`);
    userEvent.type(screen.getByLabelText(`Password`), `123456`);
    userEvent.click(screen.getByRole(`button`));

    await waitFor(async () => {
      Object.values(errorMessages).forEach((message) =>
        expect(screen.queryByText(message)).not.toBeInTheDocument()
      );

      expect(onSubmit).toBeCalledTimes(1);
    });
  });
});
