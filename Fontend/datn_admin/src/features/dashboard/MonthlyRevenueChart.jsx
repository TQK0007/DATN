"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const MonthlyRevenueChart = ({ data }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    const months = Object.keys(data)
    const values = Object.values(data)

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Doanh thu",
            data: values,
            backgroundColor: "#1e88e5",
            borderColor: "#1e88e5",
            borderWidth: 1,
            borderRadius: 4,
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
          title: {
            display: false,
            text: "Doanh thu theo tháng",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              drawBorder: false,
            },
            ticks: {
              callback: (value) => value.toLocaleString() + "đ",
            },
          },
          x: {
            grid: {
              display: false,
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
  }, [data])

  return <canvas ref={chartRef} />
}

export default MonthlyRevenueChart
