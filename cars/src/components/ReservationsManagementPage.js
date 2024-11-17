import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
  overflow-x: auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 0.5rem;
  text-align: left;

  @media (min-width: 768px) {
    padding: 0.75rem;
  }
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;

  @media (min-width: 768px) {
    padding: 0.75rem;
  }
`;

function ReservationsManagementPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Replace with your actual API endpoint
    axios
      .get("https://api.example.com/reservations")
      .then((response) => setReservations(response.data))
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

  return (
    <Container>
      <Title>Reservations Management</Title>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Car</Th>
            <Th>Customer</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <Td>{reservation.id}</Td>
              <Td>
                {reservation.car.make} {reservation.car.model}
              </Td>
              <Td>{reservation.customer.name}</Td>
              <Td>{reservation.startDate}</Td>
              <Td>{reservation.endDate}</Td>
              <Td>{reservation.status}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ReservationsManagementPage;
