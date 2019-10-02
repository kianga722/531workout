import React, { useState, useEffect, useRef } from 'react'

import LoadingWorkout from './LoadingWorkout'
import ConfirmPopup from './ConfirmPopup'
import WorkoutNav from './WorkoutNav'
import WorkoutHeading from './WorkoutHeading'
import RMCalcBlock from './RMCalcBlock'
import RMTMList from './RMTMList'
import WorkoutBlock from './WorkoutBlock'
import AssistAddBlock from './AssistAddBlock'
import AssistExercise from './AssistExercise'

import { calcWeight, calc1RM } from '../helpers'
import axios from 'axios';

const WorkoutHome = ({
  setNotificationMessage,
  user
}) => {
  const [workoutLoading, setWorkoutLoading] = useState(true)
  const [navState, setNavState] = useState('')

  const [workoutLatest, setWorkoutLatest] = useState(1)
  const [workoutCount, setWorkoutCount] = useState(1)
  const [cycle, setCycle] = useState(1)
  const [week, setWeek] = useState(1)
  const [section, setSection] = useState(1)

  // Confirm Popup
  const [confirmPopup, setConfirmPopup] = useState(null)
  const node = useRef();

  const [RMTMCompleted, setRMTMCompleted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [TMTesting, setTMTesting] = useState(false)

  const [RMCalc, setRMCalc] = useState({
    weight: '',
    reps: '',
    ans: ''
  })

  const [RMTM, setRMTM] = useState({
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

  const [workout1, setWorkout1] = useState(getWorkoutInit(1, 1, 1))
  const [workout2, setWorkout2] = useState(getWorkoutInit(1, 1, 2))

  const [assistAdd, setAssistAdd] = useState({
    exercise: 'pushups',
    sets: '',
    reps: ''
  })

  const [assistList, setAssistList] = useState([])
  const [pushups, setPushups] = useState({})
  const [chinups, setChinups] = useState({})
  const [pullups, setPullups] = useState({})
  const [legraises, setLegRaises] = useState({})

  const exerciseMap = {
    'Squat': 'squat',
    'Bench': 'bench',
    'Deadlift': 'deadlift',
    'Overhead Press': 'opress'
  }

  const assistMap = {
    'pushups': [pushups, setPushups],
    'chinups': [chinups, setChinups],
    'pullups': [pullups, setPullups],
    'legraises': [legraises, setLegRaises]
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
    setRMCalc({
      ...RMCalc,
      [key]: value,
      'ans': ans
    })
  }
  const handleRMCalc = ({ target }, key) => {
    let weight, reps
    if (key === 'weight') {
      weight = target.value
      reps = RMCalc.reps
    }
    if (key === 'reps') {
      weight = RMCalc.weight
      reps = target.value
    }
    const ans = calc1RM(weight, reps)
    updateRMCalc(key, target.value, ans)
  }

  const updateRMTM = (exercise, RM, TM) => {
    setRMTM({
      ...RMTM,
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
    setRMTM({
      ...RMTM,
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
    setAssistAdd({
      ...assistAdd,
      [key]: value
    })
  }
  const handleAssistAddInput = ({ target }, key) => {
    updateAssistAdd(key, target.value)
  }

  const handleNewAssist = () => {
    const { exercise, sets, reps } = assistAdd
    if (!exercise || !sets || !reps) {
      setNotificationMessage('Please fill in both Sets and Reps fields before adding an Assistance Exercise')
      return
    }
    if (assistList.includes(exercise)) {
      setNotificationMessage(`${assistFormat[exercise]} already added`)
      return
    }
    setAssistList(assistList.concat(exercise))

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
    const indexDelete = assistList.indexOf(assistName)
    const newAssistList = assistList.slice(0, indexDelete).concat(assistList.slice(indexDelete + 1))
    setAssistList(newAssistList)

    // Update specific assist state
    assistMap[assistName][1]({})
    setConfirmPopup(null)
  }

  const saveWorkoutToDB = async () => {
    const saveObject = {
      workoutCount,
      cycle,
      week,
      section,
      TMTesting,
      RMTM,
      workout1,
      workout2,
      assistance: {},
      userId: user.id
    }
    if (assistList.length > 0) {
      assistList.map(exercise => {
        return saveObject.assistance[exercise] = assistMap[exercise][0]
      })
    }

    try {
      const response = await axios.post('/api/workouts', saveObject)
      return response
    } catch (err) {
      setNotificationMessage(err.response.data)
    }
  }

  const handleDone = async () => {
    try {
      const response = await saveWorkoutToDB()
      if (response) {
        setCompleted(true)
        setNavState('prev')
        setWorkoutLatest(workoutLatest + 1)
        setNotificationMessage(`Workout #${workoutCount} saved`)
      }
    } catch (err) {
      setNotificationMessage(err.response.data)
    }
    window.scrollTo(0, 0)
    //setNotificationMessage(null)
  }

  const getWorkoutFromDB = async (workoutCount) => {
    try {
      const response = await axios.get(`/api/workouts/${workoutCount}`)
      const workoutData = await response.data

      if (workoutData) {
        return workoutData
      }
      return null
    } catch (err) {
      setNotificationMessage(err.response.data)
      window.scrollTo(0, 0)
    }
  }

  const setFoundWorkout = (workout) => {
    setWorkoutCount(workout.workoutCount)
    setCycle(workout.cycle)
    setWeek(workout.week)
    setSection(workout.section)

    // All previous workouts should be in database
    setCompleted(true)

    setTMTesting(workout.TMTesting)
      
    setRMTM(workout.RMTM)
    setWorkout1(workout.workout1)
    setWorkout2(workout.workout2)

    const allAssist = Object.keys(assistMap)
    if (workout.assistance) {
      const workoutAssists = Object.keys(workout.assistance)
        
      const assistListNew = []
      allAssist.forEach(exercise => {
        if (workoutAssists.includes(exercise)) {
          assistListNew.push(exercise)
          const assistObject = workout.assistance[exercise]
            
          assistMap[exercise][1](assistObject)
        } else {
            assistMap[exercise][1]({})
        }
      })
      setAssistList(assistListNew)
    } else {
      allAssist.forEach(exercise => {
        assistMap[exercise][1]({})
      })
      setAssistList([])
    }
  }

  const getNextWorkoutParams = (workoutCurrent) => {
    // Set params to query db for next workout
    let workoutCountNext = workoutCurrent.workoutCount + 1,
    cycleNext = workoutCurrent.cycle,
    weekNext = workoutCurrent.week,
    sectionNext = workoutCurrent.section,
    TMTestingNext = workoutCurrent.TMTesting


    // After section 3,section resets and week changes
    if (workoutCurrent.section === 3) {
    sectionNext = 1

      // Week resets after week 3 or after cycle 4 week 1
      if (workoutCurrent.week === 3 || workoutCurrent.cycle === 4) {
        weekNext = 1

        // After cycle 3, special 1 week testing cycle starts 

        // After cycle 4, cycle resets
        if (workoutCurrent.cycle === 4) {
          TMTestingNext = false
          cycleNext = 1
        } else {
          // cycle increase by 1
          cycleNext += 1
          if (cycleNext === 4) {
            TMTestingNext = true
          } 
        }

      } else {
        // week increase by 1
        weekNext += 1
      }
    } else {
      // section increases by 1
      sectionNext += 1
    }

    return {
      workoutCountNext,
      cycleNext,
      weekNext,
      sectionNext,
      TMTestingNext
    }
  }

  const setStoredValues = (storage) => {
    
    setRMTM({
      ...RMTM,
      opressRM: storage.RMTM.opressRM,
      opressTM: storage.RMTM.opressTM,
      benchRM: storage.RMTM.benchRM,
      benchTM: storage.RMTM.benchTM,
      squatRM: storage.RMTM.squatRM,
      squatTM: storage.RMTM.squatTM,
      deadliftRM: storage.RMTM.deadliftRM,
      deadliftTM: storage.RMTM.deadliftTM
    })
    
    setWorkout1(storage.workout1)
    setWorkout2(storage.workout2)

    const assistList = Object.keys(storage.assistance)
    setAssistList(assistList)

    assistList.forEach(exercise => {
      const assistObject = storage.assistance[exercise]
      assistMap[exercise][1](assistObject)
    })
  }

  const setNewAssist = (workoutCurrent) => {
    const allAssist = Object.keys(assistMap)
    const workoutCurrentAssist = Object.keys(workoutCurrent.assistance)

    const assistListNew = []
    allAssist.forEach(exercise => {  
      if (workoutCurrentAssist.includes(exercise)) {
        // If contain both chinups and pullups, do nothing special
        if (workoutCurrentAssist.includes('chinups') && workoutCurrentAssist.includes('pullups')) {
          assistListNew.push(exercise)

          const assistObject = workoutCurrent.assistance[exercise]
          // reset rep inputs to empty for all previous exercises
          Object.keys(assistObject).forEach(key => {
            if (key !== 'sets' && key !== 'reps') {
              assistObject[key] = ''
            }
          })
          assistMap[exercise][1](assistObject)
        } else {
          // swap chinups and pullups every section
          let exerciseNew = exercise
          if (exercise === 'chinups') {
            exerciseNew = 'pullups'
          }
          if (exercise === 'pullups') {
            exerciseNew = 'chinups'
          }
          assistListNew.push(exerciseNew)

          const assistObject = workoutCurrent.assistance[exercise]
          // reset rep inputs to empty for all previous exercises
          Object.keys(assistObject).forEach(key => {
            if (key !== 'sets' && key !== 'reps') {
              assistObject[key] = ''
            }
          })
          assistMap[exerciseNew][1](assistObject)
          // Reset original exercise state if chinups or pullups
          if (exercise === 'chinups' || exercise === 'pullups') {
            assistMap[exercise][1]({})
          }
        }
      } else {
        if (workoutCurrentAssist.includes('chinups') && workoutCurrentAssist.includes('pullups')) {
          // Do nothing special if includes both chinups and pullups
          assistMap[exercise][1]({})
        } else {
          // Don't delete chinups and pullups, let first part of if statement handle it
          if (exercise !== 'chinups' && exercise !== 'pullups') {
            assistMap[exercise][1]({})
          }
        }
      }
    })
    setAssistList(assistListNew)
  }

  const setNewWorkout = async (workoutCurrent, workoutCountNext, cycleNext, weekNext, sectionNext, TMTestingNext, user) => {
    // Set state to default values for newest workout
    setWorkoutCount(workoutCountNext)
    setCycle(cycleNext)
    setWeek(weekNext)
    setSection(sectionNext)

    // Only set Completed false if new workout not in dadtabase
    setCompleted(false)

    setTMTesting(TMTestingNext)

    // If values in storage for newest workout, use them
    const getStorage = localStorage.getItem('currentWorkout')
    const storage = JSON.parse(getStorage)

    if (localStorage.hasOwnProperty('currentWorkout') && storage.workoutCount === workoutCountNext && user && user.id === storage.userId) {
      setStoredValues(storage)
    } else {
      // Create new workout
      let opressRMNext = workoutCurrent.RMTM.opressRM,
        opressTMNext = workoutCurrent.RMTM.opressTM,
        benchRMNext = workoutCurrent.RMTM.benchRM,
        benchTMNext = workoutCurrent.RMTM.benchTM,
        squatRMNext = workoutCurrent.RMTM.squatRM,
        squatTMNext = workoutCurrent.RMTM.squatTM,
        deadliftRMNext = workoutCurrent.RMTM.deadliftRM,
        deadliftTMNext = workoutCurrent.RMTM.deadliftTM
      
      if (workoutCurrent.cycle === 4 && cycleNext === 1) {
        // GET PREVIOUS WORKOUTS FORM DB
        try {
          const workoutTestOpressSquat = await getWorkoutFromDB(workoutCurrent.workoutCount - 2)

          const workoutTestBench = await getWorkoutFromDB(workoutCurrent.workoutCount - 1)

          // after TMTest week, keep testing weight for successful exercise or re-estimate 1RM
          const opressTest = Number(workoutTestOpressSquat.workout1.TMTest)
          const squatTest = Number(workoutTestOpressSquat.workout2.TMTest)
          const benchTest = Number(workoutTestBench.workout1.TMTest)
          const deadliftTest = Number(workoutCurrent.workout1.TMTest)

          if (opressTest < 3) {
            opressRMNext = calc1RM(workoutCurrent.RMTM.opressTM, opressTest)
            opressTMNext = calcWeight(opressRMNext, .9, 2.5)
          }
          if (squatTest < 3) {
            squatRMNext = calc1RM(workoutCurrent.RMTM.squatTM, squatTest)
            squatTMNext = calcWeight(squatRMNext, .9, 2.5)
          }
          if (benchTest < 3) {
            benchRMNext = calc1RM(workoutCurrent.RMTM.benchTM, benchTest)
            benchTMNext = calcWeight(benchRMNext, .9, 2.5)
          }
          if (deadliftTest < 3) {
            deadliftRMNext = calc1RM(workoutCurrent.RMTM.deadliftTM, deadliftTest)
            deadliftTMNext = calcWeight(deadliftRMNext, .9, 2.5)
          }
        } catch (err) {
          setNotificationMessage(err.response.data)
          window.scrollTo(0, 0)
        }
      }
      // always increase weights after each cycle except after cycle 4
      if (workoutCurrent.cycle !== 4 && workoutCurrent.week === 3 && workoutCurrent.section === 3) {
        opressTMNext = (Number(opressTMNext) + 5).toString()
        benchTMNext = (Number(benchTMNext) + 5).toString()
        squatTMNext = (Number(squatTMNext) + 10).toString()
        deadliftTMNext = (Number(deadliftTMNext) + 10).toString()
      }

      setRMTM({
        ...RMTM,
        opressRM: opressRMNext,
        opressTM: opressTMNext,
        benchRM: benchRMNext,
        benchTM: benchTMNext,
        squatRM: squatRMNext,
        squatTM: squatTMNext,
        deadliftRM: deadliftRMNext,
        deadliftTM: deadliftTMNext
      })

      setWorkout1(getWorkoutInit(cycleNext, sectionNext, 1))
      setWorkout2(getWorkoutInit(cycleNext, sectionNext, 2))

      if (workoutCurrent.assistance) {
        setNewAssist(workoutCurrent)
      }
      
    }
  }

  // Clear local storage and reload
  const handleReCalc = async (user) => {
    setWorkoutLoading(true)
    await localStorage.clear()
    await handleCurrent(user)
  }

  const handleNext = async (user) => {
    // Get next workout based on current workout params of workoutCount, cycle, week, section
    try {
      const workoutCurrent = await getWorkoutFromDB(workoutCount)

      if (!workoutCurrent) {
        setNotificationMessage(`Workout ${workoutCount} missing from database`)
        window.scrollTo(0, 0)
        return
      }
      
      const { workoutCountNext, cycleNext, weekNext, sectionNext, TMTestingNext } = getNextWorkoutParams(workoutCurrent)
  
      const workoutNext = await getWorkoutFromDB(workoutCountNext)
  
      // If workout already exists, set state
      if (workoutNext) {
        // since it is in the past
        setNavState('prev')
        setFoundWorkout(workoutNext)
      } else {
        // Set state to default values for newest workout
        setNewWorkout(workoutCurrent, workoutCountNext, cycleNext, weekNext, sectionNext, TMTestingNext, user)
  
        // since it is the newest workout
        setNavState('current')
        //setNotificationMessage(null)
      }
    } catch(err) {
      setNotificationMessage(err.response.data)
      window.scrollTo(0, 0)
    }
    setNotificationMessage(null)
  }

  const handlePrev = async () => {
    try {
      // Get previous workout based on current workout - 1
      const workoutPrev = await getWorkoutFromDB(workoutCount - 1)
      if (workoutPrev) {
        setNavState('prev')
        setFoundWorkout(workoutPrev)
        //setNotificationMessage(null)
      }
    } catch (err) {
      setNotificationMessage(err.response.data)
      window.scrollTo(0, 0)
    }
    setNotificationMessage(null)
  }

  const handleCurrent = async (userFound) => {
    // Change this to get by most recently created 
    try {
      const response = await axios.get('/api/workouts/current')
      const workoutCurrent = response.data
  
       // If no workouts saved in database previously
      if (!workoutCurrent) {
        // If values in storage for newest workout, use them
        const getStorage = localStorage.getItem('currentWorkout')
        const storage = JSON.parse(getStorage)

        // Want to set input values if saved in localstorage
        if (localStorage.hasOwnProperty('currentWorkout') && userFound && userFound.id === storage.userId) {
          setStoredValues(storage)
        }
        setNavState('current')
        setWorkoutLoading(false)
        // setNotificationMessage(null)
        return
      }
  
      const { workoutCountNext, cycleNext, weekNext, sectionNext, TMTestingNext } = getNextWorkoutParams(workoutCurrent)
      
      // Update latest workout state
      setWorkoutLatest(workoutCountNext)
  
      // Set state to default values for newest workout
      const userCurrent = userFound || user
      await setNewWorkout(workoutCurrent, workoutCountNext, cycleNext, weekNext, sectionNext, TMTestingNext, userCurrent)
  
      // Set state to current after setting new workout input values so the previous workout inputs are not saved to localstorage
      setNavState('current')
      setWorkoutLoading(false)
      // setNotificationMessage(null)
    } catch (err) {
      setNotificationMessage(err.response.data)
      window.scrollTo(0, 0)
    }
    setNotificationMessage(null)
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

  // Set workout for user on initial load
  useEffect(() => {
    handleCurrent(user)
    return () => {
      setNotificationMessage(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Save user inputs only if no localstorage or if storage exists and loading is done and on latest workout
  useEffect(() => {
    if (!workoutLoading && navState === 'current') {
      const getStorage = localStorage.getItem('currentWorkout')
      const storage = JSON.parse(getStorage)

      if (!localStorage.hasOwnProperty('currentWorkout') || (localStorage.hasOwnProperty('currentWorkout') && user.id === storage.userId )) {
        const saveObject = {
          userId: user.id,
          workoutCount,
          RMTM,
          workout1,
          workout2,
          assistance: {}
        }
        if (assistList.length > 0) {
          assistList.map(exercise => {
            return saveObject.assistance[exercise] = assistMap[exercise][0]
          })
        }
    
        localStorage.setItem('currentWorkout', JSON.stringify(saveObject))
      }
    }
  }, [RMTM, assistList, assistMap, completed, navState, user, workout1, workout2, workoutCount, workoutLoading, setWorkoutLoading])

  // Check if RMTM is complete before showing rest of workout
  useEffect(() => {
    for (let i = 0; i < Object.keys(RMTM).length; i += 1) {
      const key = Object.keys(RMTM)[i];
      if (!RMTM[key]) {
        return setRMTMCompleted(false)
      }
    }
    setRMTMCompleted(true)
  }, [RMTM])

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
    <div id='home-logged-in'>

    {
      workoutLoading &&
      <LoadingWorkout />
    }
      
    {
      !workoutLoading &&
      <div id='workout-home'>
          
      {
        confirmPopup !== null &&
        <ConfirmPopup
          node={node}
          message={confirmPopup[0]}
          setConfirmPopup={setConfirmPopup}
          handleYes={(event) => handleAssistDelete(confirmPopup[1])}
        />
      }
          
      {
      user &&
      <div className='logged-in'>
        <div>
          Logged in as:
        </div>
        <div className='user-email'>
          {user.email}
        </div>
      </div>
      }

      <WorkoutNav
        setNotificationMessage={setNotificationMessage}
        workoutCount={workoutCount}
        completed={completed}
        handlePrev={handlePrev}
        handleCurrent={handleCurrent}
        handleNext={handleNext}
        user={user}
      />

      <WorkoutHeading
        workoutCount={workoutCount}
        cycle={cycle}
        week={week}
        section={section}
        TMTesting={TMTesting}
        navState={navState}
        handleReCalc={handleReCalc}
        user={user}
      />

      <RMTMList
        RMTM={RMTM}
        handleRMChange={handleRMChange}
        handleTMChange={handleTMChange}
      />
          
      <RMCalcBlock
        RMCalc={RMCalc}
        handleRMCalc={handleRMCalc}
      />
          
      { RMTMCompleted &&
        <div className='after-rmtm-complete'>
            
          <AssistAddBlock
            assistAdd={assistAdd}
            handleAssistAddInput={handleAssistAddInput}
            handleNewAssist={handleNewAssist}
            />
            
          <section id='workout-session'>

            <WorkoutBlock
              workout={workout1}
              setWorkout={setWorkout1}
              cycle={cycle}
              week={week}
              RMTM={RMTM}
              exerciseMap={exerciseMap}
              getPercentage={getPercentage}
              getReps={getReps}
              TMTesting={TMTesting}
              handleWorkoutInput={handleWorkoutInput}
            />
          
            {
              workout2
              &&
              <WorkoutBlock
              workout={workout2}
              setWorkout={setWorkout2}
              cycle={cycle}
              week={week}
              RMTM={RMTM}
              exerciseMap={exerciseMap}
              getPercentage={getPercentage}
              getReps={getReps}
              TMTesting={TMTesting}
              handleWorkoutInput={handleWorkoutInput}
              />
            }

            <div className='assistance-wrapper'>

              {assistList.map(assistName => {
                return (
                  <AssistExercise
                    key={assistName}
                    assistName={assistName}
                    assitMap={assistMap}
                    assistFormat={assistFormat}
                    assistWorkout={assistMap[assistName][0]}
                    handleWorkoutInput={handleAssistInput}
                    handleAssistDelete={(event) => handleAssistDelete(assistName, assistMap[assistName][1])}
                    confirmPopup={confirmPopup}
                    setConfirmPopup={setConfirmPopup}
                  />
                )
              })}
              
            </div>

          </section>

          <section id='finish-options'>
              <div
                className='done-button'
              onClick={(event) => handleDone(week, section)}
            >
              Finish Workout
            </div>
          </section>

        </div>
      }
          

      </div>
      }
      
      </div>
  )
}


export default WorkoutHome