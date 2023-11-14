import { CandidateVotesPerRound } from 'features/rankedVoting/cambridgeCityCouncil2023'

type DimensionParams = {
  votesPerRound: CandidateVotesPerRound[]
  domain: [number, number]
  boundedWidth: number
  totalRounds: number
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
  quota,
  topVoteCount,
  marginLeft,
  marginTop,
}: DimensionParams) => {
  const candidatesCount = candidates.length
  const textHeight = 20

  const barWidthPerRound = candidates.map((round, candidateIndex) => {
    let votes: number[] = []

    for (let i = 1; i < totalRounds; i++) {
      votes = [...votes, round[`round${i}`]]
    }

    const widthPerVote = boundedWidth / topVoteCount

    const interBarSpacing = 1

    const barHeight = (boundedHeight - candidatesCount) / candidatesCount
    const barWidths = votes.map((vote, index) => {
      const changeInVotes = index === 0 ? 0 : vote - votes[index - 1]

      const getVoteChangeText = (changeInVotes) => {
        if (changeInVotes === 0) {
          return null
        }
        const text = changeInVotes > 0 ? `+${changeInVotes}` : changeInVotes
        return text
      }
      const width = vote * widthPerVote
      return {
        width,
        height: barHeight - interBarSpacing,
        x: marginLeft,
        y: marginTop + candidateIndex * barHeight + interBarSpacing,
        voteChangeText: {
          text: getVoteChangeText(changeInVotes),
          x: marginLeft + width + 5,
          y: marginTop + candidateIndex * barHeight + interBarSpacing + textHeight / 2,
        },
      }
    })

    return {
      name: round.candidate,
      votes: votes,
      chartDimensions: barWidths,
    }
  })

  return barWidthPerRound
}
