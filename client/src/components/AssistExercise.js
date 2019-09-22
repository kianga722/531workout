import React from 'react'


const inputReps = (inputValue, handleWorkoutInput, exercise, key) => {
  return (
    <input
      key={key}
      type='number'
      value={inputValue}
      onChange={(event) => handleWorkoutInput(event, exercise, key)}
    />
  )
}

const AssistExercise = ({
  assistName,
  assistWorkout,
  handleWorkoutInput,
  handleAssistDelete
}) => {
  const { sets, reps } = assistWorkout

  return (
    <div
      className='assist-exercise-wrapper'
    >
      <button
        id={assistName}
        onClick={handleAssistDelete}
      >
          Delete {assistName}
      </button>
      <div className='assist-title'>
        <div className='assist-name'>
          {assistName}
        </div>
        <div className='assist-sets-reps'>
          {sets}x{reps}
        </div>
      </div>
      <div className='assist-input-wrapper'>
        {Object.keys(assistWorkout).map(key => {
          if (key === 'sets' || key === 'reps') {
            return null
          }
          return inputReps(assistWorkout[key], handleWorkoutInput, assistName, key, )
        })}
      </div>
    </div>
  )
}


export default AssistExercise