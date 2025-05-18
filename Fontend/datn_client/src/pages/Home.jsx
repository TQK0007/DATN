"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "../ui/Carousel";
import ProductCard from "../ui/ProductCard";
import { productApi } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faTruck,
  faMoneyBillWave,
  faHeadset,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        // Lấy sản phẩm nổi bật (sử dụng trang 1 với kích thước 8)
        const featuredResponse = await productApi.getProducts(1, { sortType: "bestSelling" })
        setFeaturedProducts(featuredResponse.products);

        // Lấy sản phẩm mới nhất (sử dụng trang 1 với kích thước 8)
        const newResponse = await productApi.getProducts(1, { sortType: "newest" })
        setNewProducts(newResponse.products);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Có lỗi xảy ra khi tải sản phẩm. Vui lòng thử lại sau.");
        setIsLoading(false);
      }
    };

    fetchProducts();
    // const interval = setInterval(() => {
    //   fetchProducts()
    // }, 5000) // 10 giây
    // return () => clearInterval(interval) // Dọn dẹp khi unmount
  }, []);

  // Dữ liệu carousel
  const carouselItems = [
    {
      image: "/images/carousel/bo su tap xuan he 2025.webp",
      title: "Bộ Sưu Tập Xuân Hè 2025",
      description:
        "Khám phá các sản phẩm mới nhất trong bộ sưu tập xuân hè của chúng tôi",
      button: {
        text: "Mua ngay",
        link: "/products",
      },
    },
    {
      image: "/images/carousel/thoi trang cong so 2025.png",
      title: "Thời Trang Công Sở",
      description: "Khám phá bộ sưu tập công sở  mới nhất của chúng tôi",
      button: {
        text: "Xem bộ sưu tập",
        link: "/products",
      },
    },
    {
      image: "/images/carousel/giam gia san pham.webp",
      title: "Giảm Giá Lên Đến 50%",
      description: "Ưu đãi đặc biệt cho các sản phẩm mùa hè",
      button: {
        text: "Xem ngay",
        link: "/products",
      },
    },
  ];

  // Danh mục nổi bật
  const featuredCategories = [
    {
      name: "Thời Trang Nam",
      image: "/images/carousel/thoi trang nam.jpg",
      link: "/products?gender=nam",
    },
    {
      name: "Thời Trang Nữ",
      image: "/images/carousel/thoi trang nu.webp",
      link: "/products?gender=nu",
    },
    {
      name: "Học Sinh",
      image: "/images/carousel/thoi trang hoc sinh.jpg",
      link: "/products?category=phu-kien",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <section className="hero-section mb-5">
        <Carousel items={carouselItems} />
      </section>

      {/* Featured Categories */}
      <section className="featured-categories py-5" style={{ height: "600px" }}>
        <div className="container h-100">
          <h2 className="text-center mb-4">Danh Mục Nổi Bật</h2>
          <div className="row h-100">
            {featuredCategories.map((category, index) => (
              <div key={index} className="col-md-4 mb-4">
                <Link to={category.link} className="text-decoration-none">
                  <div
                    className="card category-card"
                    style={{ height: "66.66%" }} // 2/3 chiều cao của section
                  >
                    <img
                      src={category.image || "/placeholder.svg"}
                      className="card-img-top"
                      alt={category.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                    <div className="card-img-overlay d-flex align-items-end justify-content-center">
                      <h3 className="card-title text-white bg-dark bg-opacity-50 px-2 py-1 rounded">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Sản Phẩm Nổi Bật</h2>
            <Link to="/products" className="btn btn-outline-primary">
              Xem tất cả <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="row">
              {featuredProducts.map((product) => (
                <div key={product.id} className="col-md-3 mb-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="new-products py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Sản Phẩm Mới</h2>
            <Link to="/products" className="btn btn-outline-primary">
              Xem tất cả <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="row">
              {newProducts.map((product) => (
                <div key={product.id} className="col-md-3 mb-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="features py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4 text-center">
              <div className="p-3">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="text-primary mb-3"
                  size="3x"
                />
                <h5>Miễn Phí Vận Chuyển</h5>
                <p className="text-muted">Cho đơn hàng trên 500.000đ</p>
              </div>
            </div>

            <div className="col-md-3 mb-4 text-center">
              <div className="p-3">
                <FontAwesomeIcon
                  icon={faMoneyBillWave}
                  className="text-primary mb-3"
                  size="3x"
                />
                <h5>Thanh Toán An Toàn</h5>
                <p className="text-muted">Thanh toán an toàn 100%</p>
              </div>
            </div>

            <div className="col-md-3 mb-4 text-center">
              <div className="p-3">
                <FontAwesomeIcon
                  icon={faHeadset}
                  className="text-primary mb-3"
                  size="3x"
                />
                <h5>Hỗ Trợ 24/7</h5>
                <p className="text-muted">Hỗ trợ trực tuyến 24/7</p>
              </div>
            </div>

            <div className="col-md-3 mb-4 text-center">
              <div className="p-3">
                <FontAwesomeIcon
                  icon={faUndo}
                  className="text-primary mb-3"
                  size="3x"
                />
                <h5>Dễ Dàng Đổi Trả</h5>
                <p className="text-muted">Trong vòng 30 ngày</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
