import React from 'react'
import {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import axios from 'axios'

const AddClubModel = ({handleShow, handleClose, show, setClubData}) => {
  const [clubName, setClub] = useState('')
  const [clubBrand, setClubBrand] = useState('')
  const [isValidated, setIsValidated] = useState(false)
  const [isMessage, setIsMessage] = useState(false)

  const checkValidation = () => {
    if (clubBrand.length && clubBrand.length) {
      setIsValidated(true)
    } else {
      setIsValidated(false)
      setIsMessage(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    checkValidation()
    if (isValidated === true) {
      console.log(clubBrand)
      try {
        const result = await axios.post('http://localhost:3001/clubs', {
          clubName: clubName,
          brand: clubBrand,
          yards: [],
          totalShots: 0,
        })
        setClubData(result.data)
        handleClose()
        setIsMessage(false)
      } catch (err) {
        console.log(err)
      }
    }
  }
  const handleClubNameChange = (e) => {
    setClub(e.target.value)
  }
  const handleClubBrandChange = (e) => {
    setClubBrand(e.target.value)
  }
  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Add Club
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Club</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Club</Form.Label>
              <Form.Control
                className='mb-2'
                type='text'
                placeholder='Club'
                required={true}
                autoFocus
                onChange={handleClubNameChange}
              />
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Brand'
                onChange={handleClubBrandChange}
              />
            </Form.Group>
          </Form>
          {isMessage && (
            <div className='text-danger'>Please Fill Out All Inputs</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='primary'
            onClick={handleSubmit}
            onSubmit={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddClubModel
