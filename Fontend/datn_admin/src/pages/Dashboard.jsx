"use client";

import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { dashboardApi } from "../services/api";
import { dashboardApiModuleProudct } from "../services/apiModuleManageProduct";
import StatCard from "../features/dashboard/StatCard";
import CustomerList from "../features/dashboard/CustomerList";
import TransactionHistory from "../features/dashboard/TransactionHistory";
import MonthlyRevenueChart from "../features/dashboard/MonthlyRevenueChart";
import YearlyRevenueChart from "../features/dashboard/YearlyRevenueChart";
import "./Dashboard.css";

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [statistics2, setStatistics2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Trong môi trường thực tế, bạn sẽ gọi API thực
      // const data = await dashboardApi.getStatistics()
      const data = await dashboardApi.getStatistical(); // Sử dụng dữ liệu mẫu
      setStatistics(data);
      const data2 = await dashboardApiModuleProudct.getStatistical();
      setStatistics2(data2);
    } catch (error) {
      console.error("Không thể tải dữ liệu thống kê:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !statistics) {
    return <div>Đang tải dữ liệu...</div>;
  }

  // Dữ liệu giao dịch mẫu
  const transactions = [
    {
      paymentNumber: "Thanh toán từ #4",
      dateTime: "04/05/2025, 00:41",
      amount: "240.000đ",
      status: "Hoàn thành",
    },
    {
      paymentNumber: "Thanh toán từ #7",
      dateTime: "16/05/2025, 15:45",
      amount: "900.000đ",
      status: "Hoàn thành",
    },
  ];

  return (
    <div className="dashboard-container">
      <Row className="g-4 mb-4">
        <Col sm={6} md={3}>
          <StatCard
            icon="clipboard-list"
            iconColor="#4c6ef5"
            label="Tổng đơn hàng"
            value={statistics2.totalOrder}
          />
        </Col>
        <Col sm={6} md={3}>
          <StatCard
            icon="users"
            iconColor="#4dabf7"
            label="Người đăng ký"
            value={statistics.totalSubscriber}
          />
        </Col>
        <Col sm={6} md={3}>
          <StatCard
            icon="shopping-cart"
            iconColor="#40c057"
            label="Doanh thu"
            value={statistics2.totalRevenue.toLocaleString()}
            prefix=""
          />
        </Col>
        <Col sm={6} md={3}>
          <StatCard
            icon="check"
            iconColor="#7950f2"
            label="Đơn hàng đã thanh toán"
            value={statistics2.totalOrderIsPaid}
          />
        </Col>
      </Row>

      {/* Biểu đồ doanh thu theo tháng và theo năm trên cùng một hàng */}
      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title mb-4">Doanh thu theo tháng</h5>
              <div style={{ height: "300px" }}>
                <MonthlyRevenueChart data={statistics2.monthlyRevenue} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title mb-4">Doanh thu theo năm</h5>
              <div style={{ height: "300px" }}>
                <YearlyRevenueChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Danh sách khách hàng mới và lịch sử giao dịch trên cùng một hàng */}
      <Row className="g-4">
        <Col lg={6}>
          <CustomerList customers={statistics.users} />
        </Col>
        <Col lg={6}>
          <TransactionHistory transactions={transactions} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
