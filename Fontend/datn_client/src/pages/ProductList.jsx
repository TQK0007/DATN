"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faTimes, faSort } from "@fortawesome/free-solid-svg-icons"
import ProductCard from "../ui/ProductCard"
import { productApi } from "../services/api"
import "../App.css"

const ProductList = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  // State
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [filters, setFilters] = useState({
    gender: queryParams.get("gender") || "",
    collection: queryParams.get("collection") || "",
    minPrice: queryParams.get("minPrice") || "",
    maxPrice: queryParams.get("maxPrice") || "",
    search: queryParams.get("search") || "",
    sort: "newest",
  })
  const [showFilters, setShowFilters] = useState(false)

  // Danh sách bộ sưu tập
  const collections = [
    { id: "mua-he", name: "Bộ sưu tập mùa hè" },
    { id: "mua-dong", name: "Bộ sưu tập mùa đông" },
    { id: "the-thao", name: "Thể thao" },
    { id: "cong-so", name: "Công sở" },
  ]

  // Danh sách sắp xếp
  const sortOptions = [
    { value: "newest", label: "Mới nhất" },
    { value: "price-asc", label: "Giá: Thấp đến cao" },
    { value: "price-desc", label: "Giá: Cao đến thấp" },
    { value: "name-asc", label: "Tên: A-Z" },
    { value: "name-desc", label: "Tên: Z-A" },
  ]

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const data = await productApi.getProducts(currentPage, filters)
        setProducts(data)
        setTotalItems(data.length + 1) // Giả sử có 6 sản phẩm
        setTotalPages(Math.ceil(data.length / itemsPerPage) + 1) // Giả sử có 2 trang
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Có lỗi xảy ra khi tải sản phẩm. Vui lòng thử lại sau.")
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, filters])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.gender) params.append("gender", filters.gender)
    if (filters.collection) params.append("collection", filters.collection)
    if (filters.minPrice) params.append("minPrice", filters.minPrice)
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice)
    if (filters.search) params.append("search", filters.search)

    navigate(`/products?${params.toString()}`)
  }, [filters, navigate])

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      gender: "",
      collection: "",
      minPrice: "",
      maxPrice: "",
      search: "",
      sort: "newest",
    })
    setCurrentPage(1)
  }

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  // Calculate start and end item numbers
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="product-list-page py-5">
      <div className="container">
        <h1 className="mb-4">Sản Phẩm</h1>

        {/* Mobile filter toggle */}
        <div className="d-lg-none mb-3">
          <button className="btn btn-outline-primary w-100" onClick={() => setShowFilters(!showFilters)}>
            <FontAwesomeIcon icon={faFilter} className="me-2" />
            {showFilters ? "Ẩn bộ lọc" : "Hiển thị bộ lọc"}
          </button>
        </div>

        <div className="row">
          {/* Filters - Desktop (always visible) and Mobile (toggleable) */}
          <div className={`col-lg-3 mb-4 ${showFilters ? "d-block" : "d-none d-lg-block"}`}>
            <div className="filter-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Bộ lọc</h5>
                <button className="btn btn-sm btn-outline-secondary" onClick={clearFilters}>
                  <FontAwesomeIcon icon={faTimes} className="me-1" /> Xóa
                </button>
              </div>
              {/* Gender Filter */}
              <div className="mb-4">
                <h6 className="mb-3">Giới tính</h6>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="genderAll"
                    value=""
                    checked={filters.gender === ""}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="genderAll">
                    Tất cả
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="genderMale"
                    value="nam"
                    checked={filters.gender === "nam"}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="genderMale">
                    Nam
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="genderFemale"
                    value="nu"
                    checked={filters.gender === "nu"}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="genderFemale">
                    Nữ
                  </label>
                </div>
              </div>

              {/* Collection Filter */}
              <div className="mb-4">
                <h6 className="mb-3">Bộ sưu tập</h6>
                <select
                  className="form-select"
                  name="collection"
                  value={filters.collection}
                  onChange={handleFilterChange}
                >
                  <option value="">Tất cả bộ sưu tập</option>
                  {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                      {collection.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-4">
                <h6 className="mb-3">Khoảng giá</h6>
                <div className="row g-2">
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Từ"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      min="0"
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Đến"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Search Filter */}
              <div>
                <h6 className="mb-3">Tìm kiếm</h6>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên sản phẩm..."
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9">
            {/* Sort options */}
            <div className="sort-dropdown">
              <label htmlFor="sort">
                <FontAwesomeIcon icon={faSort} className="me-2" /> Sắp xếp:
              </label>
              <select className="form-select" id="sort" name="sort" value={filters.sort} onChange={handleFilterChange}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Đang tải...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : products.length === 0 ? (
              <div className="alert alert-info">
                Không tìm thấy sản phẩm nào phù hợp với bộ lọc. Vui lòng thử lại với bộ lọc khác.
              </div>
            ) : (
              <div className="row">
                {products.map((product) => (
                  <div key={product.id} className="col-md-4 col-lg-4 mb-4">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && !error && products.length > 0 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  Hiển thị {startItem} đến {endItem} của {totalItems} kết quả
                </div>
                <div className="pagination-controls">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Trước
                  </button>
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Tiếp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
