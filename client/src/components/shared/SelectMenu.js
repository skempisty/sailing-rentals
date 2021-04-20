import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Dropdown } from 'react-bootstrap'
import { FaEllipsisH } from 'react-icons/fa'

const StyledDropDownToggle = styled.div`
  button {
    display: flex;
    align-items: center;
    height: 2em;
    
    &:after {
      display: none;
    }
  }
`

export default class SelectMenu extends React.Component {
  render() {
    const { variant, children } = this.props

    return (
      <Dropdown alignRight>
        <StyledDropDownToggle>
          <Dropdown.Toggle variant={variant}>
            <FaEllipsisH/>
          </Dropdown.Toggle>
        </StyledDropDownToggle>

        <Dropdown.Menu>{children}</Dropdown.Menu>
      </Dropdown>
    )
  }
}

SelectMenu.propTypes = {
  variant: PropTypes.string, // bootstrap btn color variant https://react-bootstrap.github.io/components/buttons/
  children: PropTypes.node // children must be SelectMenuItem components
}
