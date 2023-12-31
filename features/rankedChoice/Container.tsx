'use client'

import { useMemo, useState } from 'react'
import { scaleLinear } from 'd3'
import { useChartDimensions } from 'utils/useChartDimensions'
import Axis from 'components/Axis'
import {
  getChartDimensionsForCandidates,
  getTreshholdLineDimensions,
  getQuotaAndTotalVotes,
} from 'features/rankedChoice/utils'
// @ts-ignore
import { motion } from 'framer-motion'

const marginLeft = 100
const marginRight = 25

const RankedChoiceContainer = ({
  candidates,
  roundComments,
  // TODO: Calculate total rounds based on data
  totalRounds,
  availablePositions,
}) => {
  const chartSettings = {
    marginLeft,
    marginRight,
    height: 500,
  }

  const textHeight = 20
  const textCenterY = textHeight / 2
  const [round, setRound] = useState(0)
  const { ref, dms } = useChartDimensions(chartSettings)
  const { topVoteCount, quota } = getQuotaAndTotalVotes(candidates, availablePositions)

  const xScale = useMemo(
    () => scaleLinear().domain([0, topVoteCount]).range([0, dms.boundedWidth]),
    [dms.boundedWidth]
  )

  const treshholdLineDimensions = useMemo(
    () => getTreshholdLineDimensions({ quota, dimensions: dms, topVoteCount }),
    [dms]
  )

  const rounds = getChartDimensionsForCandidates({
    candidates,
    ...dms,
    totalRounds,
    topVoteCount,
    quota,
  })

  const candidatesInRound = rounds[round]
  const commentsInRound = roundComments[round].text

  const getYTransition = () => ({ duration: 0.5, delay: 1 })

  return (
    <div className="bg-gray-100 p-4">
      <div className="p-4 text-center">
        <div className="inline-flex">
          <button
            onClick={() => {
              if (round !== 0) {
                setRound(round - 1)
              }
            }}
            className="rounded-l bg-gray-300 px-2 py-2 font-bold text-gray-800 hover:bg-gray-400"
          >
            Prev
          </button>
          {roundComments.map((comment) => {
            const className =
              comment.round - 1 === round
                ? 'bg-green-300 px-2 py-2 font-bold text-gray-800 hover:bg-green-400'
                : 'bg-gray-300 px-2 py-2 font-bold text-gray-800 hover:bg-gray-400'

            return (
              <button className={className} onClick={() => setRound(comment.round - 1)}>
                {comment.round}
              </button>
            )
          })}
          <button
            onClick={() => {
              if (round + 1 < totalRounds) {
                setRound(round + 1)
              }
            }}
            className="rounded-r bg-gray-300 px-2 py-2 font-bold text-gray-800 hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
      <div className="pl-16 pr-16">
        <p className="text-center text-xl">Count {round + 1}</p>
        <div>{commentsInRound}</div>
      </div>

      <div
        className="p-4"
        // @ts-ignore
        ref={ref}
      >
        <svg width={dms.width} height={dms.height}>
          <g transform={`translate(${[dms.marginLeft, dms.marginTop].join(',')})`}>
            <rect width={dms.boundedWidth} height={dms.boundedHeight} fill="lavender" />
            <g transform={`translate(${[0, dms.boundedHeight].join(',')})`}>
              <Axis domain={xScale.domain()} range={xScale.range()} pixelsPerTick={50} />
            </g>
          </g>
          {candidatesInRound.map((candidate) => {
            const getDelay = (changeInVotes: number) => {
              if (changeInVotes < 0) {
                return 0
              }

              return 0.5
            }

            return (
              <motion.g
                key={candidate.key}
                dominantBaseline="middle"
                animate={{ y: dms.marginTop + candidate.y + 1 }}
                transition={{
                  duration: 0.5,
                  delay: getDelay(candidate.voteChangeText.votes),
                  y: getYTransition(),
                }}
                height={candidate.height}
              >
                <motion.text
                  textAnchor="end"
                  x={dms.marginLeft - 10}
                  width={20}
                  y={textCenterY}
                  fill={candidate.fillColor}
                >
                  {candidate.name}
                </motion.text>
                <motion.rect
                  animate={candidate.animate}
                  transition={candidate.transition}
                  height={candidate.height}
                  fill={candidate.fillColor}
                  x={dms.marginLeft}
                />
                <motion.rect
                  // Having key here is critical to re-render every round and reset width to 0
                  key={round}
                  initial={{ width: 0, fill: 'black' }}
                  animate={candidate.voteChange.animate}
                  transition={candidate.voteChange.transition}
                  x={candidate.voteChange.x}
                  height={candidate.height}
                />

                {candidate.votes && (
                  <text x={dms.marginLeft + 5} y={textHeight / 2} fill="white">
                    {candidate.votes}
                  </text>
                )}

                {candidate.voteChangeText && (
                  <motion.text
                    dominantBaseline="middle"
                    y={textCenterY}
                    animate={candidate.voteChangeText.animate}
                    transition={candidate.voteChangeText.transition}
                  >
                    {candidate.voteChangeText.text}
                  </motion.text>
                )}
              </motion.g>
            )
          })}
          <line
            x1={treshholdLineDimensions.x1}
            y1={treshholdLineDimensions.y1}
            x2={treshholdLineDimensions.x2}
            y2={treshholdLineDimensions.y2}
            stroke="red"
          ></line>
        </svg>

        <div>
          <h3>Resources</h3>
          https://2019.wattenberger.com/blog/react-and-d3
        </div>
      </div>
    </div>
  )
}

export default RankedChoiceContainer
