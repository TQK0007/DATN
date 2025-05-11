import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card, Table, Badge } from "react-bootstrap"

const TransactionHistory = ({ transactions }) => {
  return (
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
            {transactions.map((transaction, index) => (
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
                    {transaction.paymentNumber}
                  </div>
                </td>
                <td>{transaction.dateTime}</td>
                <td>{transaction.amount}</td>
                <td>
                  <Badge bg="success">{transaction.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default TransactionHistory
