import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Typography, Container } from '@material-ui/core'

export const ExecutionPartsList = () => {
  return (
    <>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Container>
        <Typography variant="body1" align="center">Work in progress</Typography>
      </Container>
    </>
  )
}