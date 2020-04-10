import React from 'react';

import { Container, Message, Divider, Grid } from 'semantic-ui-react';

import TeamCreateForm from '../components/team/TeamCreateForm.jsx';

const Inset = ({ children }) => (
  <Grid columns="3">
    <Grid.Row>
      <Grid.Column width={1} />
      <Grid.Column width={14}>
        {children}
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid.Row>
  </Grid>
);

const IndexPage = () => (
  <div>
    <Inset>
      <Message>
        <Message.Header>Welcome to the fossil tracker!</Message.Header>
        <Message.Content>
          If you'd like to create a team to track fossils with your friends, use the form below to get started. Once
          you've created a team, you'll be given a Secret URL. You'll need that URL to access your team's page later,
          so make sure you remember it. Anyone with the link can make changes to your team, so keep it safe!
        </Message.Content>
      </Message>
    </Inset>
    <Inset>
      <TeamCreateForm />
    </Inset>
    <Divider />
    <p>
      Created by Alex Forsythe, just for fun.
    </p>
    <ul>
      <li>View the source on GitHub: <a href="https://github.com/awforsythe/fossils">https://github.com/awforsythe/fossils</a></li>
      <li>Email me: <a href="mailto:awforsythe@gmail.com">awforsythe@gmail.com</a></li>
    </ul>
  </div>
);

export default IndexPage;
