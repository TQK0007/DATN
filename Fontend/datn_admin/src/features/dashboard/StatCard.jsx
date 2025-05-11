import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "react-bootstrap"

const StatCard = ({ icon, iconColor, label, value, prefix = "" }) => {
  return (
    <Card>
      <Card.Body className="d-flex align-items-center">
        <div className="stat-icon me-3" style={{ backgroundColor: iconColor }}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div>
          <div className="text-muted small">{label}</div>
          <div className="fs-4 fw-bold">
            {prefix}
            {value}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default StatCard
