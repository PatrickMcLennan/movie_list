import React from 'react';
import GlobalFooter from './GlobalFooter';

export default {
  title: 'Components/GlobalFooter',
  component: GlobalFooter,
  parameters: {
    docs: {
      description: {
        component: 'GlobalFooter',
      },
    },
  },
};
const Template = () => <GlobalFooter />;

export const GlobalFooterStory = Template.bind({});
