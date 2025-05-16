import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* Thông tin cửa hàng */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">Shop Thời Trang</h5>
            <p>Shop thời trang chất lượng cao, mang đến cho bạn những sản phẩm tốt nhất với giá cả hợp lý.</p>
            <div className="mt-4">
              <a href="#" className="text-white me-3 fs-5">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="text-white me-3 fs-5">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-white me-3 fs-5">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-white fs-5">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Danh mục nhanh */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">Danh mục</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/products?gender=nam" className="text-white text-decoration-none">
                  Thời trang nam
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products?gender=nu" className="text-white text-decoration-none">
                  Thời trang nữ
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-white text-decoration-none">
                  Sản phẩm mới
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-white text-decoration-none">
                  Khuyến mãi
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên kết hữu ích */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">Liên kết</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">
                  Trang chủ
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-white text-decoration-none">
                  Sản phẩm
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  Về chúng tôi
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  Chính sách bảo mật
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none">
                  Điều khoản dịch vụ
                </a>
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase mb-4">Liên hệ</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                123 Đường ABC, Quận XYZ, Hà Nội
              </li>
              <li className="mb-3">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                0987 654 321
              </li>
              <li className="mb-3">
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                contact@shopthoi.vn
              </li>
            </ul>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <hr className="bg-light" />
            <p className="mb-0">&copy; {new Date().getFullYear()} Shop Thời Trang. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
