import React, { useRef, useState, useEffect } from "react";
import TopBar from "../Components/TopBar";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";

type MainLayoutClassKeys = "root" | "body";

const MainLayout = ({ classes }: WithStyles<MainLayoutClassKeys>) => {

  const [topBarHeight, setTopBarHeight] = useState(0);
  const topBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (topBarRef.current !== null) {
      setTopBarHeight(topBarRef.current.clientHeight);
    }
  });

  const elements: JSX.Element[] = [];
  for (let index = 0; index < 300; index++) {
    elements.push(<li key={index}>{"Number is " + index}</li>);
  }

  return (
    <div className={classes.root}>
      <TopBar ref={topBarRef}></TopBar>
      <div className={classes.body} style={{
        height: `calc(100vh - ${topBarHeight}px)`,
        marginTop: `${topBarHeight}px`
      }}>
        <ul>
          {elements}
        </ul>
      </div>
    </div>
  )
}

export default withStyles(
  () =>
    createStyles({
      "root": {
        display: "flex"
      },
      "body": {
        overflowY: "auto",
        width: "100%"
      }
    })
)(MainLayout);