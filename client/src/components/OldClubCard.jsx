// CLUB CARD OLD
// const handleDelete = async (id) => {
//   const newData = await axios.delete(`http://localhost:3001/clubs/${id}`)
//   setClubData(newData.data)
// }

// const getAverageYards = (club) => {
//   let totalYards = 0
//   let shots = club.totalShots
//   if (shots === 0) {
//     return 0
//   } else {
//     club.yards.forEach((shot) => {
//       totalYards += shot
//     })
//     return (totalYards / shots).toFixed()
//   }
// }
// const getGoalYards = (club) => {
//   return club.goal
// }
// const isShowProgress = (club) => {
//   if (club.goal === 0) {
//     return false
//   } else {
//     return true
//   }
// }

// const averageYards = getAverageYards(club)
//     const goal = getGoalYards(club)
//     const showProgress = isShowProgress(club)
//     const key = uuidv4()
//     const id = club._id
