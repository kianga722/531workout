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
  assistFormat,
  assistWorkout,
  handleWorkoutInput,
  setConfirmPopup,
}) => {
  const { sets, reps } = assistWorkout

  return (
    <div
      className='assist-exercise-wrapper'
    >

      <div className='title-delete-wrapper'>
        <div className='assist-title'>
          <div className='assist-name'>
            {assistFormat[assistName]}
          </div>
          <div className='assist-sets-reps'>
            {sets}x{reps}
          </div>
        </div>

        <div
          id={`delete-${assistName}`}
          className='delete-assist'
          onClick={(event) => setConfirmPopup([`Are you sure you want to remove ${assistFormat[assistName]} from your Workout?`, assistName])}
        >
            Remove
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