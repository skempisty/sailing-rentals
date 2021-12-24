import styled from 'styled-components'
import { typography } from 'styled-system'

import Box from './Box'

const Text = styled(Box)`
  ${typography}
`

Text.defaultProps = {
  as: 'span'
}

export default Text
