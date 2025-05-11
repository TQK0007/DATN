import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "react-bootstrap"

const CustomerList = ({ customers }) => {
  const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return ""
    if (!firstName) return lastName.charAt(0)
    if (!lastName) return firstName.charAt(0)
    return firstName.charAt(0) + lastName.charAt(0)
  }

  const getRandomColor = (index) => {
    const colors = ["#4c6ef5", "#7950f2", "#fd7e14", "#adb5bd", "#4c6ef5", "#7950f2"]
    return colors[index % colors.length]
  }

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Khách hàng mới</h5>
          <button className="btn btn-link p-0">
            <FontAwesomeIcon icon="ellipsis-h" />
          </button>
        </div>
        <div>
          {customers.map((customer, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white me-3"
                  style={{ width: "40px", height: "40px", backgroundColor: getRandomColor(index) }}
                >
                  {customer.initials || getInitials(customer.firstName, customer.lastName)}
                </div>
                <div>
                  <div className="fw-bold">{customer.name || `${customer.firstName} ${customer.lastName}`}</div>
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
  )
}

export default CustomerList
