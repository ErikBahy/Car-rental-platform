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

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddCarButton = styled(Button)`
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
`;

const CarImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    width: 80%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    grid-column: 1 / -1;
  }
`;

function CarsManagementPage() {
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedCar, setSelectedCar] = useState(null);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [registrationYear, setRegistrationYear] = useState("");
  const [price, setPrice] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [seating, setSeating] = useState("");
  const [motorPower, setMotorPower] = useState("");
  const [favouriteImage, setFavouriteImage] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [features, setFeatures] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const openModal = (mode, car = null) => {
    setModalMode(mode);
    setSelectedCar(car);
    if (car) {
      setMake(car.make);
      setModel(car.model);
      setRegistrationYear(car.registrationYear);
      setPrice(car.price);
      setTransmission(car.transmission);
      setFuelType(car.fuelType);
      setSeating(car.seating);
      setMotorPower(car.motorPower);
      setFavouriteImage(car.favouriteImage);
      setIsFavourite(car.isFavourite);
      setFeatures(car.features);
      setPhotos(car.photos);
    } else {
      setMake("");
      setModel("");
      setRegistrationYear("");
      setPrice("");
      setTransmission("");
      setFuelType("");
      setSeating("");
      setMotorPower("");
      setFavouriteImage("");
      setIsFavourite(false);
      setFeatures([]);
      setPhotos([]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = {
      make,
      model,
      registrationYear: Number(registrationYear),
      price: Number(price),
      transmission,
      fuelType,
      seating: Number(seating),
      motorPower,
      isFavourite,
      favouriteImage,
      features,
      photos,
    };

    try {
      if (modalMode === "add") {
        await axios.post("http://localhost:5000/api/cars", carData);
      } else {
        await axios.put(`http://localhost:5000/api/cars/${selectedCar._id}`, carData);
      }
      fetchCars();
      closeModal();
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cars/${id}`);
        fetchCars();
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  return (
    <Container>
      <Title>Cars Management</Title>
      <AddCarButton onClick={() => openModal("add")}>Add Car</AddCarButton>
      <Table>
        <thead>
          <tr>
            <Th>Image</Th>
            <Th>Make</Th>
            <Th>Model</Th>
            <Th>Year</Th>
            <Th>Price</Th>
            <Th>Transmission</Th>
            <Th>Fuel Type</Th>
            <Th>Seating</Th>
            <Th>Motor Power</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <Td>
                {car.favouriteImage && (
                  <CarImage src={car.favouriteImage} alt={`${car.make} ${car.model}`} />
                )}
              </Td>
              <Td>{car.make}</Td>
              <Td>{car.model}</Td>
              <Td>{car.registrationYear}</Td>
              <Td>${car.price}/day</Td>
              <Td>{car.transmission}</Td>
              <Td>{car.fuelType}</Td>
              <Td>{car.seating}</Td>
              <Td>{car.motorPower}</Td>
              <Td>
                <Button onClick={() => openModal("edit", car)}>Edit</Button>
                <Button onClick={() => handleDelete(car._id)}>Delete</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>{modalMode === "add" ? "Add Car" : "Edit Car"}</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Make:</Label>
                <Input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Model:</Label>
                <Input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Registration Year:</Label>
                <Input
                  type="number"
                  value={registrationYear}
                  onChange={(e) => setRegistrationYear(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Price per day:</Label>
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Transmission:</Label>
                <Select value={transmission} onChange={(e) => setTransmission(e.target.value)} required>
                  <option value="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Fuel Type:</Label>
                <Select value={fuelType} onChange={(e) => setFuelType(e.target.value)} required>
                  <option value="">Select fuel type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Seating:</Label>
                <Input type="number" value={seating} onChange={(e) => setSeating(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Motor Power:</Label>
                <Input type="text" value={motorPower} onChange={(e) => setMotorPower(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Is Favourite:</Label>
                <Input
                  type="checkbox"
                  checked={isFavourite}
                  onChange={(e) => setIsFavourite(e.target.checked)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Favorite Image URL:</Label>
                <Input
                  type="url"
                  value={favouriteImage}
                  onChange={(e) => setFavouriteImage(e.target.value)}
                  disabled={!isFavourite}
                  required={isFavourite}
                />
              </FormGroup>
              <FormGroup>
                <Label>Features (comma-separated):</Label>
                <Input
                  type="text"
                  value={features.join(", ")}
                  onChange={(e) => setFeatures(e.target.value.split(", "))}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Photos (comma-separated URLs):</Label>
                <Input
                  type="text"
                  value={photos.join(", ")}
                  onChange={(e) => setPhotos(e.target.value.split(", "))}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <Button type="submit">{modalMode === "add" ? "Add Car" : "Update Car"}</Button>
                <Button type="button" onClick={closeModal}>Cancel</Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default CarsManagementPage;