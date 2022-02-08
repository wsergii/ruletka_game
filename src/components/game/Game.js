import React, {useRef, useEffect, useState} from "react";
import './Game.css'
import img from './wheel5.png'
import img2 from './arrow.png'
import Money from "../stavka/Money";
import Storage from "../storage/Storage";

function Game() {

    const historyObj = {
        id: 0,
        stavka: 0,
        color:"",
        win: 0,
        totalMoney: 0,
        time: ""
    }

    const [history, setHistory] = useState(historyObj)

    const [state, setState] = useState({
        stavka: 0,
        color:"",
        disabled: true,
        balances: 777
    })

    const [balance, setBalance] = useState(10000)

    const canvasRef = useRef()

    let wheel = new Image();
    let arrow = new Image();
    wheel.src = img;
    arrow.src = img2;

    const draw = () => {

        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.clearRect(0,0,300,300); // clear canvas
        ctx.restore();
        ctx.save();
        ctx.translate(150,150);

        // WHEEL
        let time = new Date();
        let angle = 10*Math.PI/60*time.getSeconds() + 10*Math.PI/60000*time.getMilliseconds() - 45*Math.PI/60
        ctx.rotate(angle);
        ctx.drawImage(wheel, -150, -150);
        ctx.restore();
        ctx.save()

        //ARROW
        ctx.drawImage(arrow,0,0,300,300);
        ctx.restore();
        ctx.save()
    }

    const getColor = () => {
        const ctx = document.querySelector('canvas').getContext('2d');
        const imgColor = ctx.getImageData(150,75, 1,1).data
        //  const colors = [[5,3,6],[0,126,45],[237,31,31]]
        //  const colors = [14,171,299]
        let pixel = imgColor[0] + imgColor[1] + imgColor[2]

        if (pixel <= 100) {
            console.log("GetColor render BLACK")
            result("black")
            return;
        }
        if (pixel <= 250 && pixel > 100) {
            console.log("GetColor render GREEN")
            result("green")
            return;
        }
        if (pixel >= 250) {
            console.log("GetColor render RED")
            result("red")
            return;
        }
    }

    const updateHistory = (stavka, res, win, totalMoney) => {
        let date = new Date().toLocaleString()
        setHistory({...history,
            id: Math.round(Date.now() * Math.PI / Math.random() / 100000),
            stavka: state.stavka,
            color: res,
            win: win,
            totalMoney: totalMoney,
            time: date
        })
    }

    const updateData = (stavka, color, disabled, bal) => {
        setState({
            stavka: stavka,
            color: color,
            disabled: disabled,
            balances: bal
        })
    }

    const result = (res) => {

        console.log("Цвет кнопки:",state.color, "Ставка:",state.stavka, "Призовой цвет:",res)

        if (state.color === res) {
            if (state.color === 'green') {

                setBalance((prevCount) => {
                    return prevCount + state.stavka * 10
                })
                console.log("Bal1:", balance)

                updateHistory(state.stavka, res, state.stavka * 10, balance)
                console.log("Вы выиграли: ", state.stavka * 10, "Balance: ", balance)
            } else {
                setBalance((prevCount) => {
                    return prevCount + state.stavka * 2
                })
                console.log("Bal1:", balance)

                updateHistory(state.stavka, res, state.stavka * 2, balance)
                console.log("Вы выиграли: ", state.stavka * 2, "Balance: ", balance)
            }
        } else {

            setBalance((prevCount) => {
                return prevCount - state.stavka
            })

            console.log("Bal1:", balance)

            updateHistory(state.stavka, res, 0, balance)
            console.log("Вы не выиграли: ","Balance: ", balance)

        }
        setState({...state, disabled: true})
    }

    const init = (ready) => {
        if (ready) {
            let start = Date.now();
            let timePassed = null

            let timer = setInterval(function () {
                timePassed = Date.now() - start;
                draw();
                if (timePassed >= 3010) {
                    clearInterval(timer);
                    return;
                }

            }, 10);
        }
        setTimeout(() => getColor(), 3000)

    }


    useEffect(() => {
        draw()
     },[])

    return (
        <>
            <div className="koleso">
                <canvas
                    className="canvas"
                    ref={canvasRef}
                    width="300px"
                    height="300px"
                />
                <button
                    disabled={state.disabled}
                    className="spin__button"
                    onClick={() => {
                        init(true)
                    }}
                >Крути
                </button>
            </div>
            <Money money={balance} updateData={updateData}/>
            <Storage history={history}/>
        </>
    )
}

export default Game;