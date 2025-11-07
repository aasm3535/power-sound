import { useState } from 'react'
import './SortSelector.css'

interface SortSelectorProps {
  options: string[]
  onChange?: (value: string) => void
}

export default function SortSelector({ options, onChange }: SortSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [blur, setBlur] = useState(false)

  const handleClick = () => {
    setBlur(true)
    const nextIndex = (selectedIndex + 1) % options.length
    setTimeout(() => {
      setSelectedIndex(nextIndex)
      setBlur(false)
      onChange?.(options[nextIndex])
    }, 300) // длительность блюра
  }

  return (
    <div className="sort-selector" onClick={handleClick}>
      <img src="/sort-icon.svg" alt="Sort" className="sort-icon" />
      <span className={`sort-text ${blur ? 'blur' : ''}`}>
        {options[selectedIndex]}
      </span>
    </div>
  )
}