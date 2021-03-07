import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./app.css";
import {
  Button,
  Grid,
  Paper,
  makeStyles,
  Tooltip,
  Divider,
  TextField,
  Input,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const symbols = ["*", "+", "/", "-"];

function App() {
  const [expressionDisplay, setDisplay] = useState("");
  const [answer, setAnser] = useState(0);
  let countDecimal = 0;

  function display(event) {
    if (event)
      if (expressionDisplay[expressionDisplay.length - 1] === "=") {
        // let dis = expressionDisplay.match(/./g).length;
        // if (expressionDisplay !== null) {
        //   if (dis === 1) {
        //     if (event === ".") {
        //       return setDisplay(expressionDisplay);
        //     }
        //   }
        // }

        if (symbols.includes(event) === true) {
          const withoutEqual = expressionDisplay;
          // console.log("are we in?", withoutEqual);
          return setDisplay(withoutEqual.replace("=", event));
        }
        return setDisplay(event);
      }
    if (
      symbols.includes(expressionDisplay[0]) &&
      symbols.includes(event) &&
      expressionDisplay.length === 1
    ) {
      // console.log("TEST");
      return setDisplay(event);
    }
    if (/[0-9]/.test(event)) {
      // console.log("TEST1");
      return setDisplay((prev) => prev + event);
    } else if (
      /[.]/.test(expressionDisplay[expressionDisplay.length - 1]) !== true &&
      event === "."
    ) {
      // console.log("TEST2");
      return setDisplay((prev) => prev + event);
    } else if (
      /[/+*]/.test(expressionDisplay[expressionDisplay.length - 1]) === true &&
      event === "-"
    ) {
      if (expressionDisplay[expressionDisplay.length - 1] !== "-") {
        // console.log("TEST3");
        return setDisplay((prev) => prev + "-");
      }
    } else {
      if (
        ["+", "-", "*", "/", "."].includes(
          expressionDisplay[expressionDisplay.length - 1]
        ) === false
      ) {
        // console.log("TEST4");
        return setDisplay((prev) => prev + event);
      }
    }
  }
  function calculate() {
    const theExpression = expressionDisplay;
    if (symbols.includes(expressionDisplay[expressionDisplay.length - 1])) {
      return setAnser(eval(theExpression.slice(0, theExpression.length - 1)));
    }
    setAnser(eval(expressionDisplay));
    setDisplay((prev) => prev + "=");
  }

  function displayClean(event) {
    if (event === "CA") {
      return setDisplay("");
    }
    let spliceDisplay = expressionDisplay;
    return setDisplay(spliceDisplay.slice(0, spliceDisplay.length - 1));
  }

  const classes = useStyles();

  return (
    <div className="App">
      <CssBaseline />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <h3 style={{ color: "#3A3B3C", fontSize: "1.5rem" }}>
          Javascript Calculator
        </h3>
        <Paper className={classes.paper} style={{ minHeight: "50%" }}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <div className="display" style={{ textAlign: "right" }}>
              <Input
                type="text"
                value={expressionDisplay}
                placeholder="0"
              ></Input>
              <div className="calculated">{answer}</div>
            </div>
          </Grid>
          <div id="buttons">
            <Button variant="outlined" onClick={() => display("0")} id="zero">
              0
            </Button>
            <Button variant="outlined" onClick={() => display("1")} id="one">
              1
            </Button>
            <Button variant="outlined" onClick={() => display("2")} id="two">
              2
            </Button>
            <Button variant="outlined" onClick={() => display("3")} id="three">
              3
            </Button>
            <Button variant="outlined" onClick={() => display("4")} id="four">
              4
            </Button>
            <Button variant="outlined" onClick={() => display("5")} id="five">
              5
            </Button>
            <Button variant="outlined" onClick={() => display("6")} id="six">
              6
            </Button>
            <Button variant="outlined" onClick={() => display("7")} id="seven">
              7
            </Button>
            <Button variant="outlined" onClick={() => display("8")} id="eight">
              8
            </Button>
            <Button variant="outlined" onClick={() => display("9")} id="nine">
              9
            </Button>
            <Button variant="outlined" onClick={() => display("+")} id="add">
              +
            </Button>
            <Button
              variant="outlined"
              onClick={() => display("-")}
              id="subtract"
            >
              -
            </Button>
            <Button
              variant="outlined"
              onClick={() => display("*")}
              id="multiply"
            >
              *
            </Button>
            <Button variant="outlined" onClick={() => display("/")} id="divide">
              /
            </Button>
            <Button
              variant="outlined"
              onClick={() => display(".")}
              id="decimal"
            >
              .
            </Button>
            <Button
              variant="outlined"
              onClick={() => displayClean("CA")}
              id="clearAll"
              color="secondary"
            >
              CA
            </Button>
            <Button
              variant="outlined"
              onClick={() => displayClean("C")}
              id="clear"
              color="secondary"
            >
              C
            </Button>
            <Button
              variant="outlined"
              onClick={() => calculate("=")}
              id="result"
            >
              =
            </Button>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}

export default App;
