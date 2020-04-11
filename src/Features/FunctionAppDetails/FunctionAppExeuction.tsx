import React from 'react'

interface FunctionAppExecutionProps {
  execution: string
}

const FunctionAppExecution = ({ execution }: FunctionAppExecutionProps) => {
  return (
    <div>{execution}</div>
  )
}

export default FunctionAppExecution;