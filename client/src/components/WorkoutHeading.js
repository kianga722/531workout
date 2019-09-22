import React from 'react'

const WorkoutHeading = ({
  workoutCount,
  cycle,
  week,
  section,
  TMTesting,
  navState,
  handleReCalc,
  user,
}) => {
  return (
    <section id='heading-workout'>

      <div className='workout-count'>
        <span>
          Workout #
        </span>
        <span>
          {workoutCount}
        </span>
      </div>

      <div className='cycle'>
        <span>
          Cycle&nbsp;
        </span>
        <span>
          {cycle}
        </span>
      </div>

      <div className='week'>
        <span>
          Week&nbsp;
        </span>
        <span>
          {week}
        </span>
      </div>

      <div className='section'>
        <span>
          Section&nbsp;
        </span>
        <span>
          {section}
        </span>
      </div>

      {
        TMTesting &&
        <div className='title-TMTesting'>
          Training Max Test Week!
        </div>
      }

      {
        // Option to delete local storage and recalculate RMTM
      }
      {
        navState === 'current' &&
        <button
          onClick={(event) => handleReCalc(user)}
        >
          Recalculate 1RM and TM
        </button>
      }
    
    </section>
  )
}


export default WorkoutHeading