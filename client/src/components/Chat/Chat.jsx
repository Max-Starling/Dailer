import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import Input from 'components/Input';
import Button from 'components/Button';

const Chat = ({
  data,
  createMessage,
}) => {
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState('');

  useEffect(() => {
    console.log('DATA', data.messageAdded);
  }, [data.messageAdded]);

  const sendMessage = () => {
    createMessage({
      variables: {
        receiver,
        text: message,
      },
    });
  };

  return (
    <>
      {/* <div>
        chat
      </div> */}
      <Input
        label="To"
        value={receiver}
        onChange={e => setReceiver(e.target.value)}
      />
      <Input
        label="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button
        text="Send"
        onClick={sendMessage}
      />
    </>
  );
};

const mutation = gql`
  mutation ($receiver: String!, $text: String!) {
    createMessage(receiver: $receiver, text: $text) {
      _id
      text
      sender
      receiver
    }
  }
`;

const mutationConfig = {
  name: 'createMessage',
  // options: {
  //   refetchQueries: ['Repeatables'],
  // },
};

const withMutation = graphql(mutation, mutationConfig);

const subscription = gql`
  subscription onMessageAdded {
    messageAdded {
      text
      time
      sender
      receiver
    }
  }
`;

const subscriptionConfig = {
  props: ({ data, loading }) => ({
    data,
    loading,
  }),
};

const withSubscription = graphql(subscription, subscriptionConfig);

export default compose(withRouter, withMutation, withSubscription)(Chat);
