'use client'

import { useMemo, useState } from 'react'
import { scaleLinear } from 'd3'
import { useChartDimensions } from 'utils/useChartDimensions'
import Axis from 'components/Axis'
import candidates from 'features/rankedChoice/cambridgeSchoolCouncil2023Data'
import {
  getChartDimensionsForCandidates,
  getTreshholdLineDimensions,
  getQuotaAndTotalVotes,
} from 'features/rankedChoice/utils'
import { motion } from 'framer-motion'

const marginLeft = 100
const marginRight = 25

// TODO: Calculate topVoteCount and quota based on data

const CambridgeElectionPage = () => {
  const chartSettings = {
    marginLeft,
    marginRight,
    height: 500,
  }

  const textHeight = 20
  const textCenterY = textHeight / 2
  const [round, setRound] = useState(0)
  const { ref, dms } = useChartDimensions(chartSettings)
  const { topVoteCount, quota } = getQuotaAndTotalVotes(candidates, 6)

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
    totalRounds: 9,
    topVoteCount,
    quota,
  })

  const candidatesInRound = rounds[round]

  const getYTransition = () => ({ duration: 0.5, delay: 1 })
  return (
    <div>
      <div className="Chart__wrapper" ref={ref} style={{ height: `${dms.height}px` }}>
        <p>Round {round}</p>
        <button
          onClick={() => {
            if (round !== 0) {
              setRound(round - 1)
            }
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (round + 1 <= 16) {
              setRound(round + 1)
            }
          }}
        >
          Next
        </button>
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
                  delay: getDelay(candidate.voteChangeText.changeInVotes),
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
                  animate={{ width: candidate.width }}
                  transition={{
                    ease: 'easeOut',
                    duration: 0.5,
                    delay: getDelay(candidate.voteChangeText.changeInVotes),
                  }}
                  height={candidate.height}
                  fill={candidate.fillColor}
                  x={dms.marginLeft}
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
                    animate={{
                      x: candidate.voteChangeText.x,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5,
                    }}
                    fill={candidate.fillColor}
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

export default CambridgeElectionPage
