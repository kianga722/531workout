import React from 'react'

const RMTMExercise = ({
  exercise,
  idName,
  exerciseRM,
  exerciseTM,
  handleRMChange,
  handleTMChange
}) => {
  return (
    <div
      id={idName}
      className='exercise-wrapper'
    >
      <div className='exercise-title'>
        {exercise}
      </div>
      <div className='exercise-one-rm'>
        <div>
          1RM
        </div>
        <input
          type='number'
          value={exerciseRM}
          onChange={handleRMChange}
        />
      </div>
      <div className='exercise-tm'>
        <div>
          TM
        </div>
        <input
          type='number'
          value={exerciseTM}
          onChange={handleTMChange}
        />
      </div>
    </div>
  )
}


export default RMTMExercise