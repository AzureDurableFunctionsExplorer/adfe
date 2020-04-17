import React, { PropsWithChildren } from 'react'
import { Skeleton } from '@material-ui/lab'
import { useStore } from '../../Stores/Core'
import { useObserver } from 'mobx-react-lite'
import { ExecutionPart as StylessExecutionPart, ExecutionPartClasses } from './ExecutionPart'
import { withStyles, createStyles, WithStyles } from '@material-ui/core'

const indicatorSize = 18;
const titleMargin = 10;

const singlePartStyles = createStyles<ExecutionPartClasses, {}>({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px"
  },
  statusIndicator: {
    width: `${indicatorSize}px`,
    height: `${indicatorSize}px`
  },
  title: {
    height: "20px",
    margin: `0 ${titleMargin}px`,
    flexGrow: 1
  },
  childrenContainer: {
    marginLeft: `${indicatorSize + titleMargin}px`
  }
});

const ExecutionPartsItemLoaderStyless = ({ children, classes }: PropsWithChildren<{}> & WithStyles<ExecutionPartClasses>) => (
  <>
    <div className={classes.root}>
      <Skeleton variant="circle" className={classes.statusIndicator} />
      <Skeleton variant="rect" className={classes.title} />
    </div>
    <div className={classes.childrenContainer}>
      {children}
    </div>
  </>
)

const ExecutionPartsItemLoader = withStyles(singlePartStyles)(ExecutionPartsItemLoaderStyless);

const ExecutionPartsListLoader = () => (
  <ExecutionPartsItemLoader>
    <ExecutionPartsItemLoader />
    <ExecutionPartsItemLoader />
    <ExecutionPartsItemLoader>
      <ExecutionPartsItemLoader>
        <ExecutionPartsItemLoader />
        <ExecutionPartsItemLoader />
      </ExecutionPartsItemLoader>
      <ExecutionPartsItemLoader />
      <ExecutionPartsItemLoader />
    </ExecutionPartsItemLoader>
    <ExecutionPartsItemLoader />
  </ExecutionPartsItemLoader>
)

const ExecutionPart = withStyles(singlePartStyles)(StylessExecutionPart);

export const ExecutionPartsList = () => {
  const executionPartsStore = useStore("executionParts");

  return useObserver(() =>
    <div style={{ marginTop: "10px" }}>
      {
        executionPartsStore.isLoading
          ? <ExecutionPartsListLoader />
          : <ExecutionPart executionParts={executionPartsStore.executionParts!} />
      }
    </div>
  )
}