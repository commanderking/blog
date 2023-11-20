import { useRef, useState, useEffect, MutableRefObject } from 'react'

export type ChartDimensions = {
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
  height?: number
  width?: number
  boundedWidth: number
  boundedHeight: number
}

interface ChartDimensionInput extends Partial<ChartDimensions> {}

const combineChartDimensions = (dimensions: ChartDimensionInput) => {
  const parsedDimensions = {
    ...dimensions,
    marginTop: dimensions.marginTop || 10,
    marginRight: dimensions.marginRight || 10,
    marginBottom: dimensions.marginBottom || 40,
    marginLeft: dimensions.marginLeft || 75,
  }

  const { height, width } = dimensions

  console.log({ dimensions })
  return {
    ...parsedDimensions,
    boundedHeight: height ? height - parsedDimensions.marginTop - parsedDimensions.marginBottom : 0,
    boundedWidth: width ? width - parsedDimensions.marginLeft - parsedDimensions.marginRight : 0,
  }
}

export const useChartDimensions = (passedSettings: ChartDimensionInput) => {
  const ref = useRef()
  const dimensions = combineChartDimensions(passedSettings)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    console.log({ passedSettings })
    if (dimensions.width && dimensions.height) return [ref, dimensions]

    const element = ref.current
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return
      if (!entries.length) return

      const entry = entries[0]

      if (width != entry.contentRect.width) setWidth(entry.contentRect.width)
      if (height != entry.contentRect.height) setHeight(entry.contentRect.height)
    })

    if (element) {
      resizeObserver.observe(element)
    }

    return () => element && resizeObserver.unobserve(element)
  }, [])

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  })

  // Originally returned array, but it was always typing return value as the union
  // Maybe can invest more time to fix
  return { ref, dms: newSettings }
}
