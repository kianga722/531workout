import React from 'react'

const AssistAddBlock = ({
  assistAdd,
  handleAssistAddInput,
  handleNewAssist
}) => {
  return (
    <div className='add-assist-wrapper'>

      <div>
        Add Assistance Workout
      </div>

      <select
        value={assistAdd.exercise}
        onChange={(event) => handleAssistAddInput(event, 'exercise')}
      >
        <option value='pushups'>Pushups</option>
        <option value='chinups'>Chinups</option>
        <option value='pullups'>Pullups</option>
        <option value='legraises'>Leg Raises</option>
      </select>

      <div className='assist-setCount'>
        <div>
          Sets
        </div>
        <input
          type='number'
          value={assistAdd.sets}
          onChange={(event) => handleAssistAddInput(event, 'sets')}
        />
      </div>

      <div className='assist-repCount'>
        <div>
          Reps per Set
        </div>
        <input
          type='number'
          value={assistAdd.reps}
          onChange={(event) => handleAssistAddInput(event, 'reps')}
        />
      </div>

      <button
        onClick={(event) => handleNewAssist()}
      >
        Add Assistance Workout
      </button>

    </div>
  )
}


export default AssistAddBlock