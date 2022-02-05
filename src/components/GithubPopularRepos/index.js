import {Component} from 'react'
import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
    repositoryItemList: [],
  }

  componentDidMount() {
    this.getRepos()
  }

  renderPopularRepos = () => {
    const {repositoryItemList} = this.state
    // console.log(repositoryItemList)
    return (
      <ul className="repository-item-container">
        {repositoryItemList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} eachRepo={eachRepo} />
        ))}
      </ul>
    )
  }

  getRepos = async () => {
    const {activeTabId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(url)
    // console.log(data)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      //   console.log(updatedData)
      this.setState({
        repositoryItemList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateActiveTabId = id => {
    this.setState({activeTabId: id}, this.getRepos)
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  renderTabsList = () => {
    const {activeTabId} = this.state

    return (
      <ul className="tabs-container">
        {languageFiltersData.map(eachTab => (
          <LanguageFilterItem
            key={eachTab.id}
            eachTab={eachTab}
            activeTabId={activeTabId}
            updateActiveTabId={this.updateActiveTabId}
          />
        ))}
      </ul>
    )
  }

  renderPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderPopularRepos()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="main-heading">Popular</h1>
          {this.renderTabsList()}
          {/* {this.renderPopularRepos()} */}
          {this.renderPage()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
