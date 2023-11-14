'use client'

import { useMemo, useState } from 'react'
import { scaleLinear } from 'd3'
import { useChartDimensions } from 'utils/useChartDimensions'
import Axis from 'components/Axis'
import candidates from 'features/rankedVoting/cambridgeCityCouncil2023'
import {
  getChartDimensionsForCandidates,
  getTreshholdLineDimensions,
} from 'features/rankedVoting/utils'

const marginLeft = 150
const marginRight = 25

const topVoteCount = 3031
const CambridgeElectionPage = () => {
  const chartSettings = {
    marginLeft,
    marginRight,
    height: 600,
  }

  const [round, setRound] = useState(0)
  const [ref, dms] = useChartDimensions(chartSettings)

  const xScale = useMemo(
    () => scaleLinear().domain([0, topVoteCount]).range([0, dms.boundedWidth]),
    [dms.boundedWidth]
  )

  const treshholdLineDimensions = useMemo(
    () => getTreshholdLineDimensions({ quota: 2118, dimensions: dms, topVoteCount }),
    [dms]
  )

  const candidateDimensions = getChartDimensionsForCandidates({
    candidates,
    ...dms,
    boundedWidth: dms.boundedWidth,
    boundedHeight: dms.boundedHeight,
    totalRounds: 17,
    topVoteCount,
    quota: 3118,
  })

  return (
    <div className="Chart__wrapper" ref={ref} style={{ height: `${dms.height}px` }}>
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
        {candidateDimensions.map((candidate, index) => {
          const { chartDimensions } = candidate

          const roundDimensions = chartDimensions[round]

          console.log({ roundDimensions })
          return (
            <g>
              <text x={0} y={dms.marginTop + roundDimensions.y} width={20}>
                {candidate.name}
              </text>
              <rect
                width={roundDimensions.width}
                height={roundDimensions.height}
                fill="black"
                y={roundDimensions.y}
                x={marginLeft}
              />
              {roundDimensions.voteChangeText && (
                <text x={roundDimensions.voteChangeText.x} y={roundDimensions.voteChangeText.y}>
                  {roundDimensions.voteChangeText.text}
                </text>
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
        <h3>Resources</h3>
        https://2019.wattenberger.com/blog/react-and-d3
      </div>
    </div>
  )
}

export default CambridgeElectionPage
