import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import Input from 'components/Input';
import Button from 'components/Button';

const Chat = ({
  loading,
  data,
  createMessage,
}) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('DATA', data);
  }, [data.messageAdded]);

  const sendMessage = () => {
    createMessage({
      variables: {
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

const queryMut = gql`
  mutation ($text: String!) {
    createMessage(text: $text) {
      _id
      text
    }
  }
`;

const queryMutConfig = {
  name: 'createMessage',
  // options: {
  //   refetchQueries: ['Repeatables'],
  // },
};

const withMutation = graphql(queryMut, queryMutConfig);

const querySub = gql`
  subscription onMessageAdded {
    messageAdded {
      text
      time
      sender
    }
  }
`;

const querySubConfig = {
  props: ({ data, loading }) => ({
    data,
    loading,
  })
};

const withSubscription = graphql(querySub, querySubConfig);

export default compose(withRouter, withMutation, withSubscription)(Chat);
