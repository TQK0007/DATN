"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const YearlyRevenueChart = () => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Dữ liệu doanh thu theo năm (5 năm gần nhất)
    // const years = ["2019", "2020", "2021", "2022", "2025"]
    // const revenueData = [3200000, 4500000, 5800000, 7200000, 9500000]
    // const subscribersData = [120, 180, 240, 310, 450]

    //fake
    const years = ["2024","2025"]
    const revenueData = [1200000,1140000]
    const subscribersData = [4,6]
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: years,
        datasets: [
          {
            label: "Doanh thu",
            data: revenueData,
            borderColor: "#4c6ef5",
            backgroundColor: "rgba(76, 110, 245, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            yAxisID: "y",
          },
          {
            label: "Người đăng ký",
            data: subscribersData,
            borderColor: "#fc5c7d",
            backgroundColor: "rgba(252, 92, 125, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            align: "end",
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || ""
                if (label) {
                  label += ": "
                }
                if (context.dataset.yAxisID === "y") {
                  label += context.parsed.y.toLocaleString() + "đ"
                } else {
                  label += context.parsed.y
                }
                return label
              },
            },
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Doanh thu (đ)",
            },
            ticks: {
              callback: (value) => value.toLocaleString() + "đ",
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Số lượng",
            },
            grid: {
              drawOnChartArea: false,
            },
          },
          x: {
            title: {
              display: true,
              text: "Năm",
            },
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

  return <canvas ref={chartRef} />
}

export default YearlyRevenueChart
