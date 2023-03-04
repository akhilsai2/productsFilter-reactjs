import './index.css'

const Rating = props => {
  const {item, activeRating, Active} = props
  const {ratingId, imageUrl} = item
  const rateId = () => {
    activeRating(ratingId)
  }
  // console.log(Active)
  const change1 = Active ? 'colorItemRating' : null

  return (
    <li className="rate-item">
      <button
        className={`button-cont ${change1}`}
        type="button"
        onClick={rateId}
      >
        <img src={imageUrl} alt={`rating ${ratingId}`} className="rating-img" />
        & up
      </button>
    </li>
  )
}
export default Rating
