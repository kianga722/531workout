import React from 'react'

const WorkoutNav = ({
  setNotificationMessage,
  workoutCount,
  completed,
  handlePrev,
  handleCurrent,
  handleNext,
  user
}) => {
  return (
    <nav id='nav-workout'>

      {
        // Show previous button only if not first workout
      }
      {
        workoutCount !== 1 &&
        <div
          onClick={(event) => {
            setNotificationMessage(null)
            handlePrev()
          }}
        >
          Previous
        </div>
      }

      {
        // Jumps to current workout
      }
        <div
        onClick={(event) => {
          setNotificationMessage(null)
          handleCurrent()
        }}
        >
          Current
        </div>

      {
        // Only show if workout viewing has completed true state
      }
      {
        completed &&
        <div
          onClick={(event) => {
            setNotificationMessage(null)
            handleNext(user)
          }}
        >
          Next
        </div>
      }
      
    </nav>
  )
}


export default WorkoutNav