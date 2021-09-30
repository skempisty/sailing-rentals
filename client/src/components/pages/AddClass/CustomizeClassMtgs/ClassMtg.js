import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { FaArrowsAltV, FaBan, FaEdit } from 'react-icons/fa'

import Box from '../../../shared/styled-system/Box'
import Flex from '../../../shared/styled-system/Flex'
import SelectMenu from '../../../shared/SelectMenu'
import SelectMenuItem from '../../../shared/SelectMenuItem'

import EditClassMtgModal from './EditClassMtgModal'

const ClassMtg = ({ mtg, index, onDeleteClick }) => {
  const [showEditClassMtgModal, setShowEditClassMtgModal] = useState(false)

  return (
    <>
      <EditClassMtgModal
        show={showEditClassMtgModal}
        mtg={mtg}
        mtgIndex={index}
        onHide={() => setShowEditClassMtgModal(false)}
      />

      <Flex alignItems='center' margin='0 1em 0.5em 0'>
        <Flex
          className='handle'
          alignSelf='stretch'
          padding='0 0.25em'
          marginRight='0.5em'
          background={'#343a3f'}
          borderTopLeftRadius='5px'
          borderBottomLeftRadius='5px'
          style={{ cursor: 'pointer' }}
        >
          <Flex alignItems='center'>
            <FaArrowsAltV color='white'/>
          </Flex>
        </Flex>

        {mtg.name}

        <Box marginLeft='0.5em'>
          <SelectMenu variant='light'>
            <SelectMenuItem
              label='Edit'
              iconComponent={<FaEdit/>}
              callback={() => setShowEditClassMtgModal(true)}
            />

            <SelectMenuItem
              label='Delete'
              iconComponent={<FaBan/>}
              callback={() => onDeleteClick(index)}
            />
          </SelectMenu>
        </Box>
      </Flex>
    </>
  )
}

ClassMtg.propTypes = {
  mtg: PropTypes.object
}

export default ClassMtg
