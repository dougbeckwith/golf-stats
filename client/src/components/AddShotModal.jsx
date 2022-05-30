import React from 'react'
import {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import axios from 'axios'

const AddShotModal = ({
  addShotHandleClose,
  addShotHandleShow,
  showAddShotModal,
  setClubData,
}) => {
  const [shot, setShot] = useState()
  const handleSubmit = async (id) => {
    const result = await axios.patch(`http://localhost:3001/clubs/${id}`, {
      shot: parseInt(shot),
      //   club: club,
    })
    setClubData(result.data)
  }
  const handleChange = (e) => {
    setShot(e.target.value)
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={addShotHandleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddShotModal
