import React from 'react'

const timeString = timestamp => new Date(timestamp).toLocaleTimeString('en-US', {
  weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
})

const takesString = () => {
  const synonyms = [
    'takes',
    'grabs',
    'steals',
    'seizes',
    'plucks',
    'snags',
    'swipes',
    'nabs',
    'snatches',
    'clinches',
    'captures',
    'earns',
    'attains',
    'acquires',
    'secures',
  ]
  const randomIndex = Math.floor(Math.random() * synonyms.length)
  return synonyms[randomIndex]
}

const History = ({ swaps }) => (
  <table className="table">
    <tbody>
    { swaps.map((swap, index) => (
      <tr style={{ margin: "1em 0" }} key={index}>
        <td>
          {timeString(swap.timestamp)}:<br />
          {swap.winnerName} (#{swap.loserRank}) {takesString()} the #{swap.winnerRank} spot from {swap.loserName}.
        </td>
      </tr>
    )) }
    </tbody>
  </table>
)

export default History