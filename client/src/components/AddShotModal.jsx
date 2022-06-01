import React from 'react'
import {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'

const AddShotModal = ({setClubData, club}) => {
  const [shot, setShot] = useState('')
  const [warning, setWarning] = useState(false)
  const [showAddShotModal, setshowAddShotModal] = useState(false)
  const addShotHandleClose = () => setshowAddShotModal(false)
  const addShotHandleShow = () => setshowAddShotModal(true)
  const id = club._id

  const warningMessage = () => {
    if (warning) {
      return <Alert variant='danger'>Please enter a number</Alert>
    } else {
      console.log('not warning')
    }
  }

  const isNan = (shot) => {
    return isNaN(shot)
  }

  const handleSubmit = async (id) => {
    console.log(id, 'shot id')
    if (isNan(shot) === false) {
      const result = await axios.patch(`http://localhost:3001/clubs/${id}`, {
        shot: parseInt(shot),
        club: club,
      })
      setClubData(result.data)
      addShotHandleClose()
    } else {
      console.log('stop submit')
      setWarning(true)
    }
  }

  const handleChange = (e) => {
    setShot(e.target.value)
    if (isNan(e.target.value) === false) {
      setWarning(false)
    } else {
      setWarning(true)
    }
  }

  return (
    <>
      <Button variant='primary' onClick={addShotHandleShow}>
        Add Shot
      </Button>

      <Modal show={showAddShotModal} onHide={addShotHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Shot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Total Yards</Form.Label>
              <Form.Control
                className='mb-2'
                type='text'
                placeholder='Yards'
                autoFocus
                onChange={handleChange}
              />
              {warning && warningMessage()}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={addShotHandleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={() => handleSubmit(id)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddShotModal
