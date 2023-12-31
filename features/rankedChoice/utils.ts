import { CandidateVotes } from 'features/rankedChoice/cambridgeCityCouncil2023Data'
import { ChartDimensions } from 'utils/useChartDimensions'
import { CandidateRound } from 'features/rankedChoice/types'

type DimensionParams = ChartDimensions & {
  candidates: CandidateVotes[]
  boundedWidth: number
  boundedHeight: number
  totalRounds: number
  topVoteCount: number
  quota: number
}

export const getTreshholdLineDimensions = ({ quota, topVoteCount, dimensions }) => {
  const { marginLeft, marginTop, boundedWidth, boundedHeight } = dimensions

  const x = marginLeft + boundedWidth * (quota / topVoteCount)
  return {
    x1: x,
    x2: x,
    y1: marginTop,
    y2: marginTop + boundedHeight,
  }
}

const getVoteChangeText = (changeInVotes) => {
  if (changeInVotes === 0) {
    return null
  }
  const text = changeInVotes > 0 ? `+${changeInVotes}` : changeInVotes
  return text
}

const getFillColor = (status: 'CONTINUING' | 'ELECTED' | 'DEFEATED') => {
  if (status === 'CONTINUING') {
    return 'black'
  }
  if (status === 'ELECTED') {
    return 'green'
  }

  if (status === 'DEFEATED') {
    return 'lightgray'
  }

  return ''
}

const getStatus = (votesInRound, quota) => {
  if (votesInRound === 0) {
    return 'DEFEATED' as const
  }

  if (votesInRound === quota) {
    return 'ELECTED' as const
  }

  return 'CONTINUING'
}

const byCandidates = (candidateA, candidateB) => {
  if (candidateA.name === 'Exhausted') {
    return 1
  }

  if (candidateB.name === 'Exhausted') {
    return -1
  }

  return candidateB.votes - candidateA.votes
}

const formatName = (lastName: string) => {
  if (lastName.length > 12) {
    return `${lastName.slice(0, 9)}...`
  }
  return lastName
}

export const getQuotaAndTotalVotes = (candidates, availablePositions) => {
  const totalVotes = candidates.reduce((votes, candidate) => {
    return votes + candidate.round1
  }, 0)

  const topVoteCount = candidates.reduce((votes, candidate) => {
    return candidate.round1 >= votes ? candidate.round1 : votes
  }, 0)

  const quota = Math.ceil(totalVotes / (availablePositions + 1))

  return {
    totalVotes,
    topVoteCount,
    quota,
  }
}

const barTransition = 0.5

const getDelay = (changeInVotes: number) => {
  if (changeInVotes < 0) {
    return 0
  }

  return barTransition
}

export const getChartDimensionsForCandidates = ({
  candidates,
  boundedWidth,
  boundedHeight,
  totalRounds,
  topVoteCount,
  quota,

  // dimensions
  marginLeft,
}: DimensionParams) => {
  const candidatesCount = candidates.length

  let rounds: CandidateRound[][] = []

  const widthPerVote = boundedWidth / topVoteCount
  const interBarSpacing = 1
  const barHeight = (boundedHeight - candidatesCount) / candidatesCount

  for (let round = 1; round <= totalRounds; round++) {
    const roundResult: CandidateRound[] = candidates.map((candidate) => {
      const { lastName, firstName } = candidate
      const votes: number = candidate[`round${round}`]
      const previousRoundVotes = round === 1 ? 0 : candidate[`round${round - 1}`]
      const changeInVotes = round === 1 ? 0 : votes - previousRoundVotes
      const width = votes * widthPerVote

      const status = getStatus(votes, quota)

      return {
        name: formatName(candidate.lastName),
        key: `${lastName}-${firstName}`,

        votes,
        width,
        height: barHeight - interBarSpacing,
        status,
        fillColor: getFillColor(status),
        animate: { width: width, fill: getFillColor(status) },
        transition: {
          ease: 'easeOut',
          duration: 0.5,
          delay: getDelay(changeInVotes),
          fill: { delay: getDelay(changeInVotes) + 0.5 },
        },
        voteChange: {
          votes: changeInVotes,
          x:
            changeInVotes > 0 || status === 'ELECTED'
              ? marginLeft + votes * widthPerVote - changeInVotes * widthPerVote
              : 0,
          animate:
            changeInVotes > 0
              ? {
                  width: Math.abs(changeInVotes * widthPerVote),
                  fill: changeInVotes > 0 ? 'green' : 'gray',
                }
              : {},
          transition:
            changeInVotes > 0
              ? {
                  duration: barTransition,
                  delay: getDelay(changeInVotes),
                }
              : {},
        },
        voteChangeText: {
          text: getVoteChangeText(changeInVotes),
          votes,
          animate: {
            x: marginLeft + width + 5,
          },
          transition: {
            duration: 0.5,
            delay: 0.5,
          },
          fillColor: 'black',
        },
      }
    })
    rounds.push(roundResult)
  }

  const sortedRounds = rounds.map((candidates) => {
    const sorted = candidates.sort(byCandidates).map((candidate, index) => {
      const barY = index * barHeight + interBarSpacing
      return {
        ...candidate,
        y: barY,
        voteChangeText: {
          height: barHeight - interBarSpacing,
          ...candidate.voteChangeText,
        },
      }
    })

    return sorted
  })

  return sortedRounds
}
