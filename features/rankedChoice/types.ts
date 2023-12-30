// return {
//     name: formatName(candidate.lastName),
//     key: `${lastName}-${firstName}`,

//     votes,
//     width,
//     height: barHeight - interBarSpacing,
//     voteChange: {
//       votes: changeInVotes,
//       x:
//         changeInVotes > 0 || status === 'ELECTED'
//           ? marginLeft + votes * widthPerVote - changeInVotes * widthPerVote
//           : 0,
//       animate:
//         changeInVotes > 0
//           ? {
//               width: Math.abs(changeInVotes * widthPerVote),
//               fill: changeInVotes > 0 ? 'green' : 'gray',
//             }
//           : {},
//       transition:
//         changeInVotes > 0
//           ? {
//               duration: barTransition,
//               delay: getDelay(changeInVotes),
//             }
//           : {},
//     },
//     voteChangeText: {
//       text: getVoteChangeText(changeInVotes),
//       changeInVotes,
//       animate: {
//         x: marginLeft + width + 5,
//       },
//       transition: {
//         duration: 0.5,
//         delay: 0.5,
//       },
//       fillColor: 'black',
//     },
//     status,
//     fillColor: getFillColor(status),
//   }

type Status = 'CONTINUING' | 'ELECTED' | 'DEFEATED'
type VoteChange = {
  votes: number
  x: number
  animate:
    | {
        width: number
        fill: string
      }
    | {}
  transition:
    | {
        duration: number
        delay: number
      }
    | {}
}

type VoteChangeText = {
  text: string
  votes: number
  animate: {
    x: number
  }
  transition: {
    duration: number
    delay: number
  }
}

export type CandidateRound = {
  name: string
  key: string
  votes: number
  width: number
  height: number
  fillColor: string
  status: Status
  animate: { width: number; fill: string }
  transition: {
    ease: string
    duration: number
    delay: number
    fill: { delay: number }
  }
  voteChange: VoteChange
  voteChangeText: VoteChangeText
}
