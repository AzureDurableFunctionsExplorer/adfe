import React from 'react'
import { Typography } from '@material-ui/core'
import { useStore } from '../../Stores/Core'

const ExecutionPartDetailsInner = () => {
  const executionPartsStore = useStore("executionParts");

  return (
    <Typography variant="h5">{executionPartsStore.selectedPart?.title}</Typography>
  )
}

export const ExecutionPartDetails = ExecutionPartDetailsInner;