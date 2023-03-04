import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Category from '../Category'
import Rating from '../Rating'
import './index.css'

class FiltersGroup extends Component {
  state = {searchInput: '', activeTab: '', activeRate: ''}

  clearOff = () => {
    const {addClear} = this.props
    this.setState({searchInput: '', activeTab: '', activeRate: ''})
    addClear()
  }

  searchProduct = event => {
    // console.log(event.key)
    // console.log(event.target.value)
    this.setState({searchInput: event.target.value})
    const {addSearch} = this.props
    if (event.key === 'Enter') {
      addSearch(event.target.value)
    }
  }

  clickCategory = id => {
    this.setState({activeTab: id})
    //   console.log(id)
    const {addCategory} = this.props
    addCategory(id)
  }

  clickRating = id => {
    this.setState({activeRate: id})
    const {addRating} = this.props
    addRating(id)
  }

  render() {
    const {searchInput, activeTab, activeRate} = this.state
    const {category, rating} = this.props
    //  console.log(activeTab)

    return (
      <div className="filters-group-container">
        <div className="search-cont">
          <input
            type="search"
            placeholder="Search"
            className="search"
            onKeyDown={this.searchProduct}
            onChange={this.searchProduct}
            value={searchInput}
          />
          <BsSearch className="icon" />
        </div>
        <div className="cont">
          <h4 className="category-head">Category</h4>
          <ul className="list-cont">
            {category.map(each => (
              <Category
                item={each}
                key={each.categoryId}
                activeCategory={this.clickCategory}
                isActive={activeTab === each.categoryId}
              />
            ))}
          </ul>
          <h4 className="category-head">Rating</h4>
          <ul className="rating-list-cont">
            {rating.map(each => (
              <Rating
                item={each}
                key={each.ratingId}
                activeRating={this.clickRating}
                Active={activeRate === each.ratingId}
              />
            ))}
          </ul>
          <button className="clear-btn" type="button" onClick={this.clearOff}>
            Clear Filters
          </button>
        </div>
      </div>
    )
  }
}
export default FiltersGroup
