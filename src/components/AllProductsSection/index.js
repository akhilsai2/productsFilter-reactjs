import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    search: '',
    activeCategory: '',
    activeRating: '',
    status: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, search, activeCategory, activeRating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategory}&title_search=${search}&rating=${activeRating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({status: 'failure'})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  presentRating = id => {
    //  console.log(id)
    this.setState({activeRating: id}, this.getProducts)
  }

  presentCategory = id => {
    this.setState({activeCategory: id}, this.getProducts)
  }

  presentSearch = data => {
    console.log(data)
    this.setState({search: data}, this.getProducts)
  }

  clearFilter = () => {
    this.setState(
      {search: '', activeCategory: '', activeRating: ''},
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    if (productsList.length === 0) {
      return (
        <div className="no-product-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no product"
            className="no-image"
          />
          <h1 className="no-head">No Products Found</h1>
          <p className="no-para">
            We could not find any products, Try other filters.
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading, status} = this.state

    switch (status) {
      case 'failure':
        return (
          <div className="all-products-section">
            {/* TODO: Update the below element */}
            <FiltersGroup
              category={categoryOptions}
              rating={ratingsList}
              addRating={this.presentRating}
              addCategory={this.presentCategory}
              addSearch={this.presentSearch}
              addClear={this.clearFilter}
            />
            <div className="no-product-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
                alt="products failure"
                className="no-image"
              />
              <h1 className="no-head">Oops! Something Went Wrong</h1>
              <p className="no-para">
                We are having some trouble processing your request.Please try
                again.
              </p>
            </div>
          </div>
        )

      default:
        return (
          <div className="all-products-section">
            {/* TODO: Update the below element */}
            <FiltersGroup
              category={categoryOptions}
              rating={ratingsList}
              addRating={this.presentRating}
              addCategory={this.presentCategory}
              addSearch={this.presentSearch}
              addClear={this.clearFilter}
            />

            {isLoading ? this.renderLoader() : this.renderProductsList()}
          </div>
        )
    }
  }
}

export default AllProductsSection
