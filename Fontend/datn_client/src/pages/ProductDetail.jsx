"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCheck,
  faTruck,
  faUndo,
  faShieldAlt,
  faInfoCircle,
  faComments,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import RatingStars from "../ui/RatingStars";
import ProductCard from "../ui/ProductCard";
import { productApi, commentApi, cartApi } from "../services/api";
import { authService } from "../services/apiModuleUser";
import "../App.css";

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [availableAttributes, setAvailableAttributes] = useState([])
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(5)
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  // Format giá tiền theo định dạng VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  // Tính toán giá khuyến mãi
  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? price - (price * discount) / 100 : price
  }

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch product details
        const productData = await productApi.getProductDetail(id)
        setProduct(productData)
        setSelectedImage(productData.productAttributes[0]?.image || "")
        setAvailableAttributes(productData.productAttributes)

        // Fetch related products
        // const relatedData = await productApi.getRelatedProducts(productData.categoryId)
        // setRelatedProducts(relatedData)

        // Fetch comments
        const commentsData = await commentApi.getComments(id)
        setComments(commentsData)

        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching product details:", err)
        setError("Có lỗi xảy ra khi tải thông tin sản phẩm. Vui lòng thử lại sau.")
        setIsLoading(false)
      }
    }

    fetchProductDetails()
  }, [id])

  // Handle size selection
  const handleSizeChange = (size) => {
    setSelectedSize(size)
    // Reset color when size changes
    setSelectedColor("")
  }

  // Get available colors for selected size
  const getAvailableColors = () => {
    if (!selectedSize) return []
    return [...new Set(availableAttributes.filter((attr) => attr.size === selectedSize).map((attr) => attr.color))]
  }

  // Handle color selection
  const handleColorChange = (color) => {
    setSelectedColor(color)
    // Set the image for the selected size and color
    const selectedAttribute = availableAttributes.find((attr) => attr.size === selectedSize && attr.color === color)
    if (selectedAttribute) {
      setSelectedImage(selectedAttribute.image)
    }
  }

  // Get max quantity for selected attributes
  const getMaxQuantity = () => {
    if (!selectedSize || !selectedColor) return 0
    const selectedAttribute = availableAttributes.find(
      (attr) => attr.size === selectedSize && attr.color === selectedColor,
    )
    return selectedAttribute ? selectedAttribute.quality : 0
  }

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    const maxQty = getMaxQuantity()
    if (value > 0 && value <= maxQty) {
      setQuantity(value)
    }
  }

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Vui lòng chọn kích thước")
      return
    }
    if (!selectedColor) {
      toast.error("Vui lòng chọn màu sắc")
      return
    }

    const maxQty = getMaxQuantity()
    if (quantity > maxQty) {
      toast.error(`Chỉ còn ${maxQty} sản phẩm trong kho`)
      return
    }

    // Kiểm tra đăng nhập
    if (!authService.isAuthenticated()) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng")
      return
    }

    try {
      setIsAddingToCart(true)

      const cartId = authService.getCartId()
      if (!cartId) {
        toast.error("Không tìm thấy thông tin giỏ hàng. Vui lòng đăng nhập lại.")
        return
      }

      // Tìm thuộc tính sản phẩm đã chọn
      const selectedAttribute = availableAttributes.find(
        (attr) => attr.size === selectedSize && attr.color === selectedColor,
      )

      // Thêm vào giỏ hàng
      const cartItemData = {
        quality: quantity,
        image: selectedAttribute.image,
        size: selectedSize,
        color: selectedColor,
        price: calculateDiscountedPrice(product.price, product.discount),
        cartId: cartId,
        productId: Number(id),
      }

      await cartApi.createCartItem(cartItemData)

      // Trigger cart update event
      window.dispatchEvent(new Event("cartUpdated"))

      toast.success("Đã thêm sản phẩm vào giỏ hàng")

      // Reset selection
      setQuantity(1)
      setSelectedSize("")
      setSelectedColor("")
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại.")
    } finally {
      setIsAddingToCart(false)
    }
  }

  // Handle submit comment
  const handleSubmitComment = async (e) => {
    e.preventDefault()

    if (!authService.isAuthenticated()) {
      toast.error("Vui lòng đăng nhập để gửi đánh giá")
      return
    }

    if (!newComment.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá")
      return
    }

    try {
      setIsSubmittingComment(true)
      const user = authService.getCurrentUser()
      const commentData = {
        comment: newComment,
        rating: newRating,
        userId: user.id,
        productId: Number.parseInt(id),
      }

      await commentApi.createComment(commentData)

      // Refresh comments
      const commentsData = await commentApi.getComments(id)
      setComments(commentsData)

      // Reset form
      setNewComment("")
      setNewRating(5)
      toast.success("Đánh giá của bạn đã được gửi thành công")
    } catch (err) {
      console.error("Error submitting comment:", err)
      toast.error("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.")
    } finally {
      setIsSubmittingComment(false)
    }
  }

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Không tìm thấy sản phẩm</div>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="product-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Trang chủ</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/products">Sản phẩm</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="row mb-5">
          {/* Product Images */}
          <div className="col-md-6 mb-4">
            <div className="product-images">
              <div className="main-image">
                <img
                  src={selectedImage || product.productAttributes[0]?.image}
                  alt={product.name}
                  className="img-fluid"
                />
              </div>
              <div className="image-thumbnails">
                {product.productAttributes.map((attr, index) => (
                  <div
                    key={index}
                    className={`thumbnail-item ${selectedImage === attr.image ? "active" : ""}`}
                    onClick={() => setSelectedImage(attr.image)}
                  >
                    <img
                      src={attr.image || "/placeholder.svg"}
                      alt={`${product.name} - ${attr.color}`}
                      className="img-thumbnail"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-6 product-info">
            <h1>{product.name}</h1>

            <div className="product-price mb-3">
              {product.discount > 0 ? (
                <>
                  {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                  <span className="original-price">{formatPrice(product.price)}</span>
                  <span className="badge bg-danger ms-2">-{product.discount}%</span>
                </>
              ) : (
                formatPrice(product.price)
              )}
            </div>

            <div className="product-description mb-4">
              <p>{product.description}</p>
            </div>

            <div className="product-options">
              <div className="mb-3">
                <p className="mb-2">
                  <strong>Danh mục:</strong> {product.categoryName}
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-3">
                <label className="option-label">Kích thước:</label>
                <div className="size-options">
                  {[...new Set(availableAttributes.map((attr) => attr.size))].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`size-option ${selectedSize === size ? "active" : ""}`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-3">
                <label className="option-label">Màu sắc:</label>
                <div className="color-options">
                  {getAvailableColors().map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${selectedColor === color ? "active" : ""}`}
                      onClick={() => handleColorChange(color)}
                      disabled={!selectedSize}
                    >
                      {color}
                    </button>
                  ))}
                </div>
                {!selectedSize && <small className="text-muted">Vui lòng chọn kích thước trước</small>}
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="quantity-label">Số lượng:</label>
                <div className="d-flex align-items-center">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={!selectedColor || !selectedSize}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={getMaxQuantity()}
                      disabled={!selectedColor || !selectedSize}
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => quantity < getMaxQuantity() && setQuantity(quantity + 1)}
                      disabled={!selectedColor || !selectedSize}
                    >
                      +
                    </button>
                  </div>
                  <span className="quantity-message">
                    {selectedSize && selectedColor
                      ? `Còn ${getMaxQuantity()} sản phẩm`
                      : "Vui lòng chọn kích thước và màu sắc"}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                className="btn btn-primary add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || getMaxQuantity() === 0 || isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang thêm...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                    Thêm vào giỏ hàng
                  </>
                )}
              </button>

              {/* Product Benefits */}
              <div className="product-benefits">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div className="benefit-text">Sản phẩm chính hãng 100%</div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FontAwesomeIcon icon={faTruck} />
                  </div>
                  <div className="benefit-text">Giao hàng toàn quốc</div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FontAwesomeIcon icon={faUndo} />
                  </div>
                  <div className="benefit-text">Đổi trả trong vòng 30 ngày</div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FontAwesomeIcon icon={faShieldAlt} />
                  </div>
                  <div className="benefit-text">Bảo hành 12 tháng</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <ul className="nav nav-tabs" id="productTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "description" ? "active" : ""}`}
                onClick={() => handleTabChange("description")}
                type="button"
                role="tab"
              >
                <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                Mô tả sản phẩm
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "additional" ? "active" : ""}`}
                onClick={() => handleTabChange("additional")}
                type="button"
                role="tab"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                Thông tin bổ sung
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => handleTabChange("reviews")}
                type="button"
                role="tab"
              >
                <FontAwesomeIcon icon={faComments} className="me-2" />
                Đánh giá
                <span className="tab-counter">{comments.length}</span>
              </button>
            </li>
          </ul>
          <div className="tab-content" id="productTabsContent">
            {/* Description Tab */}
            <div
              className={`tab-pane fade ${activeTab === "description" ? "show active" : ""}`}
              id="description"
              role="tabpanel"
            >
              <p>{product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}</p>
            </div>

            {/* Additional Information Tab */}
            <div
              className={`tab-pane fade ${activeTab === "additional" ? "show active" : ""}`}
              id="additional"
              role="tabpanel"
            >
              <div className="row">
                <div className="col-md-6">
                  <h5 className="mb-3">Thông số sản phẩm</h5>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Danh mục</th>
                        <td>{product.categoryName}</td>
                      </tr>
                      <tr>
                        <th>Chất liệu</th>
                        <td>Cotton</td>
                      </tr>
                      <tr>
                        <th>Xuất xứ</th>
                        <td>Việt Nam</td>
                      </tr>
                      <tr>
                        <th>Kích thước</th>
                        <td>{[...new Set(availableAttributes.map((attr) => attr.size))].join(", ")}</td>
                      </tr>
                      <tr>
                        <th>Màu sắc</th>
                        <td>{[...new Set(availableAttributes.map((attr) => attr.color))].join(", ")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <h5 className="mb-3">Hướng dẫn bảo quản</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Giặt máy ở nhiệt độ thường</li>
                    <li className="list-group-item">Không sử dụng chất tẩy</li>
                    <li className="list-group-item">Ủi ở nhiệt độ thấp</li>
                    <li className="list-group-item">Không sấy khô</li>
                    <li className="list-group-item">Phơi trong bóng râm</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Reviews Tab */}
            <div
              className={`tab-pane fade ${activeTab === "reviews" ? "show active" : ""}`}
              id="reviews"
              role="tabpanel"
            >
              {/* Review List */}
              <div className="review-list">
                <h4 className="mb-4">Đánh giá từ khách hàng ({comments.length})</h4>
                {comments.length === 0 ? (
                  <p className="text-muted">Chưa có đánh giá nào cho sản phẩm này.</p>
                ) : (
                  comments.map((comment, index) => (
                    <div key={index} className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">
                            <img src="https://placehold.co/100x100?text=User" alt="Avatar" />
                          </div>
                          <div>
                            <div className="reviewer-name">Khách hàng</div>
                            <div className="review-date">{new Date(comment.createdAt).toLocaleDateString("vi-VN")}</div>
                          </div>
                        </div>
                      </div>
                      <div className="review-rating">
                        <RatingStars rating={comment.rating} readOnly={true} />
                      </div>
                      <div className="review-content">{comment.comment}</div>
                    </div>
                  ))
                )}
              </div>

              {/* Review Form */}
              <div className="review-form">
                <h4>Viết đánh giá của bạn</h4>
                <form onSubmit={handleSubmitComment}>
                  <div className="rating-select mb-3">
                    <label className="rating-label">Đánh giá của bạn:</label>
                    <RatingStars rating={newRating} setRating={setNewRating} size="lg" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="comment" className="form-label">
                      Nhận xét:
                    </label>
                    <textarea
                      className="form-control"
                      id="comment"
                      rows="4"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary submit-review-btn" disabled={isSubmittingComment}>
                    {isSubmittingComment ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Đang gửi...
                      </>
                    ) : (
                      "Gửi đánh giá"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="row related-products">
          <div className="col-12">
            <h3>Sản phẩm liên quan</h3>
            <div className="row">
              {relatedProducts.length === 0 ? (
                <p className="text-muted">Không có sản phẩm liên quan.</p>
              ) : (
                relatedProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="col-md-3 mb-4">
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
