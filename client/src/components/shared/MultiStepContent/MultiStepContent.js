import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

import Flex from '../styled-system/Flex'

const MultiStepContent = ({
  backBtnText,
  nextBtnText,
  submitBtnText,
  onSubmit,
  children
}) => {
  const [step, setStep] = useState(0)

  const childrenWithProps = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, { step, stepNum: index });
  })

  const onFirstStep = step === 0
  const onLastStep = childrenWithProps.length === step + 1

  return (
    <>
      {childrenWithProps}

      <Flex
        justifyContent={onFirstStep ? 'flex-end' :'space-between'}
        marginTop='1em'
        paddingTop='1em'
        borderTop='1px solid white'
      >
        {!onFirstStep &&
          <Button variant='secondary' onClick={() => setStep(step - 1)}>
            {backBtnText}
          </Button>
        }

        {onLastStep ?
          <Button variant='primary' onClick={onSubmit}>
            {submitBtnText}
          </Button>
          :
          <Button variant='primary' onClick={() => setStep(step + 1)}>
            {nextBtnText}
          </Button>
        }
      </Flex>
    </>
  )
}

MultiStepContent.propTypes = {
  backBtnText: PropTypes.string,
  nextBtnText: PropTypes.string,
  submitBtnText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

MultiStepContent.defaultProps = {
  backBtnText: 'Back',
  nextBtnText: 'Continue',
  submitBtnText: 'Submit',
}

export default MultiStepContent
