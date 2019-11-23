export const calcPeriodInSeconds = (period) => {
  const {periodType, periodValue} = period
  const multipliers = {
    'Seconds': 1,
    'Minutes': 60,
    'Hours': 60 * 60,
    'Days': 60 * 60 * 24,
  }

  return periodValue * multipliers[periodType]
}

export const isPeriodsEqual = (period, otherPeriod) => {
  return (period.periodType === otherPeriod.periodType && period.periodValue === otherPeriod.periodValue)
}