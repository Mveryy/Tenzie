import classNames from "classnames"

export default function Die({number, isHeld, holdDice}) {

  return (
    <div 
    onClick={holdDice}
    className={classNames('w-12 h-12 rounded-lg bg-white drop-shadow text-[#2B283A] flex items-center justify-center font-bold text-2xl cursor-pointer transition-colors ', {
      'bg-green-400': isHeld,
      'bg-white': !isHeld
    })}>
      {number}
      </div>
  )
}

