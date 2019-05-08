import React from 'react';
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import ListItem from '../ListItem';
import './RepeatableList.scss';

 const RepeatableList = (props) => {
  const renderRepeatable = (item, index) => {
    return (
      <ListItem
        key={item._id}
        index={index}
        {...item}
      >
      </ListItem>
    );
  };

  return (
    <>
      {
        !!props.activeRepeatables.length && <span styleName="status">Active</span>
      }
      <div styleName="repeatable-list">
        {props.activeRepeatables.map(renderRepeatable)}
      </div>
      {
        !!props.inactiveRepeatables.length && <span styleName="status">Inactive</span>
      }
      <div styleName="repeatable-list">
        {props.inactiveRepeatables.map(renderRepeatable)}
      </div>
    </> 
  );
};

const query = gql`
  query Repeatables {
    repeatables {
      _id,
      title,
      frequency,
      status,
      startTime
    }
  }
`;

const queryConfig = {
  props: ({ data: { loading, repeatables = [] } }) => ({
    loading,
    activeRepeatables: repeatables.filter(item => item.status === 'active'),
    inactiveRepeatables: repeatables.filter(item => item.status === 'inactive')
  })
};

const withGraphql = graphql(query, queryConfig);

export default compose(React.memo, withGraphql, withRouter)(RepeatableList);
