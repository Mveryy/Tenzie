import { useEffect, useState } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])


  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() *6),
        isHeld: false,
        id: nanoid(),
    }
  }

  function allNewDice() {

    const newDice = []
    for (let i = 0; i<10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  const diceElements = dice.map(die => <Die key={die.id} number={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(prevState => prevState.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }

  

  return (
    <div className=" h-screen w-full flex items-center justify-center">
      {tenzies && <Confetti />}
      <div className="bg-[#0B2434] w-[550px] h-[500px] px-6 py-8">
        <div className="bg-[#F5F5F5] h-full w-full rounded-[10px] p-9
        flex flex-col justify-between items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[#2B283A] font-bold text-4xl">Tenzies</h1>
            <p className="text-[#4A4E74] text-1xl w-[232px] text-center mb-2">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          </div>
        <div className="grid grid-cols-5 gap-5">
          {diceElements}
        </div>
        <button className="bg-[#5035FF] py-2 px-12 rounded text-[18px] font-bold mt-5 drop-shadow" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
