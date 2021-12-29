import React from 'react'

import { Modal } from 'react-bootstrap'
import { FaExclamationTriangle } from 'react-icons/fa'

import Box from './shared/styled-system/Box'
import Flex from './shared/styled-system/Flex'
import Text from './shared/styled-system/Text'

import { siteColors } from '../utils/constants'

import { useSite } from '../store/site'

const ApiErrorModal = () => {
  const { showApiErrorModal, apiErrorModalMsg, setShowApiErrorModal } = useSite()

  return (
    <Modal
      show={showApiErrorModal}
      onHide={() => setShowApiErrorModal({ value: false })}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <Flex alignItems='center'>
            <FaExclamationTriangle color={siteColors.orange}/>
            <Text marginLeft='0.5em'>Whoops!</Text>
          </Flex>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Box><Text fontWeight='bold'>
          {apiErrorModalMsg || 'Something went wrong!'}
        </Text></Box>

        <Box>Please refresh the page and try again.</Box>
      </Modal.Body>
    </Modal>
  )
}

export default ApiErrorModal
