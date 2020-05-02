import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { useStore } from '../../Stores/Core'
import { useObserver } from 'mobx-react-lite'
import { ExecutionPartStatus as StylessExecutionPart, ExecutionPartClasses } from './ExecutionPartStatus'
import { withStyles, createStyles, WithStyles } from '@material-ui/core'
import { SectionContainer } from '../../Core/Layouts/SectionContainer'

const indicatorSize = 18;
const titleMargin = 10;

const singlePartStyles = (indentIndex: number) => createStyles<ExecutionPartClasses, {}>({
  root: {
    display: "flex",
    alignItems: "center",
    padding: `10px ${15 + (indicatorSize + titleMargin) * indentIndex}px`
  },
  selected: {},
  disabled: {},
  statusIndicator: {
    width: `${indicatorSize}px`,
    height: `${indicatorSize}px`
  },
  title: {
    height: "20px",
    margin: `0 ${titleMargin}px`,
    flexGrow: 1
  }
});

interface ExecutionPartsItemLoaderChildren {
  children?: ExecutionPartsItemLoaderChildren[]
}

const ExecutionPartsItemLoaderStyless = ({ classes, indentIndex, loaderChildren }: { indentIndex?: number, loaderChildren: ExecutionPartsItemLoaderChildren } & WithStyles<ExecutionPartClasses>) => {
  const childIndentIndex = (indentIndex || 0) + 1;
  const IndentedChild = withStyles(singlePartStyles(childIndentIndex))(ExecutionPartsItemLoaderStyless);

  return (
    <>
      <div className={classes.root}>
        <Skeleton variant="circle" className={classes.statusIndicator} />
        <Skeleton variant="rect" className={classes.title} />
      </div>
      {
        loaderChildren.children?.map((child, index) => <IndentedChild key={index} indentIndex={childIndentIndex} loaderChildren={child} />)
      }
    </>
  )
}

const ExecutionPartsItemLoader = withStyles(singlePartStyles(0))(ExecutionPartsItemLoaderStyless);

const loaderStructure = {
  children: [
    {},
    {},
    {
      children: [
        {
          children: [
            {},
            {}
          ]
        },
        {},
        {},
      ]
    },
    {}
  ]
}

const ExecutionPart = withStyles(singlePartStyles(0))(StylessExecutionPart);

export const ExecutionPartsList = () => {
  const executionPartsStore = useStore("executionParts");

  return useObserver(() => {
    if (!executionPartsStore.executionParts && !executionPartsStore.isLoading) {
      return null;
    }

    return (
      <SectionContainer>
        {executionPartsStore.isLoading
          ? <ExecutionPartsItemLoader loaderChildren={loaderStructure} />
          : <ExecutionPart executionParts={executionPartsStore.executionParts!} stylesFactory={singlePartStyles} />}
      </SectionContainer>
    )
  }
  )
}