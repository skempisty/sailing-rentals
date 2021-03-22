import React from 'react';
import PropTypes from 'prop-types'

import { Card, Accordion, Badge, Button, Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaChevronDown } from 'react-icons/fa';
import Switch from 'react-switch';

import formatDateTime from '../../../../utils/formatDateTime';
import buildFullName from '../../../../utils/buildUserFullName';

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

              <b>{buildFullName(user.first_name, user.last_name)}</b>
            </div>

            <div>
              {this.isAdmin &&
                <Badge
                  variant="danger"
                  style={{ marginRight: '0.5em' }}
                >
                  Admin
                </Badge>
              }

              <FaEnvelope style={{ marginRight: '0.25em' }} />

              {user.email}

              <FaChevronDown style={{ marginLeft: '1em', width: '1.5em', height: '1.5em' }}/>
            </div>
          </div>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body style={{ borderLeft: '0.5em solid #007bff' }}>
            <Container>
              <Row>
                {/* Column 1 */}
                <Col>
                  <b style={{ textDecoration: '3px underline' }}>Joined</b>
                  <div>{formatDateTime(user.created_at)}</div>

                  <b style={{ textDecoration: '3px underline' }}>Phone</b>
                  <div>{this.showValueOrMissingBadge(user.phone)}</div>

                  <b style={{ textDecoration: '3px underline' }}>Job Title</b>
                  <div>{this.showValueOrMissingBadge(user.job_title)}</div>

                  <b style={{ textDecoration: '3px underline' }}>Affiliation</b>
                  <div>{this.showValueOrMissingBadge(user.affiliation)}</div>
                </Col>

                {/* Column 2 */}
                <Col>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '1em' }}>Enabled</span>
                    <Switch onChange={() => this.setState({ enabled: !enabled })} checked={enabled} />
                  </label>

                  <p>
                    <Button variant="primary" style={{ marginTop: '1em' }}>See Rentals</Button>
                  </p>

                  <p>
                    <Button variant="warning" style={{ marginTop: '1em' }}>See Payments</Button>
                  </p>
                </Col>

                {/* Column 3 */}
                <Col>

                </Col>
              </Row>
            </Container>
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