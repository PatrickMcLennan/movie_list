import React from 'react';
import CreateAccountForm from './CreateAccountForm';

export default {
  title: 'Components/CreateAccountForm',
  component: CreateAccountForm,
  parameters: {
    docs: {
      description: {
        component: 'CreateAccountForm',
      },
    },
  },
};
const Template = () => <CreateAccountForm onSubmit={console.log} />;

export const CreateAccountFormStory = Template.bind({});
