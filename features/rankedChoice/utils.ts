import { CandidateVotes } from 'features/rankedChoice/cambridgeCityCouncil2023'
import { ChartDimensions } from 'utils/useChartDimensions'

type DimensionParams = ChartDimensions & {
  candidates: CandidateVotes[]
  domain: [number, number]
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

export const getChartDimensionsForCandidates = ({
  candidates,
  boundedWidth,
  boundedHeight,
  totalRounds,
  topVoteCount,
  quota,

  // dimensions
  marginLeft,
  marginTop,
}: DimensionParams) => {
  const candidatesCount = candidates.length
  const textHeight = 20

  const barWidthPerRound = candidates.map((round, candidateIndex) => {
    let votes: number[] = []

    for (let i = 1; i <= totalRounds; i++) {
      votes = [...votes, round[`round${i}`]]
    }

    const widthPerVote = boundedWidth / topVoteCount

    const interBarSpacing = 1

    const barHeight = (boundedHeight - candidatesCount) / candidatesCount
    const barWidths = votes.map((votesInRound, index) => {
      const changeInVotes = index === 0 ? 0 : votesInRound - votes[index - 1]

      const getVoteChangeText = (changeInVotes) => {
        if (changeInVotes === 0) {
          return null
        }
        const text = changeInVotes > 0 ? `+${changeInVotes}` : changeInVotes
        return text
      }

      const getStatus = (votesInRound, quota) => {
        if (votesInRound === 0) {
          return 'DEFEATED' as const
        }

        if (votesInRound >= quota) {
          return 'ELECTED' as const
        }

        return 'CONTINUING'
      }
      const width = votesInRound * widthPerVote
      return {
        width,
        height: barHeight - interBarSpacing,
        x: marginLeft,
        y: marginTop + candidateIndex * barHeight + interBarSpacing,
        voteChangeText: {
          text: getVoteChangeText(changeInVotes),
          changeInVotes,
          x: marginLeft + width + 5,
          y: marginTop + candidateIndex * barHeight + interBarSpacing + textHeight / 2,
        },
        votes: votesInRound,
        status: getStatus(votesInRound, quota),
      }
    })

    return {
      name: round.lastName,
      chartDimensions: barWidths,
    }
  })

  return barWidthPerRound
}
