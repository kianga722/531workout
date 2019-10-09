import React from 'react';

const WorkoutNav = ({
  setNotificationMessage,
  workoutCount,
  completed,
  handlePrev,
  handleCurrent,
  handleNext,
  user,
}) => (
  <nav id="nav-workout">

      {
        // Show previous button only if not first workout
      }
      {
        workoutCount !== 1
        && <button
          onClick={(event) => {
            setNotificationMessage(null);
            handlePrev();
          }}
        >
          Previous
        </button>
      }

      {
        // Jumps to current workout
      }
      <button
          onClick={(event) => {
          setNotificationMessage(null);
          handleCurrent();
        }}
        >
          Current
        </button>

      {
        // Only show if workout viewing has completed true state
      }
      {
        completed
        && <button
          onClick={(event) => {
            setNotificationMessage(null);
            handleNext(user);
          }}
        >
          Next
        </button>
      }

    </nav>
);


export default WorkoutNav;
