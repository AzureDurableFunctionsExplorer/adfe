import React from 'react'
import { ExecutionPartsModel } from '../../Models/ExecutionPart.model'
import { WithStyles, Typography } from '@material-ui/core'
import { ExecutionStatusIcon } from '../../Core/Components/ExecutionStatusIcon';

export interface ExecutionPartProps {
  executionParts: ExecutionPartsModel
}

export type ExecutionPartClasses = "root" | "statusIndicator" | "title" | "childrenContainer";

const ExecutionPartInner = ({ executionParts, classes }: ExecutionPartProps & WithStyles<ExecutionPartClasses>) => {
  if (!executionParts) {
    return null;
  }

  return (
    <>
      <div className={classes.root}>
        <ExecutionStatusIcon active={!executionParts.endTime} selected={false} highlighted={false} />
        <Typography variant="body1" className={classes.title}>{executionParts.title}</Typography>
      </div>
      <div className={classes.childrenContainer}>
        {
          executionParts?.children?.map(child => {
            return <ExecutionPart key={child.id} executionParts={child} classes={classes} />
          })
        }
      </div>
    </>
  )
}

export const ExecutionPart = ExecutionPartInner;