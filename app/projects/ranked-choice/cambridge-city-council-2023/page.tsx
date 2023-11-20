'use client'

import { useMemo, useState } from 'react'
import { scaleLinear } from 'd3'
import { useChartDimensions } from 'utils/useChartDimensions'
import Axis from 'components/Axis'
import candidates from 'features/rankedChoice/cambridgeCityCouncil2023'
import {
  getChartDimensionsForCandidates,
  getTreshholdLineDimensions,
} from 'features/rankedChoice/utils'
import { motion } from 'framer-motion'

const marginLeft = 100
const marginRight = 25

// TODO: Calculate topVoteCount and quota based on data
const topVoteCount = 3353
const quota = 2334

const CambridgeElectionPage = () => {
  const chartSettings = {
    marginLeft,
    marginRight,
    height: 600,
  }

  const [round, setRound] = useState(1)
  const { ref, dms } = useChartDimensions(chartSettings)

  const xScale = useMemo(
    () => scaleLinear().domain([0, topVoteCount]).range([0, dms.boundedWidth]),
    [dms.boundedWidth]
  )

  const treshholdLineDimensions = useMemo(
    () => getTreshholdLineDimensions({ quota, dimensions: dms, topVoteCount }),
    [dms]
  )

  const candidateDimensions = getChartDimensionsForCandidates({
    candidates,
    ...dms,
    totalRounds: 17,
    topVoteCount,
    quota,
  })

  return (
    <div className="Chart__wrapper" ref={ref} style={{ height: `${dms.height}px` }}>
      <p>Round {round}</p>
      <button
        onClick={() => {
          if (round !== 1) {
            setRound(round - 1)
          }
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          if (round + 1 <= 17) {
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
        {candidateDimensions.map((candidate) => {
          const { chartDimensions } = candidate
          const roundDimensions = chartDimensions[round - 1]

          const getFillColor = (status) => {
            if (status === 'CONTINUING') {
              return 'black'
            }
            if (status === 'ELECTED') {
              return 'green'
            }

            if (status === 'DEFATED') {
              return 'gray'
            }
          }

          const getDelay = (changeInVotes: number) => {
            if (changeInVotes < 0) {
              return 0
            }

            return 0.5
          }

          return (
            <g key={candidate.name}>
              <text
                x={0}
                y={dms.marginTop + roundDimensions.y}
                width={20}
                fill={getFillColor(roundDimensions.status)}
              >
                {candidate.name}
              </text>
              <motion.rect
                animate={{ width: roundDimensions.width }}
                transition={{
                  ease: 'easeOut',
                  duration: 0.5,
                  delay: getDelay(roundDimensions.voteChangeText.changeInVotes),
                }}
                height={roundDimensions.height}
                fill={getFillColor(roundDimensions.status)}
                y={roundDimensions.y}
                x={marginLeft}
              />
              {roundDimensions.voteChangeText && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ x: roundDimensions.voteChangeText.x, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: getDelay(roundDimensions.voteChangeText.changeInVotes),
                  }}
                  y={roundDimensions.voteChangeText.y}
                >
                  {roundDimensions.voteChangeText.text}
                </motion.text>
              )}
            </g>
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
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          What is going on?
        </motion.span>
        <h3>Resources</h3>
        https://2019.wattenberger.com/blog/react-and-d3
      </div>
    </div>
  )
}

export default CambridgeElectionPage
