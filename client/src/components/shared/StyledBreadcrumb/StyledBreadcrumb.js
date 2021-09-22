import React from 'react'
import styled from 'styled-components'

import { Breadcrumb } from 'react-bootstrap'

const CssWrapper = styled.div`
  ol {
    padding: 0;
    background: none;

    li.breadcrumb-item a {
      color: white;
      text-decoration: underline;
    }
  }
`

const StyledBreadcrumb = ({ children }) => {
  return (
    <CssWrapper>
      <Breadcrumb>
        {children}
      </Breadcrumb>
    </CssWrapper>
  )
}

export default StyledBreadcrumb
