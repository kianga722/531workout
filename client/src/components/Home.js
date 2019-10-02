import React, {useState, useEffect, useRef} from 'react'
import {
  Link
} from 'react-router-dom'

import ConfirmPopup from './ConfirmPopup'
import RMCalcBlock from './RMCalcBlock'
import RMTMList from './RMTMList'
import WorkoutBlock from './WorkoutBlock'
import AssistAddBlock from './AssistAddBlock'
import AssistExercise from './AssistExercise'

import { calcWeight, calc1RM } from '../helpers'

const Home = ({
  setNotificationMessage,
}) => {
  // Confirm Popup
  const [confirmPopup, setConfirmPopup] = useState(null)
  const node = useRef();

  const [RMTMCompletedDemo, setRMTMCompletedDemo] = useState(false)

  const [RMCalcDemo, setRMCalcDemo] = useState({
    weight: '',
    reps: '',
    ans: ''
  })

  const [RMTMDemo, setRMTMDemo] = useState({
    squatRM: '',
    squatTM: '',
    benchRM: '',
    benchTM: '',
    deadliftRM: '',
    deadliftTM: '',
    opressRM: '',
    opressTM: ''
  })

  const getExercise = (cycle, section, order) => {
    let workout1Exercise, workout2Exercise
    if (cycle < 4) {
      switch (section) {
        case 1:
          workout1Exercise = 'Squat'
          workout2Exercise = 'Bench'
          break
        case 2:
          workout1Exercise = 'Deadlift'
          workout2Exercise = 'Overhead Press'
          break
        case 3:
          workout1Exercise = 'Bench'
          workout2Exercise = 'Squat'
          break
        default:
          workout1Exercise = 'Squat'
          workout2Exercise = 'Bench'
      }
    } else {
      switch (section) {
        case 1:
          workout1Exercise = 'Overhead Press'
          workout2Exercise = 'Squat'
          break
        case 2:
          workout1Exercise = 'Bench'
          workout2Exercise = undefined
          break
        case 3:
          workout1Exercise = 'Deadlift'
          workout2Exercise = undefined
          break
        default:
          workout1Exercise = 'Overhead Press'
          workout2Exercise = 'Squat'
      }
    }
    if (order === 1) {
      return workout1Exercise
    } else {
      return workout2Exercise
    }
  }

  const getWorkoutInit = (cycle, section, order) => {
    const exercise =  getExercise(cycle, section, order)
    if (!exercise) {
      return undefined
    }
    return {
      exercise,
      warmup1: '',
      warmup2: '',
      warmup3: '',
      main1: '',
      main2: '',
      main3: '',
      TMTest: '',
      AMRAP: '',
      setsLast1: '',
      setsLast2: '',
      setsLast3: '',
      setsLast4: '',
      setsLast5: ''
    }
  }

  const [workout1Demo, setWorkout1Demo] = useState(getWorkoutInit(1, 1, 1))
  const [workout2Demo, setWorkout2Demo] = useState(getWorkoutInit(1, 1, 2))

  const [assistAddDemo, setAssistAddDemo] = useState({
    exercise: 'pushups',
    sets: '',
    reps: ''
  })

  const [assistListDemo, setAssistListDemo] = useState([])
  const [pushupsDemo, setPushupsDemo] = useState({})
  const [chinupsDemo, setChinupsDemo] = useState({})
  const [pullupsDemo, setPullupsDemo] = useState({})
  const [legraisesDemo, setLegRaisesDemo] = useState({})

  const exerciseMap = {
    'Squat': 'squat',
    'Bench': 'bench',
    'Deadlift': 'deadlift',
    'Overhead Press': 'opress'
  }

  const assistMap = {
    'pushups': [pushupsDemo, setPushupsDemo],
    'chinups': [chinupsDemo, setChinupsDemo],
    'pullups': [pullupsDemo, setPullupsDemo],
    'legraises': [legraisesDemo, setLegRaisesDemo]
  }

  const assistFormat = {
    'pushups': 'Pushups',
    'chinups': 'Chinups',
    'pullups': 'Pullups',
    'legraises': 'Leg Raises'
  }

  const getPercentage = (cycle, week) => {
    const percentageMap = {
      1: {
        main1: '65%',
        main2: '75%',
        main3: '85%'
      },
      2: {
        main1: '70%',
        main2: '80%',
        main3: '90%'
      },
      3: {
        main1: '75%',
        main2: '85%',
        main3: '95%'
      },
    }

    if (cycle < 4) {
      return percentageMap[week]
    }
    return percentageMap[2]
  }

  const getReps = (cycle, week) => {
    const repsMap = {
      1: {
        main1: 5,
        main2: 5,
        main3: 5
      },
      2: {
        main1: 3,
        main2: 3,
        main3: 3
      },
      3: {
        main1: 5,
        main2: 3,
        main3: 1
      },
    }

    if (cycle < 4) {
      return repsMap[week]
    }
    return repsMap[1]
  }

  // Assume functions will have access to state and setstate hooks
  const updateRMCalc = (key, value, ans) => {
    setRMCalcDemo({
      ...RMCalcDemo,
      [key]: value,
      'ans': ans
    })
  }
  const handleRMCalc = ({ target }, key) => {
    let weight, reps
    if (key === 'weight') {
      weight = target.value
      reps = RMCalcDemo.reps
    }
    if (key === 'reps') {
      weight = RMCalcDemo.weight
      reps = target.value
    }
    const ans = calc1RM(weight, reps)
    updateRMCalc(key, target.value, ans)
  }

  const updateRMTM = (exercise, RM, TM) => {
    setRMTMDemo({
      ...RMTMDemo,
      [exercise+'RM']: RM,
      [exercise+'TM']: TM
    })
  }
  const handleRMChange = ({ target }, exercise) => {
    const RM = target.value
    const TM = calcWeight(RM, .9, 2.5)
    updateRMTM(exercise, RM, TM)
  }

  const updateTM = (exercise, TM) => {
    setRMTMDemo({
      ...RMTMDemo,
      [exercise+'TM']: TM
    })
  }
  const handleTMChange = ({ target }, exercise) => {
    const TM = target.value
    updateTM(exercise, TM)
  }

  const updateWorkout = (workout, setWorkout, key, value) => {
    setWorkout({
      ...workout,
      [key]: value
    })
  }
  const handleWorkoutInput = ({ target }, workout, setWorkout, key) => {
    let value = target.value
    updateWorkout(workout, setWorkout, key, value)
  }

  const updateAssistAdd = (key, value) => {
    setAssistAddDemo({
      ...assistAddDemo,
      [key]: value
    })
  }
  const handleAssistAddInput = ({ target }, key) => {
    updateAssistAdd(key, target.value)
  }

  const handleNewAssist = () => {
    const { exercise, sets, reps } = assistAddDemo
    if (!exercise || !sets || !reps) {
      setNotificationMessage('Please fill in both Sets and Reps fields before adding an Assistance Exercise')
      return
    }
    if (assistListDemo.includes(exercise)) {
      setNotificationMessage(`${assistFormat[exercise]} already added`)
      return
    }
    setAssistListDemo(assistListDemo.concat(exercise))

    const newAssist = {
      sets,
      reps
    }
    for (let i = 1; i <= Number(sets); i += 1) {
      let repsName = `reps${i}`
      newAssist[repsName] = ''
    }
    assistMap[exercise][1](newAssist)
    setNotificationMessage(`${assistFormat[exercise]} ${sets}x${reps} added (Assistance Exercises located at the end of the Workout)`)
  }

  const handleAssistInput = ({target}, exercise, key) => {
    assistMap[exercise][1]({
      ...assistMap[exercise][0],
      [key]: target.value
    })
  }

  const handleAssistDelete = (assistName) => {
    // Update assistList state
    const indexDelete = assistListDemo.indexOf(assistName)
    const newAssistList = assistListDemo.slice(0, indexDelete).concat(assistListDemo.slice(indexDelete + 1))
    setAssistListDemo(newAssistList)

    // Update specific assist state
    assistMap[assistName][1]({})
    setConfirmPopup(null)
  }

  // Confirm Popup Handle Clicks
  const handleClick = e => {
    if (node.current && node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setConfirmPopup(null)
  };


  // Check if RMTM is complete before showing rest of workout
  useEffect(() => {
    for (let i = 0; i < Object.keys(RMTMDemo).length; i += 1) {
      const key = Object.keys(RMTMDemo)[i];
      if (!RMTMDemo[key]) {
        return setRMTMCompletedDemo(false)
      }
    }
    setRMTMCompletedDemo(true)
  }, [RMTMDemo])

  // Handle confirm popup mouse clicks
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div id='home'>

      {
        confirmPopup !== null &&
        <ConfirmPopup
          node={node}
          message={confirmPopup[0]}
          setConfirmPopup={setConfirmPopup}
          handleYes={(event) => handleAssistDelete(confirmPopup[1])}
        />
      }

      <div className='main-summary'>
        Workout Generator for the 5/3/1 Lifting Program
      </div>

      <div className='links-register'>
        <Link to="/signup">START NOW</Link>
      </div>

      <div id='workout-demo'>

        <div className='title-wrapper'>
          <div className='demo-title'>
            TRY A DEMO WORKOUT BELOW
          </div>
        </div>

        <div className='demo-step'>
          Enter your 1 Rep Max for each of the following exercises:
        </div>
        <RMTMList
          RMTM={RMTMDemo}
          handleRMChange={handleRMChange}
          handleTMChange={handleTMChange}
        />

        <div className='demo-step'>
          You can use the following calculator to find your 1 Rep Max:
        </div>
        <RMCalcBlock
          RMCalc={RMCalcDemo}
          handleRMCalc={handleRMCalc}
        />

        { RMTMCompletedDemo &&
          <div className='after-rmtm-complete'>
          
            <div className='demo-step'>
              Add assistance exercises and complete the workout!
            </div>

            <AssistAddBlock
              assistAdd={assistAddDemo}
              handleAssistAddInput={handleAssistAddInput}
              handleNewAssist={handleNewAssist}
            />

            <section id='workout-session-demo'>
              <WorkoutBlock
                workout={workout1Demo}
                setWorkout={setWorkout1Demo}
                cycle={1}
                week={1}
                RMTM={RMTMDemo}
                exerciseMap={exerciseMap}
                getPercentage={getPercentage}
                getReps={getReps}
                TMTesting={false}
                handleWorkoutInput={handleWorkoutInput}
              />

              <WorkoutBlock
                workout={workout2Demo}
                setWorkout={setWorkout2Demo}
                cycle={1}
                week={1}
                RMTM={RMTMDemo}
                exerciseMap={exerciseMap}
                getPercentage={getPercentage}
                getReps={getReps}
                TMTesting={false}
                handleWorkoutInput={handleWorkoutInput}
              />
            </section>

            <div className='assistance-wrapper-demo'>

              {assistListDemo.map(assistName => {
                return (
                  <AssistExercise
                    key={assistName}
                    assistName={assistName}
                    assistFormat={assistFormat}
                    assistWorkout={assistMap[assistName][0]}
                    handleWorkoutInput={handleAssistInput}
                    setConfirmPopup={setConfirmPopup}
                  />
                )
              })}
              
            </div>
          
          </div>
        }


      </div>



    </div>
  )
}


export default Home