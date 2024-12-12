import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import API_BASE_URL from '../config/api';

const Container = styled.div`
  padding: 1rem;
  overflow-x: auto;
  background: rgba(0, 0, 0, 0.8);
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #ffd700;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Th = styled.th`
  background-color: rgba(255, 215, 0, 0.1);
  padding: 0.75rem;
  text-align: left;
  color: #ffd700;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${({ status }) => {
    switch (status) {
      case 'pending':
        return 'rgba(255, 166, 0, 0.2)';
      case 'confirmed':
        return 'rgba(0, 255, 0, 0.2)';
      case 'completed':
        return 'rgba(0, 0, 255, 0.2)';
      case 'cancelled':
        return 'rgba(255, 0, 0, 0.2)';
      default:
        return 'rgba(128, 128, 128, 0.2)';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'pending':
        return '#ffa500';
      case 'confirmed':
        return '#00ff00';
      case 'completed':
        return '#4169e1';
      case 'cancelled':
        return '#ff0000';
      default:
        return '#808080';
    }
  }};
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  margin-right: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'confirm':
        return 'rgba(0, 255, 0, 0.2)';
      case 'cancel':
        return 'rgba(255, 0, 0, 0.2)';
      case 'complete':
        return 'rgba(0, 0, 255, 0.2)';
      default:
        return 'rgba(128, 128, 128, 0.2)';
    }
  }};
  color: ${({ variant }) => {
    switch (variant) {
      case 'confirm':
        return '#00ff00';
      case 'cancel':
        return '#ff0000';
      case 'complete':
        return '#4169e1';
      default:
        return '#808080';
    }
  }};

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function ReservationsManagementPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/reservations`);
      setReservations(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching reservations");
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusUpdate = async (reservationId, newStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/reservations/${reservationId}/status`, {
        status: newStatus
      });
      fetchReservations();
    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  };

  if (loading) return <Container><Title>Loading...</Title></Container>;
  if (error) return <Container><Title>Error: {error}</Title></Container>;

  return (
    <Container>
      <Title>Reservations Management</Title>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Car</Th>
            <Th>Customer</Th>
            <Th>Pickup Date</Th>
            <Th>Dropoff Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <Td>{reservation._id}</Td>
              <Td>
                {reservation.carId.make} {reservation.carId.model}
              </Td>
              <Td>
                {reservation.customer.firstName} {reservation.customer.lastName}
                <br />
                <small>{reservation.customer.email}</small>
              </Td>
              <Td>{new Date(reservation.pickupDate).toLocaleDateString()}</Td>
              <Td>{new Date(reservation.dropoffDate).toLocaleDateString()}</Td>
              <Td>
                <StatusBadge status={reservation.status}>
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </StatusBadge>
              </Td>
              <Td>
                {reservation.status === 'pending' && (
                  <>
                    <ActionButton
                      variant="confirm"
                      onClick={() => handleStatusUpdate(reservation._id, 'confirmed')}
                    >
                      Confirm
                    </ActionButton>
                    <ActionButton
                      variant="cancel"
                      onClick={() => handleStatusUpdate(reservation._id, 'cancelled')}
                    >
                      Cancel
                    </ActionButton>
                  </>
                )}
                {reservation.status === 'confirmed' && (
                  <>
                    <ActionButton
                      variant="complete"
                      onClick={() => handleStatusUpdate(reservation._id, 'completed')}
                    >
                      Complete
                    </ActionButton>
                    <ActionButton
                      variant="cancel"
                      onClick={() => handleStatusUpdate(reservation._id, 'cancelled')}
                    >
                      Cancel
                    </ActionButton>
                  </>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ReservationsManagementPage;
