// App.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Badge, Dropdown, Modal, Alert } from 'react-bootstrap';
import './App.css';
import ReactDOM from 'react-dom';
import { calculateTotalWithFee } from './utils';

function App() {
  const [tables, setTables] = useState(Array.from({ length: 30 }, () => ({ reservations: [], capacity: 8 })));
  const [reservationText, setReservationText] = useState('');
  const [selectedTable, setSelectedTable] = useState(1);
  const [selectedSpots, setSelectedSpots] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicketTypes, setSelectedTicketTypes] = useState(Array(1).fill('standard'));
  const [showTicketFields, setShowTicketFields] = useState(false);
  const [totalTicketPrice, setTotalTicketPrice] = useState(0);
  const [purchaseTimeout, setPurchaseTimeout] = useState(null);

  const [remainingTime, setRemainingTime] = useState(5 * 60); // 5 minutes in seconds
  const [fee, setFee] = useState(0);
  const [feePercentage, setFeePercentage] = useState(6); // Set your desired fee percentage here
	// Initialize newTotalTicketPrice state
  const [newTotalTicketPrice, setNewTotalTicketPrice] = useState(0);
  
  
  const ticketPrices = {
    standard: 100,
    VIP: 120,
    student: 85,
    kids: 60,
  };



  const handleTicketTypeChange = (type, index) => {
    const updatedTicketTypes = [...selectedTicketTypes];
    updatedTicketTypes[index] = type;
    setSelectedTicketTypes(updatedTicketTypes);

    const newTotalTicketPrice = updatedTicketTypes.reduce((total, t) => total + 5 + ticketPrices[t], 0);
    setTotalTicketPrice(newTotalTicketPrice);

    clearTimeout(purchaseTimeout);
    const timeoutId = setTimeout(() => {
      handleCloseModal();
      alert('Purchase session expired. Please try again.');
    }, 5 * 60 * 1000);
    setPurchaseTimeout(timeoutId);
  };

  const handleAddReservation = () => {
    const table = tables[selectedTable - 1];

    if (selectedSpots <= table.capacity && selectedSpots <= 8) {
      setShowModal(true);
      setShowTicketFields(true);
      //setTotalTicketPrice(selectedSpots * ticketPrices[selectedTicketTypes[0]]);

    } else if (selectedSpots > 8) {
      alert("You can't reserve more than 8 spots for a single table.");
    } else {
      alert(`Only ${table.capacity} spots available for this table.`);
    }
  };
  
  
  

  //const handleStoreData = async () => {
    //setShowModal(false);
    //setShowTicketFields(false);
    
    //if (!buyerName || !buyerSurname) {
      //alert('Please enter both name and surname.');
      //return;
    //}
    
    //try {
      //const response = fetch('/storeData', {
        //method: 'POST',
        //headers: {
          //'Content-Type': 'application/',
        //},
        //body: JSON.stringify({
          //buyerName: buyerName,
          //buyerSurname: buyerSurname,
          //// Add any other data you want to send to the server
        //}),
      //});
      
      //if (response.ok) {
        //const result = await response.json();
        //try{
			//window.location.href = result.paymentGatewayUrl;
		//}
		//catch(e)
		//{
		//console.error('Error:', e);
		//}
      //} else {
        //alert('Error storing data Please try again.');
      //}
    //} catch (error) {
      //console.error('Error:', error);
      //alert('An unexpected error occurred. Please try again later.');
    //}
    
    //setReservationText('');
    //setSelectedSpots(1);
    //setSelectedTicketTypes(Array(selectedSpots).fill('standard'));
    //setTotalTicketPrice(0);
    //clearTimeout(purchaseTimeout);
  //};


  //const handleCloseModal = async () => {
    //setShowModal(false);
    //setShowTicketFields(false);

	//const buyerName = document.getElementById('buyerName').value;
	//const buyerSurname = document.getElementById('buyerSurname').value;

    //if (!buyerName || !buyerSurname) {
      //alert('Please enter both name and surname.');
      //return;
    //}

    //// Store reservation data in localStorage
    //const reservationData = {
      //tableNumber: selectedTable,
      //reservationText: reservationText,
      //buyerName: buyerName,
      //buyerSurname: buyerSurname,
      //ticketTypes: selectedTicketTypes,
      //totalTicketPrice: totalTicketPrice,
    //};

    //// Log the reservation data to the console
    //console.log('Reservation Data:', reservationData);

    //// Show a confirmation message to the user
    //alert('Transfering to payment Gateway!');

    //localStorage.setItem('reservationData', JSON.stringify(reservationData)); //??????

    //try {
      //// Redirect to the payment gateway
      //const response = await fetch('https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID', {
		  //<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

        //method: 'POST',
        //headers: {
          //'Content-Type': 'application/json',
        //},
        //body: JSON.stringify({
          //// Include any necessary data for the purchase
          //// Example: reservationData
        //}),
      //});

      //if (response.ok) {
        ////const result = await response.json();
        ////window.location.href = result.paymentGatewayUrl;
        //alert('Payment successful.');
      //} else {
        //alert('Error initiating purchase. Please try again.');
      //}
    //} catch (error) {
      //console.error('Error:', error);
      //alert('An unexpected error occurred. Please try again later.');
    //}

    //setReservationText('');
    //setSelectedSpots(1);
    //setSelectedTicketTypes(Array(selectedSpots).fill('standard'));
    //setTotalTicketPrice(0);
    //clearTimeout(purchaseTimeout);
  //};
  
  
  


const handleCloseModal = async () => {
  setShowModal(false);
  setShowTicketFields(false);

  const buyerName = document.getElementById('buyerName').value;
  const buyerSurname = document.getElementById('buyerSurname').value;

  if (!buyerName || !buyerSurname) {
    alert('Please enter both name and surname.');
    return;
  }

  // Use PayPal SDK to handle payment
  const paypalScript = document.createElement('script');
  paypalScript.src = `https://www.paypal.com/sdk/js?client-id=Ae4yN7YaTyetmQIWanu2GQax0IAwJulSm2jze42lK0aDZRckVVUv35BBzWLE7RhMdAzHar2b2XzyiY-8&currency=CAD`;
  paypalScript.async = true;
  paypalScript.onload = () => {
    handlePayPalPayment();
  };
  document.body.appendChild(paypalScript);

  setReservationText('');
  setSelectedSpots(1);
  setSelectedTicketTypes(Array(selectedSpots).fill('standard'));
  setTotalTicketPrice(0);
  clearTimeout(purchaseTimeout);
};


  const handlePayPalPayment = () => {
    // Replace 'YOUR_CLIENT_ID' with your PayPal client ID
    window.paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalTicketPrice,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            // Handle the successful payment here
            alert('Payment successful! Transaction completed by ' + details.payer.name.given_name);
          });
        },
        onError: function (err) {
          // Handle errors here
          console.error('PayPal error:', err);
          alert('Payment failed. Please try again.');
        },
      })
      .render('#paypal-button-container');
  };









  const calculateTableColor = (table) => {
    if (table.capacity === 0) {
      return 'table-full';
    } else if (table.capacity <= table.reservations.length) {
      return 'table-semi-empty';
    } else {
      return 'table-empty';
    }
  };

  const getAvailableSeats = (table) => {
    return table.capacity - table.reservations.length;
  };


// ... (previous code)

useEffect(() => {

  // Calculate the total ticket price including the fee using the utility function
  const { totalWithFee, feeAmount } = calculateTotalWithFee(selectedTicketTypes, ticketPrices, feePercentage);

  // Set the total ticket price
  setTotalTicketPrice(totalWithFee);

  setFee(feeAmount);
  
  const timeoutId = setTimeout(() => {
    handleCloseModal();
    alert('Purchase session expired. Please try again.');
  }, remainingTime * 1000);

  setPurchaseTimeout(timeoutId);

  // Update the remaining time every second
  const intervalId = setInterval(() => {
    setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
  }, 1000);

  return () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  };
}, [selectedTicketTypes, handleCloseModal, ticketPrices, remainingTime, feePercentage]);


return (
  <Container className="mt-3">
    {/* Main container for the component */}
    <div className="rectangle-layout">
      <Form>
        {/* Select Table section */}
        <div className="select-table-section">
          <h5 className="mb-3">Select Table:</h5>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Table {selectedTable}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Array.from({ length: 30 }).map((_, index) => (
                <Dropdown.Item key={index} onClick={() => setSelectedTable(index + 1)}>
                  Table {index + 1}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* Enter number of seats section */}
        <div className="enter-seats-section">
          <h5 className="mb-3">Enter number of seats:</h5>
          <Form.Group controlId="selectedSpots">
            <Form.Control
              type="number"
              placeholder="Number of spots"
              value={selectedSpots}
              onChange={(e) => setSelectedSpots(Math.max(1, parseInt(e.target.value, 10)))}
            />
          </Form.Group>
        </div>
        {/* Button to add reservation */}
        <Button variant="primary" onClick={handleAddReservation} className="rectangle-button mb-3">
          Add Reservation
        </Button>
      </Form>
      {/* Task list */}
      <div className="task-list">
        {tables.map((table, tableIndex) => (
          <div key={tableIndex} className={`circle-button task-item ${calculateTableColor(table)}`}>
            <div>
              <strong>Table {tableIndex + 1}</strong> ({table.capacity} seats)
            </div>
            <div>
              {table.reservations.map((reservation, index) => (
                <Badge key={index} pill variant="info" className="mr-1">
                  {reservation.name} ({reservation.spots} spots)
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Reservation modal */}
    <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal-width">
      <Modal.Header closeButton>
        <Modal.Title>
          Select Tickets - Table {selectedTable} ({getAvailableSeats(tables[selectedTable - 1])} available seats)
        </Modal.Title>
      </Modal.Header>
      {/* Modal body */}
      <Modal.Body>
        {showTicketFields && (
          <Form>
            {/* Alert */}
            <Alert variant="warning">Note: Tickets are non-refundable.</Alert>
            {/* Buyer's name input */}
            <Form.Group controlId="buyerName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            {/* Buyer's surname input */}
            <Form.Group controlId="buyerSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" placeholder="Enter your surname" />
            </Form.Group>
            {/* Ticket type selection for each seat */}
            {[...Array(selectedSpots)].map((_, index) => (
              <Form.Group key={index} controlId={`ticketType-${index + 1}`}>
                <Form.Label>{`Ticket Type for Seat ${index + 1}`}</Form.Label>
                <div className="d-flex align-items-center">
                  <span className="mr-2">{`Price: $${ticketPrices[selectedTicketTypes[index]]}`}</span>
                  {/* Dropdown for selecting ticket type */}
                  <Form.Control
                    as="select"
                    value={selectedTicketTypes[index]}
                    onChange={(e) => handleTicketTypeChange(e.target.value, index)}
                  >
                    {/* Options for ticket types */}
                    <option value="standard">Standard ($100)</option>
                    <option value="VIP">VIP ($120)</option>
                    <option value="student">Student ($85)</option>
                    <option value="kids">Kids ($60)</option>
                  </Form.Control>
                </div>
              </Form.Group>
            ))}
            {/* Notes section */}
            <div className="mt-3">
              <strong>Notes:</strong>
              <ul>
                <li>Fee (6%): ${totalTicketPrice}</li>
                <li>Total Ticket Price + Fee: ${totalTicketPrice}</li>
              </ul>
            </div>
          </Form>
        )}
        {/* PayPal button container */}
        <div id="paypal-button-container"></div>
      </Modal.Body>
      {/* Modal footer */}
      <Modal.Footer>
        {/* Close button */}
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        {/* Purchase button */}
        <Button variant="success" onClick={handleCloseModal}>
          Purchase
        </Button>
        {/* Countdown timer */}
        <div className="countdown-timer">Time Remaining: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</div>
      </Modal.Footer>
    </Modal>
    {/* Additional container for PayPal button */}
    <div className="rectangle-layout">
      <div id="paypal-button-container"></div>
    </div>
  </Container>
);






}

export default App;
