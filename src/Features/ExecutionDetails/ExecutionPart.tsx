import React from 'react'
import { ExecutionPartsModel } from '../../Models/ExecutionPart.model'
import { WithStyles, Typography, withStyles, createStyles, StyleRules } from '@material-ui/core'
import { ExecutionStatusIcon } from '../../Core/Components/ExecutionStatusIcon';

export interface ExecutionPartProps {
  executionParts: ExecutionPartsModel,
  indentIndex?: number,
  stylesFactory: (indentIndex: number) => StyleRules<ExecutionPartClasses, ExecutionPartProps>;
}

export type ExecutionPartClasses = "root" | "statusIndicator" | "title" | "childrenContainer";

const ExecutionPartInner = ({ executionParts, indentIndex, stylesFactory, classes }: ExecutionPartProps & WithStyles<ExecutionPartClasses>) => {
  if (!executionParts) {
    return null;
  }

  const childIndentIndex = (indentIndex || 0) + 1;
  const ChildExecutionPart = withStyles(stylesFactory(childIndentIndex))(ExecutionPart);

  return (
    <>
      <div className={classes.root}>
        <ExecutionStatusIcon active={!executionParts.endTime} selected={false} highlighted={false} />
        <Typography variant="body1" className={classes.title}>{executionParts.title}</Typography>
      </div>
      <div className={classes.childrenContainer}>
        {
          executionParts?.children?.map(child => {
            return <ChildExecutionPart key={child.id} executionParts={child} indentIndex={childIndentIndex} stylesFactory={stylesFactory} />
          })
        }
      </div>
    </>
  )
}

export const ExecutionPart = withStyles(
  theme => createStyles({
    root: {
      "&:hover": {
        backgroundColor: theme.palette.primary.dark
      }
    },
    statusIndicator: {},
    title: {},
    childrenContainer: {}
  })
)(ExecutionPartInner);