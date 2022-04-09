import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { FaEdit, FaHistory, FaBan, FaToolbox } from 'react-icons/fa'

import AddBoatModal from './AddBoatModal'
import DeleteBoatModal from './DeleteBoatModal'
import DisableBoatModal from './DisableBoatModal'

import SelectMenu from '../../../shared/SelectMenu'
import SelectMenuItem from '../../../shared/SelectMenuItem'

class BoatRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showEditBoatModal: false,
      showDeleteBoatModal: false,
      showDisableBoatModal: false
    }
  }

  render() {
    const { boat } = this.props
    const { showEditBoatModal, showDeleteBoatModal, showDisableBoatModal } = this.state

    return (
      <React.Fragment>
        <AddBoatModal
          boat={boat}
          show={showEditBoatModal}
          onHide={() => this.setState({ showEditBoatModal: false })}
        />

        <DisableBoatModal
          boat={boat}
          show={showDisableBoatModal}
          onHide={() => this.setState({ showDisableBoatModal: false })}
        />

        <DeleteBoatModal
          boat={boat}
          show={showDeleteBoatModal}
          onHide={() => this.setState({ showDeleteBoatModal: false })}
        />

        <tr>
          <td>{boat.name}</td>
          <td>{boat.model}</td>
          <td>{boat.perHourRentalCost}</td>

          <td>
            <SelectMenu variant='outline-dark'>
              <SelectMenuItem
                label='Rental History'
                iconComponent={<FaHistory/>}
                callback={() => this.setState({ showEditBoatModal: true })}
                disabled
              />

              <SelectMenuItem
                label='Edit'
                iconComponent={<FaEdit/>}
                callback={() => this.setState({ showEditBoatModal: true })}
              />

              <SelectMenuItem
                label='Disable'
                iconComponent={<FaToolbox/>}
                callback={() => this.setState({ showDisableBoatModal: true })}
              />

              <SelectMenuItem
                label='Delete'
                iconComponent={<FaBan/>}
                callback={() => this.setState({ showDeleteBoatModal: true })}
              />
            </SelectMenu>
          </td>
        </tr>
      </React.Fragment>
    )
  }
}

BoatRow.propTypes = {
  boat: PropTypes.object
}

export default connect(
  null,
  null
)(BoatRow)
