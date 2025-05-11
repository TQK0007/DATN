import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card, Row, Col, Table } from "react-bootstrap"

const Dashboard = () => {
  return (
    <div>
      <Row className="g-4 mb-4">
        <Col sm={6} md={3}>
          <Card>
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon me-3" style={{ backgroundColor: "#4c6ef5" }}>
                <FontAwesomeIcon icon="users" />
              </div>
              <div>
                <div className="text-muted small">Lượt truy cập</div>
                <div className="fs-4 fw-bold">1,294</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card>
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon me-3" style={{ backgroundColor: "#4dabf7" }}>
                <FontAwesomeIcon icon="users" />
              </div>
              <div>
                <div className="text-muted small">Người đăng ký</div>
                <div className="fs-4 fw-bold">1303</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card>
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon me-3" style={{ backgroundColor: "#40c057" }}>
                <FontAwesomeIcon icon="shopping-cart" />
              </div>
              <div>
                <div className="text-muted small">Doanh thu</div>
                <div className="fs-4 fw-bold">1.345.000đ</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card>
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon me-3" style={{ backgroundColor: "#7950f2" }}>
                <FontAwesomeIcon icon="check" />
              </div>
              <div>
                <div className="text-muted small">Đơn hàng</div>
                <div className="fs-4 fw-bold">576</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={6}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Khách hàng mới</h5>
                <button className="btn btn-link p-0">
                  <FontAwesomeIcon icon="ellipsis-h" />
                </button>
              </div>
              <div>
                {[
                  { name: "Jimmy Denis", role: "Nhà thiết kế đồ họa", initials: "J", color: "#4c6ef5" },
                  { name: "Chandra Felix", role: "Quảng cáo bán hàng", initials: "CF", color: "#7950f2" },
                  { name: "Talha", role: "Nhà thiết kế Front End", initials: "T", color: "#fd7e14" },
                  { name: "Chad", role: "CEO Zeleaf", initials: "C", color: "#adb5bd" },
                  { name: "Hizrian", role: "Nhà thiết kế Web", initials: "H", color: "#4c6ef5" },
                  { name: "Farrah", role: "Marketing", initials: "F", color: "#7950f2" },
                ].map((customer, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white me-3"
                        style={{ width: "40px", height: "40px", backgroundColor: customer.color }}
                      >
                        {customer.initials}
                      </div>
                      <div>
                        <div className="fw-bold">{customer.name}</div>
                        <div className="text-muted small">{customer.role}</div>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-link text-muted p-1">
                        <FontAwesomeIcon icon="envelope" />
                      </button>
                      <button className="btn btn-link text-muted p-1">
                        <FontAwesomeIcon icon="bell" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Lịch sử giao dịch</h5>
                <button className="btn btn-link p-0">
                  <FontAwesomeIcon icon="ellipsis-h" />
                </button>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>MÃ THANH TOÁN</th>
                    <th>NGÀY & GIỜ</th>
                    <th>SỐ TIỀN</th>
                    <th>TRẠNG THÁI</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(7)
                    .fill()
                    .map((_, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center me-2"
                              style={{
                                width: "25px",
                                height: "25px",
                                backgroundColor: "#d1f7dd",
                              }}
                            >
                              <FontAwesomeIcon icon="check" style={{ color: "#40c057" }} />
                            </div>
                            Thanh toán từ #10231
                          </div>
                        </td>
                        <td>19/03/2020, 14:45</td>
                        <td>250.000đ</td>
                        <td>
                          <span className="badge bg-success">Hoàn thành</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
