import styled from 'styled-components'
import { color, space, layout, background, border, position } from 'styled-system'

/**
 * The basic building block for all styled-system derived components.
 * See https://styled-system.com/api
 */
const Box = styled.div`
  ${position}
  ${layout}
  ${space}
  ${color}
  ${background}
  ${border}
`

export default Box