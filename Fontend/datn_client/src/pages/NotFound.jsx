import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle, faHome } from "@fortawesome/free-solid-svg-icons"

const NotFound = () => {
  return (
    <div className="not-found-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="mb-4">
              <FontAwesomeIcon icon={faExclamationTriangle} size="5x" className="text-warning" />
            </div>
            <h1 className="display-4 mb-3">404</h1>
            <h2 className="mb-4">Không tìm thấy trang</h2>
            <p className="lead mb-5">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
            <Link to="/" className="btn btn-primary btn-lg">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
