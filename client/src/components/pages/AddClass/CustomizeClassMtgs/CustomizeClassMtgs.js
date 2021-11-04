import React from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'
import { ReactSortable } from 'react-sortablejs'

import Box from '../../../shared/styled-system/Box'
import Flex from '../../../shared/styled-system/Flex'
import ClassMtg from './ClassMtg'

import View from '../../../../domains/views/AddClass'

import { useClasses } from '../../../../store/classes'

const CustomizeClassMtgs = ({ isNewClass }) => {
  const { addEditClass, updateAddEditClass, removeAddEditClassMeetingThunk } = useClasses()

  const { meetings: mtgs } = addEditClass

  const handleAddMtgClick = () => {
    updateAddEditClass({ meetings: mtgs.concat([View.getFreshClassMtg(addEditClass.id)]) })
  }

  const handleMtgDeleteClick = (index) => {
    removeAddEditClassMeetingThunk({ mtg: mtgs[index], index })
  }

  return (
    <>
      <Form>
        <Form.Label><b>Customize Class Meetings</b></Form.Label>
      </Form>

      <ReactSortable
        list={addEditClass.meetings}
        setList={(e) => updateAddEditClass({ meetings: e })}
        animation='150'
        handle='.handle'
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
      >
        {mtgs.map((mtg, index) =>
          <ClassMtg
            key={`mtg-${index}`}
            index={index}
            mtg={mtg}
            onDeleteClick={handleMtgDeleteClick}
          />
        )}
      </ReactSortable>

      <Flex>
        <Button onClick={handleAddMtgClick}>+ Meeting</Button>

        {isNewClass &&
          <Box marginLeft='0.5em'>
            <Button onClick={() => updateAddEditClass({ meetings: View.defaultClassMtgs })}>Reset</Button>
          </Box>
        }
      </Flex>
    </>
  )
}

CustomizeClassMtgs.propTypes = {
  isNewClass: PropTypes.bool.isRequired
}

export default CustomizeClassMtgs
