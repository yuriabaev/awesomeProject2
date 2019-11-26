export const calcPeriodInSeconds = (period) => {
  const {type, value} = period

  const multipliers = {
    'Seconds': 1,
    'Minutes': 60,
    'Hours': 60 * 60,
    'Days': 60 * 60 * 24,
  }

  return value * multipliers[type]
}

export const isPeriodsEqual = (period, otherPeriod) => {
  return (period.type === otherPeriod.type && period.value === otherPeriod.value)
}