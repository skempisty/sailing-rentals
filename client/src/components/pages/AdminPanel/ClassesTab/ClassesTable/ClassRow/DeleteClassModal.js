import React, { useState } from 'react'
import PropTypes from 'prop-types'
//
// import CurrencyInput from 'react-currency-input-field'
// import {Button, Dropdown, Form, Modal} from 'react-bootstrap'
//
// import { useUsers } from '../../../../store/users'
// import { useClasses } from '../../../../store/classes'
// import { useRentals } from '../../../../store/rentals'
//
// import getUserById from '../../../../store/orm/users/getUserById'
//
// import User from '../../../../domains/User'
// import Box from "../../../shared/styled-system/Box";

const DeleteClassModal = ({ show, klass, onHide }) => {
  // const { users } = useUsers()
  // const { classes, createClassThunk } = useClasses()
  // const { allRentals } = useRentals()
  //
  // const DEFAULT_CAPACITY = 5
  // const DEFAULT_PRICE = 225.00
  // const DEFAULT_DETAILS = 'this class is pretty hard. you\'ll basically be cpt. jack sparrow after this shit'
  //
  // const initialState = {
  //   instructorId: klass ? klass.instructorId : null,
  //   capacity: klass ? klass.capacity : DEFAULT_CAPACITY,
  //   details: klass ? klass.details : DEFAULT_DETAILS,
  //   price: klass ? klass.price : DEFAULT_PRICE
  // }
  //
  // const [
  //   { instructorId, capacity, details, price },
  //   setState
  // ] = useState(initialState)
  //
  // const resetAndHide = () => {
  //   setState(initialState)
  //   onHide()
  // }
  //
  // const handleSaveClassClick = async () => {
  //   await createClassThunk({
  //     instructorId,
  //     capacity,
  //     details,
  //     price
  //   })
  //
  //   onHide()
  // }

  return null
    // <Modal show={show} onHide={resetAndHide}>
    //   <Modal.Header closeButton>
    //     <Modal.Title>{klass ? 'Edit Class' : 'Add Class'}</Modal.Title>
    //   </Modal.Header>
    //
    //   <Modal.Body>
    //     <Form>
    //       <Box marginBottom='1em'>
    //         <Dropdown>
    //           <Dropdown.Toggle variant='dark' id='dropdown-basic'>
    //             {instructorId ? User.buildUserFullName(getUserById(instructorId)) : 'Select an instructor for this class'}
    //           </Dropdown.Toggle>
    //
    //           <Dropdown.Menu>
    //             {User.getInstructors(users).map((instructor, index) =>
    //               <Dropdown.Item
    //                 key={`instructor-select-${instructor.id}-${index}`}
    //                 onSelect={() => setState({ instructorId: instructor.id })}
    //               >
    //                 {User.buildUserFullName(instructor)}
    //               </Dropdown.Item>
    //             )}
    //           </Dropdown.Menu>
    //         </Dropdown>
    //       </Box>
    //
    //       <Form.Group>
    //         <Form.Label><b>Class Capacity</b></Form.Label>
    //         <Form.Control
    //           type='text'
    //           value={capacity}
    //           onChange={(e) => setState({ capacity: e.target.value })}
    //         />
    //       </Form.Group>
    //
    //       <Form.Group>
    //         <Form.Label><b>Registration Price</b></Form.Label>
    //         <CurrencyInput
    //           className='form-control'
    //           decimalsLimit={2}
    //           prefix='$'
    //           value={price}
    //           onValueChange={(value) => setState({ price: value })}
    //         />
    //       </Form.Group>
    //
    //       <Form.Group>
    //         <Form.Label><b>Details</b></Form.Label>
    //         <Form.Control
    //           as='textarea'
    //           rows={3}
    //           placeholder='Optional'
    //           value={details}
    //           onChange={(e) => setState({ details: e.target.value })}
    //         />
    //       </Form.Group>
    //     </Form>
    //   </Modal.Body>
    //
    //   <Modal.Footer>
    //     <Button variant='secondary' onClick={resetAndHide}>
    //       Cancel
    //     </Button>
    //
    //     <Button variant='primary' onClick={handleSaveClassClick}>
    //       {klass ? 'Save Changes' : 'Create Class'}
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
}

DeleteClassModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  klass: PropTypes.object
}

export default DeleteClassModal
