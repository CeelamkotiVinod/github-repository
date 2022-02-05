// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  //   console.log(eachRepo)
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = eachRepo

  return (
    <li className="repo-card">
      <img className="avatar-image" src={avatarUrl} alt={name} />
      <h1 className="repo-name">{name}</h1>
      <div className="details-container">
        <div className="details-content">
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="text">{starsCount} stars</p>
        </div>
        <div className="details-content">
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="text">{forksCount} forks</p>
        </div>
        <div className="details-content">
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="text">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
