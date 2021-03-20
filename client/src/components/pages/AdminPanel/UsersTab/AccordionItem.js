import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'

import { Card, Accordion, Badge, Button } from 'react-bootstrap';
import { FaEnvelope, FaChevronDown } from 'react-icons/fa';
import Switch from 'react-switch';

/**
 * Represents the information and certain toggles for one user
 */
export default class AccordionItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: props.user.is_approved === 1
    }
  }

  get fullName() {
    const { user } = this.props;

    return [user.first_name, user.last_name].filter(Boolean).join(' ');
  }

  get joinedOn() {
    const { created_at } = this.props.user;

    return moment.utc(created_at).format('MM/DD/YY LT');
  }

  get isAdmin() {
    const { user } = this.props;

    return user.is_admin === 1
  }

  showValueOrMissingBadge(value) {
    return value ? value : <Badge variant="secondary">Blank</Badge>
  }

  render() {
    const { user, eventKey } = this.props;
    const { enabled } = this.state;

    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={eventKey} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <img
                src={user.image_url}
                alt=''
                style={{ maxWidth: '2em', height: '2em', marginRight: '1em' }}
              />

              <b>{this.fullName}</b>

              <FaEnvelope/>

              {user.email}

              {this.isAdmin &&
                <Badge
                  variant="danger"
                  style={{ marginLeft: '0.5em' }}
                >
                  Admin
                </Badge>
              }
            </div>

            <FaChevronDown style={{ width: '1.5em', height: '1.5em' }}/>
          </div>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderLeft: '0.5em solid #007bff'
            }}
          >
            <div>
              <b style={{ textDecoration: '3px underline' }}>Joined</b>
              <div>{this.joinedOn}</div>
            </div>

            <div>
              <b style={{ textDecoration: '3px underline' }}>Phone</b>
              <div>{this.showValueOrMissingBadge(user.phone)}</div>

              <b style={{ textDecoration: '3px underline' }}>Job Title</b>
              <div>{this.showValueOrMissingBadge(user.job_title)}</div>

              <b style={{ textDecoration: '3px underline' }}>Affiliation</b>
              <div>{this.showValueOrMissingBadge(user.affiliation)}</div>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '1em' }}>Enabled</span>
                <Switch onChange={() => this.setState({ enabled: !enabled })} checked={enabled} />
              </label>

              <Button variant="primary" style={{ marginTop: '1em' }}>Rentals</Button>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}

AccordionItem.propTypes = {
  user: PropTypes.object,
  eventKey: PropTypes.string
}