import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Dropdown } from 'react-bootstrap'

const StyledDropDownItem = styled.div`
  a.dropdown-item {
    display: flex;
    align-items: center;
    
    span {
      margin-left: 0.5em;
    }
  }
`

/**
 * Use this inside a SelectMenu component only
 */
export default class SelectMenuItem extends React.Component {
  render() {
    const { label, iconComponent, callback } = this.props

    return (
      <StyledDropDownItem>
        <Dropdown.Item onClick={callback}>
          {iconComponent}
          <span>{label}</span>
        </Dropdown.Item>
      </StyledDropDownItem>
    )
  }
}

SelectMenuItem.propTypes = {
  label: PropTypes.string,
  iconComponent: PropTypes.node,
  callback: PropTypes.func
}
