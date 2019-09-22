import React from 'react'

const RMCalcBlock = ({
  RMCalc,
  handleRMCalc
}) => {
  return (
    <section id='rm-calc'>

      <div className='title'>
        Calculate your 1 Rep Max!
      </div>
      
      <div className='rm-calc-weight'>
        <div>
          Weight (lbs)
        </div>
        <input
          type='number'
          value={RMCalc.sets}
          onChange={(event) => handleRMCalc(event, 'weight')}
        />
      </div>

      <div className='rm-calc-reps'>
        <div>
          Reps
        </div>
        <input
          type='number'
          value={RMCalc.reps}
          onChange={(event) => handleRMCalc(event, 'reps')}
        />
      </div>

      <div className='rm-calc-ans'>
        <div>
          1RM
        </div>
        <div>
          {RMCalc.ans}
        </div>
      </div>

    </section>
  )
}


export default RMCalcBlock