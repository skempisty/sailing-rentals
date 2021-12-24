import styled from 'styled-components'
import Text from './Text'

const ListItem = styled(Text)``

ListItem.defaultProps = {
  as: 'li'
}

export default ListItem