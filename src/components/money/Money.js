import React, {useReducer, useState} from 'react';
import './Money.css'
import Button from "../button/Button";

 const reducer = (state, action) => {
      switch (action.type) {
          case 'increment':
              return {stavka: state.stavka + 1};
          case 'decrement':
              return {stavka: state.stavka - 1};
          case 'min':
              return {stavka: 10};
          case 'x2':
              return {stavka: state.stavka * 2};
          case 'divide2':
              return {stavka: state.stavka / 2};
          case 'allMoney':
              return {stavka: action.payload};
          case 'clear':
              return {stavka: 0};
          default: throw new Error()
      }
}

function Money({updateData, money}) {

    const initialState = {
        stavka: 10
    };

    const [redLabel, setRedLabel] = useState(0);
    const [greenLabel, setGreenLabel] = useState(0);
    const [blackLabel, setBlackLabel] = useState(0);
    const [state, dispatch] = useReducer(reducer, initialState)
    const [info, setInfo] = useState(false);

    const colors = ["red", "green", "black"]

    const clearInput = () => {
        return  dispatch({type: 'clear'});
    }

    const pressButton = (color) => {

        if (state.stavka > money) {
            setInfo(true)
        } else {
            if (color === colors[0]) {
                setRedLabel(state.stavka)
                setGreenLabel(0)
                setBlackLabel(0)
                setInfo(false)
                updateData(state.stavka, colors[0], false)
                clearInput()
                console.log("LABEL red: ", redLabel, "money: ", state.stavka, "color: ", colors[0])
                return
            }
            if (color === colors[1]) {
                setGreenLabel(state.stavka)
                setRedLabel(0)
                setBlackLabel(0)
                setInfo(false)
                updateData(state.stavka, colors[1], false)
                clearInput()
                console.log("LABEL green: ", greenLabel, "money: ", state.stavka, "color: ", colors[1])
                return
            }
            if (color === colors[2]) {
                setBlackLabel(state.stavka)
                setGreenLabel(0)
                setRedLabel(0)
                setInfo(false)
                updateData(state.stavka, colors[2], false)
                clearInput()
                console.log("LABEL black: ", blackLabel, "money: ", state.stavka, "color: ", colors[2])
                return
            }
        }
    }

    return (
        <div className="form__stavka">
            <div className="form__button_up">
                <button
                    className="form__button form__button_blue"
                    onClick={() => dispatch({type: 'min'})}
                >Мин</button>
                <button
                    className="form__button form__button_blue"
                    onClick={() => dispatch({type: 'x2'})}
                >x2</button>
                <button
                    className="form__button form__button_blue"
                    onClick={() => dispatch({type: 'divide2'})}
                >1/2</button>
                <button
                    className="form__button form__button_blue"
                    onClick={() => dispatch({type: 'allMoney', payload: money})}
                >На все</button>
            </div>
            <div className="form__input_box">
                <button
                    className="form__button form__button_gray"
                    onClick={() => dispatch({type: 'decrement'})}
                >-</button>
                <input
                    className="form__input"
                    value={state.stavka}
                    type="number"
                    min={1}
                    max={money}
                    onChange={(e) => e.target.value}
                />
                <button
                    className="form__button form__button_gray"
                    onClick={() => dispatch({type: 'increment'})}
                >+</button>
            </div>
            <div className="form__label">
                <p><b>Ставка</b></p>
                <p>Мин: 1 Макс: 10000</p>
            </div>
            <div className="form__button_colors">
                <Button
                    className="form__button form__button_red"
                    onClick={() => pressButton(colors[0])}
                >
                    {redLabel}  X 2
                </Button>
                <Button
                    className="form__button form__button_green"
                    onClick={() => pressButton(colors[1])}
                >
                    {greenLabel}  X 10
                </Button>
                <Button
                    className="form__button form__button_black"
                    onClick={() => pressButton(colors[2])}
                >
                    {blackLabel}  X 2
                </Button>
            </div>

            <div className="form__balance">
                <p><b>Баланс: {money}</b></p>
            </div>

            <div className="form__alert">
                <p><b>{info ? "Уменьшите ставку!" : ""}</b></p>
            </div>

        </div>
    );
}

export default Money;
