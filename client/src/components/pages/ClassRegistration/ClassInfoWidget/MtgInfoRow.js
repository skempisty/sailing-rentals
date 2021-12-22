import React, { useState } from 'react'
import moment from 'moment'

import { Button } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'

import Flex from '../../../shared/styled-system/Flex'
import Text from '../../../shared/styled-system/Text'
import MtgInfoModal from './MtgInfoModal'

import { siteColors } from '../../../../utils/constants'

const MtgInfoRow = ({ mtg, hasRegisterBtn }) => {
  const [showMtgInfoModal, setShowMtgInfoModal] = useState(false)

  return (
    <>
      <MtgInfoModal show={showMtgInfoModal} mtg={mtg} onHide={() => setShowMtgInfoModal(false)}/>

      <tr key={mtg.id}>
        <td style={{ verticalAlign: 'middle' }}>
          <Flex alignItems='center'>
            <Text
              marginRight='1em'
              color={siteColors.blue}
              fontWeight='bold'
            >
              {moment(mtg.start).format('MMM DD')}
            </Text>

            <Text>{moment(mtg.start).format('hh:mm a')} - {moment(mtg.end).format('hh:mm a')}</Text>
          </Flex>
        </td>

        <td>
          {hasRegisterBtn ?
            <Text>{mtg.rentalId ? 'On the water' : 'Online'}</Text>
            :
            <Button
              style={{ width: '100%' }}
              variant='secondary'
              onClick={() => setShowMtgInfoModal(true)}
            >
              <Flex alignItems='center'>
                <FaInfoCircle/>
                <Text marginLeft='0.5em'>{mtg.rentalId ? 'On the water' : 'Online'}</Text>
              </Flex>
            </Button>
          }
        </td>
      </tr>
    </>
  )
}

export default MtgInfoRow
