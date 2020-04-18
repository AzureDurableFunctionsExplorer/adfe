import React from 'react'
import { ExecutionPartsModel } from '../../Models/ExecutionPart.model'
import { WithStyles, Typography, withStyles, createStyles, StyleRules } from '@material-ui/core'
import { ExecutionStatusIcon, ExecutionStatus } from '../../Core/Components/ExecutionStatusIcon';
import { useIsPointerOver } from '../../Core/Hooks/useIsPointerOver';
import { useStore } from '../../Stores/Core';
import { useObserver } from 'mobx-react-lite';

export interface ExecutionPartProps {
  executionParts: ExecutionPartsModel,
  indentIndex?: number,
  stylesFactory: (indentIndex: number) => StyleRules<ExecutionPartClasses, ExecutionPartProps>;
}

export type ExecutionPartClasses = "root" | "selected" | "disabled" | "statusIndicator" | "title";

const ExecutionPartInner = ({ executionParts, indentIndex, stylesFactory, classes }: ExecutionPartProps & WithStyles<ExecutionPartClasses>) => {
  const [isPointerOver, ref] = useIsPointerOver(null);
  const executionPartsStore = useStore("executionParts");

  const childIndentIndex = (indentIndex || 0) + 1;
  const ChildExecutionPart = withStyles(stylesFactory(childIndentIndex))(ExecutionPart);

  return useObserver(() => {

    const isSelected = executionPartsStore.selectedPartId === executionParts.id;

    return (
      <>
        <div
          className={`${classes.root} ${isSelected ? classes.selected : ""} ${!executionParts.startTime ? classes.disabled : ""}`}
          ref={ref}
          onClick={(e) => executionPartsStore.selectPart(executionParts.id)}>
          <ExecutionStatusIcon status={executionPartToIconStatus(executionParts)} selected={isSelected} highlighted={isPointerOver} />
          <Typography variant="body1" className={classes.title}>{executionParts.title}</Typography>
        </div>

        {
          executionParts?.children?.map(child => (<ChildExecutionPart key={child.id} executionParts={child} indentIndex={childIndentIndex} stylesFactory={stylesFactory} />))
        }
      </>
    )
  }
  )
}

const executionPartToIconStatus = (executionPart: ExecutionPartsModel): ExecutionStatus => {
  return !executionPart.startTime
    ? 'waiting'
    : executionPart.endTime
      ? 'done'
      : 'active';
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
      },
      "&$selected": {
        backgroundColor: theme.palette.primary.dark,
        "& $title": {
          color: theme.palette.secondary.dark
        }
      },
      "&$disabled": {
        pointerEvents: "none",
        opacity: 0.3
      }
    },
    selected: {},
    disabled: {},
    statusIndicator: {},
    title: {}
  })
)(ExecutionPartInner);