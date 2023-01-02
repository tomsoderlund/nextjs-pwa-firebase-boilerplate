// Setup:
// 1. yarn add react-svg-inline raw-loader
// 2. Uncomment 'webpack' section in next.config.js
import React from 'react'
import SVGInline from 'react-svg-inline'

const DEFAULT_SIZE = '16'

const Icon = ({ type = 'home', width = DEFAULT_SIZE, height = DEFAULT_SIZE, color = 'rgba(0, 0, 0, 0.85)', rotation }) => {
  return (
    <SVGInline
      svg={require(`public/icons/${type}.svg`).default}
      width={width}
      height={height}
      fill={color}
      style={{
        display: 'inline-block',
        transition: 'transform 0.3s',
        ...(rotation && { transform: `rotate(${rotation}deg)` })
      }}
      cleanup
    />
  )
}
export default Icon
