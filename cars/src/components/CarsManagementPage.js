import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
  z-index: 9999;
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

const PreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  
  button {
    position: absolute;
    top: -8px;
    right: -8px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
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
  const [features, setFeatures] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

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
      setFeatures(car.features);
    } else {
      setMake("");
      setModel("");
      setRegistrationYear("");
      setPrice("");
      setTransmission("");
      setFuelType("");
      setSeating("");
      setMotorPower("");
      setFeatures([]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
    previews.forEach(URL.revokeObjectURL);
    setPreviews([]);
    setSelectedFiles([]);
  };

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    
    // Combine existing files with new files
    const updatedFiles = [...selectedFiles, ...newFiles];
    
    // Check total file count
    if (updatedFiles.length > 10) {
      toast.error('You can only upload up to 10 images');
      return;
    }
    
    setSelectedFiles(updatedFiles);
    
    // Create new previews for the new files only
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveFile = (index) => {
    URL.revokeObjectURL(previews[index]); // Clean up the URL
    
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Only validate images for new cars, not when editing
      if (modalMode === "add" && selectedFiles.length === 0) {
        toast.error('Please select at least one image');
        return;
      }

      const formData = new FormData();
      
      // Only append images if files were selected
      if (selectedFiles.length > 0) {
        selectedFiles.forEach(file => {
          formData.append('images', file);
        });
      }
      
      const carData = {
        make,
        model,
        registrationYear: parseInt(registrationYear),
        price: parseFloat(price),
        transmission,
        fuelType,
        seating: parseInt(seating),
        motorPower,
        features: features.filter(f => f.trim() !== '')
      };
      
      formData.append('carData', JSON.stringify(carData));
      
      let response;
      if (modalMode === "add") {
        response = await axios.post('http://localhost:5000/api/cars', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        toast.success('Car added successfully!');
      } else {
        response = await axios.put(`http://localhost:5000/api/cars/${selectedCar._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        toast.success('Car updated successfully!');
      }
      
      console.log('Operation completed successfully:', response.data);
      closeModal();
      fetchCars();
      
      previews.forEach(URL.revokeObjectURL);
      setPreviews([]);
      setSelectedFiles([]);
      
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Error processing request');
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

  const handleDeleteImage = async (carId, publicId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${carId}/images/${publicId}`);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  useEffect(() => {
    return () => {
      previews.forEach(URL.revokeObjectURL);
    };
  }, [previews]);

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
                  <option value="Petrol/LPG(Gas)">Petrol/LPG(Gas)</option>

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
                <Label>Features (comma-separated):</Label>
                <Input
                  type="text"
                  value={features.join(", ")}
                  onChange={(e) => setFeatures(e.target.value.split(", "))}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Car Images (up to 10 images):</Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ marginBottom: '10px' }}
                  onClick={(e) => { e.target.value = null }}
                />
                <PreviewContainer>
                  {previews.map((preview, index) => (
                    <ImagePreview key={`${preview}-${index}`}>
                      <img src={preview} alt={`Preview ${index + 1}`} />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveFile(index)}
                      >×</button>
                    </ImagePreview>
                  ))}
                </PreviewContainer>
                <small>
                  Selected: {selectedFiles.length}/10 images. 
                  First image will be used as the thumbnail.
                </small>
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