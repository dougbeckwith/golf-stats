// import React from 'react'
// import {useState} from 'react'
// import {Modal, Form, Button} from 'react-bootstrap'
// import axios from 'axios'
// //
// const AddShotModal = ({setClubData, club}) => {
//   const [goal, setGoal] = useState()
//   const [showGoalModal, setShowGoalModal] = useState(false)
//   const handleCloseGoalModal = () => setShowGoalModal(false)
//   const handleShowGoalModal = () => setShowGoalModal(true)
//   const id = club._id

//   const handleSubmit = async (id) => {
//     console.log(id, 'goal id')
//     const result = await axios.patch(`http://localhost:3001/clubs/${id}`, {
//       goal: parseInt(goal),
//       club: club,
//     })
//     setClubData(result.data)
//     handleCloseGoalModal()
//   }
//   const handleChange = (e) => {
//     setGoal(e.target.value)
//   }

//   return (
//     <>
//       <Button variant='outline-primary' onClick={handleShowGoalModal}>
//         Add Goal
//       </Button>

//       <Modal show={showGoalModal} onHide={handleCloseGoalModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Avg Distance Goal</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
//               <Form.Label>Goal Yards</Form.Label>
//               <Form.Control
//                 className='mb-2'
//                 type='text'
//                 placeholder='Yards'
//                 autoFocus
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant='secondary' onClick={handleCloseGoalModal}>
//             Cancel
//           </Button>
//           <Button variant='primary' onClick={() => handleSubmit(id)}>
//             Add
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default AddShotModal
