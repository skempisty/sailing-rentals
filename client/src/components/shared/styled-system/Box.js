import styled from 'styled-components'
import { color, space, layout } from 'styled-system'

/**
 * The basic building block for all styled-system derived components.
 * See https://styled-system.com/api
 */
const Box = styled.div`
  ${color}
  ${space}
  ${layout}
`

export default Box