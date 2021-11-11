import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";


const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  let [currentOperation, setOperation] = useState({
    operation: false,
  });

  // Sets calculator flicker animation 
  const setFlicker = () => {
    setOperation({
      ...currentOperation,
      operation: !currentOperation.operation,
    });
    setTimeout(function () {
      setOperation({
        ...currentOperation,
        operation: currentOperation.operation,
      });
    }, 100);
  };
  
  // numClickHandler function -The numClickHandler function gets triggered only if any of the number buttons (0–9) are pressed. 
  // Then it gets the value of the Button and adds that to the current num value.
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }

    setFlicker();
  };

  // commaClickHandler function - adds the decimal point to the current num value, making it a decimal number.
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });

    setFlicker();
  };

  // signClickHandler function - The signClickHandler function gets fired when the user press either +, –, * or /. 
  // The particular value is then set as a current sign value in the calc object.
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });

    setFlicker();
  };

  // equalsClickHandler function - The equalsClickHandler function calculates the result when the equals button (=) is pressed. 
  // The calculation is based on the current num and res value, as well as the sign selected (see the math function).
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }

    setFlicker();
  };

  // invertClickHandler function - The invertClickHandler function first checks if there’s any entered value (num)
  // or calculated value (res) and then inverts them by multiplying with -1:
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });

    setFlicker();
  };

  // percentClickHandler function - The percentClickHandler function checks if there’s any entered value (num) or calculated value (res) and 
  // then calculates the percentage using the built-in Math.pow function, which returns the base to the exponent power:
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });

    setFlicker();
  };

  // resetClickHandler function - The resetClickHandler function defaults all the initial values of calc, returning 
  // the calc state as it was when the Calculator app was first rendered:
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });

    setFlicker();
  };


  return (
    <Wrapper>
      <div className="casio">
        <h3>CASIO</h3>
        <p className="upper">ELETRONIC CALCULATOR</p>
        <p>HL-815L</p>
      </div>
      <Screen flickState={ currentOperation.operation } value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          // Flat() inserts all btn values inside a single array, map goes through them and returns a button with the required key, className, value and onClick properties
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                // Notice exception for the "=" operator to be a "equals" string
                className={
                    btn === "C" 
                  ? "reset"
                  : btn === "+-" 
                  ? "plusminus"
                  : btn === "%" 
                  ? "percent"
                  : btn === "/" 
                  ? "divide"
                  : btn === "X" 
                  ? "multiply"
                  : btn === "-" 
                  ? "minus"
                  : btn === "+" 
                  ? "plus"
                  : btn === "=" 
                  ? "equals" 
                  : btn === "." 
                  ? "decimal"
                  : "" 
                }
                value={btn}
                onClick={
                    btn === "C"
                    ? resetClickHandler
                    : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;