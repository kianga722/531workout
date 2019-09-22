import React from 'react'

const WorkoutNav = ({
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
        <button
          onClick={(event) => handlePrev()}
        >
          Previous
        </button>
      }

      {
        // Jumps to current workout
      }
        <button
          onClick={(event) => handleCurrent()}
        >
          Current
        </button>

      {
        // Only show if workout viewing has completed true state
      }
      {
        completed &&
        <button
          onClick={(event) => handleNext(user)}
        >
          Next
        </button>
      }
      
    </nav>
  )
}


export default WorkoutNav