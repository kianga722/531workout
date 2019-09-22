export const calcWeight = (init, percentage, multiple) => {
  const final = Number(init)*percentage
  const t = 1 / multiple
  const finalRound = Math.round(final * t) / t
  if (Math.round(finalRound) !== finalRound) {
    return (finalRound).toFixed(1).toString()
  }
  return finalRound.toString()
}

export const calc1RM = (weight, reps) => {
  return Math.round(Number(weight) * (36 / (37 - Number(reps))))
}