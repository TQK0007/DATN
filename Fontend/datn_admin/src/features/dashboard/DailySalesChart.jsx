"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const DailySalesChart = () => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Tạo dữ liệu mẫu cho 7 ngày
    const labels = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - 6 + i)
      return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })
    })

    // Tạo dữ liệu ngẫu nhiên
    const generateRandomData = () => {
      return Array.from({ length: 7 }, () => Math.floor(Math.random() * 500000) + 100000)
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Doanh thu",
            data: generateRandomData(),
            borderColor: "#ffffff",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#1e88e5",
            bodyColor: "#333",
            borderColor: "#ddd",
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: (context) => context.parsed.y.toLocaleString() + "đ",
            },
          },
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
          x: {
            display: false,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="daily-sales-chart">
      <div className="daily-sales-info">
        <div className="daily-sales-period">25/03 - 02/04</div>
        <div className="daily-sales-amount">4.578.580đ</div>
      </div>
      <div className="daily-sales-canvas">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}

export default DailySalesChart
