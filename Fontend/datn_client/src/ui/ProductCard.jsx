import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons"

const ProductCard = ({ product }) => {
  // Tính toán giá khuyến mãi
  const discountedPrice =
    product.discount > 0 ? product.price - (product.price * product.discount) / 100 : product.price

  // Format giá tiền theo định dạng VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  // Hiển thị các icon sao dựa vào rating
  const renderRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    // Thêm sao đầy
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-warning" />)
    }

    // Thêm nửa sao nếu có
    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-warning" />)
    }

    // Thêm sao rỗng nếu cần
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStarRegular} className="text-warning" />)
    }

    return stars
  }

  return (
    <div className="card h-100 product-card">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <img
          src={product.image || "/placeholder.svg"}
          className="card-img-top"
          alt={product.name}
          onError={(e) => {
            e.target.src = "https://placehold.co/400x500?text=Không+có+hình+ảnh"
          }}
        />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <h5 className="card-title text-truncate">{product.name}</h5>
        </Link>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            {product.discount > 0 ? (
              <>
                <span className="text-danger fw-bold">{formatPrice(discountedPrice)}</span>
                <span className="text-muted text-decoration-line-through ms-2">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="fw-bold">{formatPrice(product.price)}</span>
            )}
          </div>

          {product.discount > 0 && <span className="badge bg-danger">-{product.discount}%</span>}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>{product.rating && renderRatingStars(product.rating)}</div>
          <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-primary">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
