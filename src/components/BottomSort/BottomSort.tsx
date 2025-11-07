import './BottomSort.css'

export default function BottomSort() {
  return (
<div className="bottom-sort">
  <button className="sort-option">
    <img src="/sort-button.svg" alt="Sort" className="sort-icon" />
  </button>
  <button className="sort-option">Waking up</button>
  <button className="sort-option">Favorite</button>
</div>
  )
}