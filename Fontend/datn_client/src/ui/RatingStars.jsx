"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons"

const RatingStars = ({ rating, setRating, size = "md", readOnly = false }) => {
  const [hoverRating, setHoverRating] = useState(0)

  // Kích thước icon dựa vào prop size
  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "fa-sm"
      case "lg":
        return "fa-lg"
      case "xl":
        return "fa-2x"
      default:
        return ""
    }
  }

  const handleClick = (value) => {
    if (!readOnly) {
      setRating(value)
    }
  }

  const handleMouseOver = (value) => {
    if (!readOnly) {
      setHoverRating(value)
    }
  }

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0)
    }
  }

  const renderStar = (index) => {
    const value = index + 1

    // Xác định giá trị hiển thị (dựa vào hover hoặc rating thực tế)
    const displayValue = hoverRating || rating

    // Xác định loại sao (đầy, nửa, hoặc rỗng)
    let starIcon
    if (value <= displayValue) {
      starIcon = faStar // Sao đầy
    } else if (value - 0.5 <= displayValue) {
      starIcon = faStarHalfAlt // Nửa sao
    } else {
      starIcon = faStarRegular // Sao rỗng
    }

    return (
      <FontAwesomeIcon
        key={index}
        icon={starIcon}
        className={`text-warning ${getIconSize()} ${!readOnly ? "cursor-pointer" : ""}`}
        onClick={() => handleClick(value)}
        onMouseOver={() => handleMouseOver(value)}
        style={{ cursor: !readOnly ? "pointer" : "default" }}
      />
    )
  }

  return (
    <div className="rating-stars d-inline-block" onMouseLeave={handleMouseLeave}>
      {[...Array(5)].map((_, index) => renderStar(index))}
    </div>
  )
}

export default RatingStars
