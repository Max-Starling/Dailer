import { Fragment, useState } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import cx from 'classnames';
/** @jsx jsx */
import { jsx } from '@emotion/core';

import Timer from 'static/timer.js';
import DetailsModal from '../DetailsModal';
import ConfirmModal from 'components/ConfirmModal';
import calculateTimerData from 'helpers/calculateTimerData';
import './ListItem.scss';

const ListItem = ({
  _id,
  title,
  status,
  startTime,
  frequency,
  updateStartTime,
}) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const toggleDetailsVisibility = () => setIsDetailsVisible(!isDetailsVisible);

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const { angle, color, remainingTime } = calculateTimerData(startTime, frequency);

  const onTimerClick = (event) => {
    event.stopPropagation();
    toggleConfirmVisibility();
  };

  const onConfirmSubmit = () => {
    toggleConfirmVisibility();
    updateStartTime({
      variables: {
        _id,
        startTime: (new Date()).toISOString(),
      },
    });
  };

  const itemStyles = cx({
    item: true,
    'item--inactive': status !== 'active',
  });

  return (
    <Fragment>
      <div
        styleName={itemStyles}
        onClick={toggleDetailsVisibility}
        css={theme => ({
          color: theme.textColor, 
          ...theme.listItem,
        })}
      >
        {title}
        {
          status === 'active' &&
            <div
              styleName="item__timer"
              onClick={onTimerClick}
            >
              <Timer
                id={_id}
                angle={angle}
                color={color}
              />
              <p
                styleName="item__remaining-time"
                css={{ color }}
              >
                {remainingTime}
              </p>
            </div>
        }
      </div>
      <DetailsModal
        isVisible={isDetailsVisible}
        toggleVisibility={toggleDetailsVisibility}
        _id={_id}
        title={title}
        frequency={frequency}
        status={status}
      />
      <ConfirmModal
        isVisible={isConfirmVisible}
        toggleVisibility={toggleConfirmVisibility}
        text="Have you really finished this task and want to refresh the timer?"
        onSubmit={onConfirmSubmit}
      />
    </Fragment>
  );
};

const query = gql`
  mutation($_id: ID!, $startTime: String) {
    updateRepeatable(_id: $_id, startTime: $startTime) {
      _id,
      title,
      frequency,
      status,
      startTime
    }
  }
`;

const queryConfig = {
  name: 'updateRepeatable',
  options: {
    refetchQueries: ['Repeatables'],
  },
};

export default graphql(query, queryConfig)(ListItem);

