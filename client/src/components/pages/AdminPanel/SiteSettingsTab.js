import React from 'react'
import { connect } from 'react-redux'

import { Button, Form, Alert } from 'react-bootstrap'

import VanishingAlert from '../../shared/VanishingAlert';

import updateSettings from '../../../api/updateSettings'

import { initSettings } from '../../../store/settings'

class SiteSettingsTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initialState
  }

  get initialState() {
    const {
      settings: {
        min_rental_hours,
        max_rental_hours
      }
    } = this.props

    return {
      minRentalHours: min_rental_hours,
      maxRentalHours: max_rental_hours,
      showSettingsUpdateSuccess: false
    }
  }

  get currentSettings() {
    const { minRentalHours, maxRentalHours } = this.state

    return {
      min_rental_hours: minRentalHours,
      max_rental_hours: maxRentalHours
    }
  }

  async handleSaveSettingsClick() {
    const { initSettings } = this.props
    const { showSettingsUpdateSuccess } = this.state

    const updatedSettings = await updateSettings(this.currentSettings)

    initSettings({ settings: updatedSettings })

    this.setState({ showSettingsUpdateSuccess: !showSettingsUpdateSuccess })
  }

  render() {
    const { minRentalHours, maxRentalHours, showSettingsUpdateSuccess } = this.state

    return (
      <div style={{ color: 'white' }}>
        <Alert variant='warning'>
          <div><b>No Validation Warning!</b></div>

          <div>Please follow any input instructions on each individual setting. Improper setting values can 'break' the site.</div>

          <div style={{ textDecoration: 'underline' }}>Don't touch if you don't know what you're doing!</div>
        </Alert>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1em'
          }}
        >
          <h3 style={{ color: 'white', margin: '0' }}>Site Settings</h3>

          <div style={{ display: 'flex' }}>
            <VanishingAlert
              variant='success'
              margin='0 1em 0 0'
              padding='0.35em 0.75em'
              showStart={showSettingsUpdateSuccess}
            >
              Settings Updated!
            </VanishingAlert>

            <Button
              variant='primary'
              onClick={this.handleSaveSettingsClick.bind(this)}
            >
              Save
            </Button>
          </div>
        </div>

        <Form>
          <Form.Group>
            <Form.Label><b>Allowed Rental Interval</b></Form.Label>

            <Alert variant='info' style={{ maxWidth: '17em' }}>
              <ul style={{ marginBottom: '0', paddingLeft: '0.5em' }}>
                <li>Use integers</li>
                <li>Both greater than zero</li>
                <li>Min less than or equal to Max</li>
              </ul>
            </Alert>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Control
                type='number'
                placeholder='Min'
                value={minRentalHours}
                onChange={(e) => this.setState({ minRentalHours: e.target.value })}
                style={{ maxWidth: '5em' }}
              />

              <span style={{ margin: '0 0.5em' }}>to</span>

              <Form.Control
                type='number'
                placeholder='Max'
                value={maxRentalHours}
                onChange={(e) => this.setState({ maxRentalHours: e.target.value })}
                style={{ maxWidth: '5em' }}
              />

              <span style={{ marginLeft: '0.5em' }}>hours</span>
            </div>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { settings } = state.settings

  return { settings }
}

const mapDispatchToProps = {
  initSettings
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteSettingsTab)
