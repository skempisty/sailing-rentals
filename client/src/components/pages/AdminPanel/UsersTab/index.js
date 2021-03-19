import React from 'react';
import { connect } from 'react-redux';

import { Accordion } from 'react-bootstrap';

import AccordionItem from './AccordionItem';

class UsersTab extends React.Component {
  render() {
    const { users } = this.props;

    return (
      <React.Fragment>
        <Accordion>
          {users.map((user, index) =>
            <AccordionItem
              key={`accordion-item-${user.id}-${index}`}
              user={user}
              eventKey={String(index)}
            />
          )}
        </Accordion>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { users } = state.general;

  return { users };
};

export default connect(
  mapStateToProps,
  null
)(UsersTab);
