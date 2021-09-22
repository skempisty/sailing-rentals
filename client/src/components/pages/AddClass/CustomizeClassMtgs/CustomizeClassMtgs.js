import React from 'react'

import { Form, Button } from 'react-bootstrap'
import { ReactSortable } from 'react-sortablejs'

import Box from '../../../shared/styled-system/Box'
import Flex from '../../../shared/styled-system/Flex'
import ClassMtg from './ClassMtg'

import View from '../../../../domains/views/AddClass'

import { useClasses } from '../../../../store/classes'

const CustomizeClassMtgs = () => {
  const { addEditClass, updateAddEditClass } = useClasses()

  const { meetings: mtgs } = addEditClass

  const handleAddMtgClick = () => {
    updateAddEditClass({ meetings: mtgs.concat([View.freshMtg]) })
  }

  const handleMtgDeleteClick = (index) => {
    updateAddEditClass({ meetings: mtgs.filter((_, mtgIndex) => mtgIndex !== index) })
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

        <Box marginLeft='0.5em'>
          <Button onClick={() => updateAddEditClass({ meetings: View.defaultClassMtgs })}>Reset</Button>
        </Box>
      </Flex>
    </>
  )
}

export default CustomizeClassMtgs
