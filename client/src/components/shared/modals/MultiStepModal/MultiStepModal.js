import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Modal } from 'react-bootstrap'

const MultiStepModal = ({
  show,
  title,
  backBtnText,
  nextBtnText,
  submitBtnText,
  onSubmit,
  onHide,
  children
}) => {
  const [step, setStep] = useState(0)

  const childrenWithProps = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, { step, stepNum: index });
  })

  const onFirstStep = step === 0
  const onLastStep = children.length === step + 1

  const resetStep = () => {
    // wait for modal fade out animation to complete
    setTimeout(() => {
      setStep(0)
    }, 200)
  }

  const handleMultiStepModalHide = () => {
    onHide()
    resetStep()
  }

  const handleSubmitClick = () => {
    onSubmit()
    resetStep()
  }

  return (
    <Modal show={show} onHide={handleMultiStepModalHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      {childrenWithProps}

      <Modal.Footer style={{ justifyContent: onFirstStep ? 'flex-end' :'space-between' }}>
          {!onFirstStep &&
            <Button variant='secondary' onClick={() => setStep(step - 1)}>
              {backBtnText}
            </Button>
          }

          {onLastStep ?
            <Button variant='primary' onClick={handleSubmitClick}>
              {submitBtnText}
            </Button>
            :
            <Button variant='primary' onClick={() => setStep(step + 1)}>
              {nextBtnText}
            </Button>
          }
      </Modal.Footer>
    </Modal>
  )
}

MultiStepModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  backBtnText: PropTypes.string,
  nextBtnText: PropTypes.string,
  submitBtnText: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

MultiStepModal.defaultProps = {
  backBtnText: 'Back',
  nextBtnText: 'Continue',
  submitBtnText: 'Submit',
}

export default MultiStepModal
