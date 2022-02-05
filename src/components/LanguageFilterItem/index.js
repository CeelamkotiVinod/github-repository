// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachTab, updateActiveTabId, activeTabId} = props
  const {id, language} = eachTab
  const activeTabClassName = activeTabId === id ? 'active-tab' : ''

  const onClickTabId = () => {
    // console.log(id)
    updateActiveTabId(id)
  }

  return (
    <li className="list-item">
      <button
        type="button"
        className={`tab-button ${activeTabClassName}`}
        onClick={onClickTabId}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
