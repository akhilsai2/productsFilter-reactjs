import './index.css'

const Category = props => {
  const {item, activeCategory, isActive} = props
  const {categoryId, name} = item
  const category = () => {
    activeCategory(categoryId)
  }
  // console.log(isActive)
  const change = isActive ? 'colorItem' : null
  return (
    <li className="item-cont">
      <p className={`btn ${change}`} type="button" onClick={category}>
        {name}
      </p>
    </li>
  )
}
export default Category
