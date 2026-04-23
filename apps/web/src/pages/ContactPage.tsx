import React from "react";
import { Row, Col, Typography } from "antd";
import { ContactForm, CompanyInfoBlock, COMPANY_INFO } from "@space-tourism/ui";

const { Title } = Typography;

export default function ContactPage() {
  return (
    <div
      style={{
        background: "#0A0A0F",
        minHeight: "100vh",
        padding: "4rem 1.5rem",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Title
          level={1}
          style={{ color: "#E8E8E8", marginBottom: "2.5rem" }}
          data-testid="contact-heading"
        >
          Contact Us
        </Title>
        <Row gutter={[48, 48]} align="top">
          <Col xs={24} md={14}>
            <ContactForm />
          </Col>
          <Col xs={24} md={10}>
            <CompanyInfoBlock companyInfo={COMPANY_INFO} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
