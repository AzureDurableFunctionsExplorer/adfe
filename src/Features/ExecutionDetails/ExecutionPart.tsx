import React from 'react'
import { ExecutionPartsModel } from '../../Models/ExecutionPart.model'
import { WithStyles, Typography, withStyles, createStyles, StyleRules } from '@material-ui/core'
import { ExecutionStatusIcon } from '../../Core/Components/ExecutionStatusIcon';
import { useIsPointerOver } from '../../Core/Hooks/useIsPointerOver';

export interface ExecutionPartProps {
  executionParts: ExecutionPartsModel,
  indentIndex?: number,
  stylesFactory: (indentIndex: number) => StyleRules<ExecutionPartClasses, ExecutionPartProps>;
}

export type ExecutionPartClasses = "root" | "statusIndicator" | "title";

const ExecutionPartInner = ({ executionParts, indentIndex, stylesFactory, classes }: ExecutionPartProps & WithStyles<ExecutionPartClasses>) => {
  const [isPointerOver, ref] = useIsPointerOver(null);

  if (!executionParts) {
    return null;
  }
  const childIndentIndex = (indentIndex || 0) + 1;
  const ChildExecutionPart = withStyles(stylesFactory(childIndentIndex))(ExecutionPart);

  return (
    <>
      <div className={classes.root} ref={ref}>
        <ExecutionStatusIcon active={!executionParts.endTime} selected={false} highlighted={isPointerOver} />
        <Typography variant="body1" className={classes.title}>{executionParts.title}</Typography>
      </div>

      {
        executionParts?.children?.map(child => {
          return <ChildExecutionPart key={child.id} executionParts={child} indentIndex={childIndentIndex} stylesFactory={stylesFactory} />
        })
      }
    </>
  )
}

export const ExecutionPart = withStyles(
  theme => createStyles({
    root: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        "& $title": {
          color: theme.palette.secondary.main
        }
      }
    },
    statusIndicator: {},
    title: {}
  })
)(ExecutionPartInner);