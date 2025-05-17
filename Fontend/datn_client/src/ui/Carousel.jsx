"use client"

import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef(null)

  // Xử lý chuyển sang slide trước
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  // Xử lý chuyển sang slide tiếp theo
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }

  // Xử lý khi click vào indicator
  const handleIndicatorClick = (index) => {
    setActiveIndex(index)
  }

  // Thiết lập auto play
  useEffect(() => {
    // Bắt đầu auto play
    intervalRef.current = setInterval(() => {
      handleNext()
    }, 5000) // Chuyển slide sau mỗi 5 giây

    // Dọn dẹp interval khi component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [items.length])

  // Dừng auto play khi hover vào carousel
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  // Tiếp tục auto play khi rời chuột khỏi carousel
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      handleNext()
    }, 5000)
  }

  return (
    <div id="carousel" className="carousel slide" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Indicators */}
      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={`indicator-${index}`}
            type="button"
            data-bs-target="#carousel"
            className={index === activeIndex ? "active" : ""}
            onClick={() => handleIndicatorClick(index)}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Carousel Items */}
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div key={`carousel-item-${index}`} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
            <img
              src={item.image || "/placeholder.svg"}
              className="d-block w-100"
              alt={item.title || `Slide ${index + 1}`}
            />

            {(item.title || item.description) && (
              <div className="carousel-caption">
                {item.title && <h1>{item.title}</h1>}
                {item.subtitle && <h2>{item.subtitle}</h2>}
                {item.description && <p>{item.description}</p>}
                {item.button && (
                  <a href={item.button.link} className="btn btn-primary">
                    {item.button.text}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" onClick={handlePrev}>
        <span className="carousel-control-prev-icon" aria-hidden="true">
          <FontAwesomeIcon icon={faChevronLeft} className="text-white fs-3" />
        </span>
        <span className="visually-hidden">Trước</span>
      </button>

      <button className="carousel-control-next" type="button" onClick={handleNext}>
        <span className="carousel-control-next-icon" aria-hidden="true">
          <FontAwesomeIcon icon={faChevronRight} className="text-white fs-3" />
        </span>
        <span className="visually-hidden">Tiếp</span>
      </button>
    </div>
  )
}

export default Carousel
