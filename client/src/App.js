// App.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Badge, Dropdown, Modal, Alert } from 'react-bootstrap';
import './App.css';
import PayPalButton from './PayPalButton';
import PurchaseCart from './PurchaseCart';

//import ReactDOM from 'react-dom';
import { calculateTotalWithFee } from './utils';

function App() {
  const [tables, setTables] = useState(Array.from({ length: 30 }, () => ({ reservations: [], capacity: 8 })));

  //const [tables, setTables] = useState([]);

  //useEffect(() => {
    //// Load table data from the JSON file
    //const loadTableData = async () => {
      //try {
        //const response = await fetch('tablesData.json'); // Update with the correct path
        //const data = await response.json();
        //setTables(data);
      //} catch (error) {
        //console.error('Error loading table data:', error);
      //}
    //};
    
  //loadTableData();
  //}, []); // Run this effect only once on component mount

  const [capturedDetails, setCapturedDetails] = useState(null);

  const [reservationText, setReservationText] = useState('');
  const [selectedTable, setSelectedTable] = useState(1);
  const [selectedSpots, setSelectedSpots] = useState(1);
  const [showModal, setShowModal] = useState(false);
  //const [selectedTicketTypes, setSelectedTicketTypes] = useState(Array(1).fill('standard'));
  const [selectedTicketTypes, setSelectedTicketTypes] = useState(Array(selectedSpots).fill('select'));
  const [showTicketFields, setShowTicketFields] = useState(false);
  const [totalTicketPrice, setTotalTicketPrice] = useState(0);
  const [purchaseTimeout, setPurchaseTimeout] = useState(null);

  const [remainingTime, setRemainingTime] = useState(10 * 60); // 5 minutes in seconds
  const [fee, setFee] = useState(0);
  const [feePercentage, setFeePercentage] = useState(6); // Set your desired fee percentage here
  const [transfeePercentage, setTransFeePercentage] = useState(2.9); // Set your desired fee percentage here

   // Assuming you have a state variable and its setter function for buyer's email
  const [buyerEmail, setBuyerEmail] = useState('');  

  // Initialize newTotalTicketPrice state
  const [newTotalTicketPrice, setNewTotalTicketPrice] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState([]);
  
  // Purchase success variables
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const handleShowSuccessModal = () => setShowSuccessModal(true);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);


  const resetState = () => {
    setTables(Array.from({ length: 30 }, () => ({ reservations: [], capacity: 8 })));
    setReservationText('');
    setSelectedTable(1);
    setSelectedSpots(1);
    setShowModal(false);
    setSelectedTicketTypes(Array(1).fill('select'));
    setShowTicketFields(false);
    setTotalTicketPrice(0);
    setPurchaseTimeout(null);
    setRemainingTime(10 * 60);
    setFee(0);
    setFeePercentage(6);
    setTransFeePercentage(2.9);
    setNewTotalTicketPrice(0);
  };  
  
  const ticketPrices = {
    standard: 100,
    VIP: 120,
    student: 1,
    kids: 1,
  };

  const handleCaptureDetails = (details) => {
    // Handle the captured details as needed
    console.log('Captured PayPal Details:', details);
    setCapturedDetails(details);

    // You can perform additional actions here, such as updating state or making API calls
  };


const handleTicketTypeChange = (type, index) => {
  const updatedTicketTypes = [...selectedTicketTypes];
  
  // Check if the selected table is in the specified range
  const isVipTable = [1, 2, 3, 4, 5, 16, 17, 18, 19, 20].includes(selectedTable);

  // If the selected table is a VIP table, force the ticket type to be VIP
  if (isVipTable && type !== 'VIP') {
    alert('Only VIP tickets are allowed for this table.');
    updatedTicketTypes[index] = 'VIP';
  } else {
    updatedTicketTypes[index] = type;
  }

  setSelectedTicketTypes(updatedTicketTypes);

  const newTotalTicketPrice = updatedTicketTypes.reduce((total, t) => total + ticketPrices[t], 0);
  setTotalTicketPrice(newTotalTicketPrice);

  clearTimeout(purchaseTimeout);
  const timeoutId = setTimeout(() => {
    handleCloseModal();
    // Reload the app when the timer ends
    alert('Purchase session expired. Please try again.');
    window.location.reload();
  }, remainingTime * 1000);
  setPurchaseTimeout(timeoutId);
};

const handleAddReservation = () => {
  const table = tables[selectedTable - 1];

  if (selectedSpots <= table.capacity && selectedSpots <= 8) {
    const isVipTicketAlreadyReserved = table.reservations.some(reservation =>
      reservation.ticketTypes.includes('VIP')
    );

    if (isVipTicketAlreadyReserved && [1, 2, 3, 4, 5, 16, 17, 18, 19, 20].includes(selectedTable)) {
      alert("VIP ticket already reserved for this table.");
      return;
    }

    setShowModal(true);
    setShowTicketFields(true);
  } else if (selectedSpots > 8) {
    alert("You can't reserve more than 8 spots for a single table.");
  } else {
    alert(`Only ${table.capacity} spots available for this table.`);
  }

    setShowModal(true);
    setShowTicketFields(true);
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

    // Store reservation data in state
    const reservationData = {
      tableNumber: selectedTable,
      reservationText: reservationText,
      buyerName: buyerName,
      buyerSurname: buyerSurname,
      ticketTypes: selectedTicketTypes,
      totalTicketPrice: totalTicketPrice,
    };


    // Update purchased items state
    setPurchasedItems((prevItems) => [...prevItems, reservationData]);

  // Use PayPal SDK to handle payment
  const paypalScript = document.createElement('script');
  //paypalScript.src = `https://www.paypal.com/sdk/js?client-id=ATMvY5-1N5sOTVS4mXgjwGSUMnOQD1kjhTClWHpSe95szpUh8rTY-2vWjTDNlrEiAotYpyyR__h2Hcm9&currency=CAD&locale=en_ca`;


  // AYSpzj2tY_WJ6Pw5WCGRX9AnrSoX2Es12cxXyWVVZkASit6zo4LfqGiYIIQoi1ChsWmcpN7UKl4In1Ig --> working sandbox
  //paypalScript.src = `https://www.paypal.com/sdk/js?client-id=ASD882dz83tzc9b0hWysakdf_2UvhQhoXhoSIHeeTDDkAoyl5vCAqYmY7Tq2cQS_J7zm1H8FWDvUGdIW&buyer-country=CA&currency=CAD`;

  // ASD882dz83tzc9b0hWysakdf_2UvhQhoXhoSIHeeTDDkAoyl5vCAqYmY7Tq2cQS_J7zm1H8FWDvUGdIW --> not working LIVE
  paypalScript.src = `https://www.paypal.com/sdk/js?client-id=ASD882dz83tzc9b0hWysakdf_2UvhQhoXhoSIHeeTDDkAoyl5vCAqYmY7Tq2cQS_J7zm1H8FWDvUGdIW&currency=CAD`;
  paypalScript.async = true;
  paypalScript.onload = () => {
    handlePayPalPayment();
  };
	paypalScript.onerror = () => {
	  console.error('Error loading PayPal SDK');
	  // You can add more detailed error handling here
	};
  document.body.appendChild(paypalScript);
    
  setReservationText('');
  setSelectedSpots(1);
  setSelectedTicketTypes(Array(selectedSpots).fill('standard'));
  setTotalTicketPrice(0);
  clearTimeout(purchaseTimeout);
};


const handleCloseModalTimeOut = async () => {
  setShowModal(false);
  setShowTicketFields(false);

  clearTimeout(purchaseTimeout);
};

const handlePrintPurchaseCart = () => {
  window.print();
};


const handlePayPalPayment = () => {
  // Replace 'YOUR_CLIENT_ID' with your PayPal client ID
  window.paypal
    .Buttons({
      createOrder: function (data, actions) {
        const formattedTotal = totalTicketPrice.toFixed(2); // Format total price with two decimal places
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: formattedTotal,
              },
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          // Handle the successful payment here
          alert('Payment successful! Transaction completed by ' + details.payer.name.given_name);

          setTransactionDetails(details); // Save transaction details
          handleShowSuccessModal(); // Show the success modal

          // Handle the successful payment here
          handleShowSuccessModal(); // Show the success modal
          // Other logic, if needed
        });
      },
      onError: function (err) {
        // Handle errors here
        console.error('PayPal error:', err);
        alert('Payment failed. Please try again.');
      }
      //style: {
        //layout: 'vertical',
        //color: 'gold',
        //shape: 'rect',
        //label: 'paypal',
        //height: 40,
        //width: 150,
      //},
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

//function getAvailableSeats(table) {
  //// Check if the table is defined and has the expected structure
  //if (table && typeof table === 'object' && 'capacity' in table) {
    //const reservedSeats = table.reservations.reduce((total, reservation) => total + reservation.spots, 0);
    //return table.capacity - reservedSeats;
  //}

  //// Return a default value if the table is not valid
  //return 0;
//}

// ... (previous code)

useEffect(() => {

  // Calculate the total ticket price including the fee using the utility function
  const { totalWithFee, trnsfee, feeAmount, totalfee } = calculateTotalWithFee(selectedTicketTypes, ticketPrices, transfeePercentage, feePercentage);

  // Set the total ticket price
  setTotalTicketPrice(totalWithFee);

  //setFee(feeAmount);

  //setTransFeePercentage(trnsfee);
  
  //console.log('feePercentage:', feePercentage);

  const timeoutId = setTimeout(() => {
    handleCloseModalTimeOut();
    alert('Purchase session expired. Please try again.');
    // Reload the app when the timer ends
    window.location.reload();
  }, remainingTime * 1000);
  
  //setPurchaseTimeout(timeoutId);

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


  <div class="row">
    <div class="col-6">
    
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
          <h5 className="w-75 mb-3 ">Enter number of seats:</h5>
          <Form.Group controlId="selectedSpots">
            <Form.Control
              type="number"
              placeholder="Number of seats"
              value={selectedSpots}
              onChange={(e) => {
                const newValue = e.target.value !== '' ? Math.max(1, parseInt(e.target.value, 10)) : '';
                setSelectedSpots(newValue);
              }}
            />
          </Form.Group>
        </div>
        {/* Button to add reservation */}
        <Button variant="primary" onClick={handleAddReservation} className="rectangle-button mb-3">
          Add Reservation
        </Button>
      </Form>
      {/* Task list */}
      {/* Task list */}
      {/* Task list */}
      <div className="task-list">
        {tables.map((table, tableIndex) => (
          <div key={tableIndex} className={`circle-button task-item ${calculateTableColor(table)}`}>
            {/* Seat Capacity */}
            <div className="table-info">
              <strong>{[1, 2, 3, 4, 5, 16, 17, 18, 19, 20].includes(tableIndex + 1) ? `VIP Table ${tableIndex + 1}` : `Table ${tableIndex + 1}`}</strong>
              <span>({table.capacity} seats)</span>
            </div>
            {/* Reservations */}
            <div className="reservation-info">
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
    <div class="col-6">

	  <div>
		{/* Other components and content */}
		{purchasedItems.length > 0 && <PurchaseCart purchasedItems={purchasedItems} />}
		{/* Other components and content */}
		<button onClick={handlePrintPurchaseCart}>Print Purchase Cart</button>
	  </div>
    

    {/* Additional container for PayPal button */}
    <div id="paypal-button-container"></div>
    
    
        
    </div>
  </div>


    {/* Reservation modal */}
    <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
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
            <Alert variant="warning">Note: All fields must be completed.</Alert>
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
            {/* Buyer's EMAIL input */}
            <Form.Group controlId="buyerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                onChange={(e) => {
                  const emailValue = e.target.value.trim();
                  // Validate email using a regular expression
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (emailPattern.test(emailValue) || emailValue === '') {
                    // Valid email or empty string
                    setBuyerEmail(emailValue);
                  } else {
                    // Invalid email
                    // You can display an error message or take other actions
                  }
                }}
              />
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
                    <option value="select">Select</option>
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
                <li>Transcation Fee: ${totalTicketPrice}</li>
                {/* <li>Fee (6%): ${totalTicketPrice}</li> */}
                <li>Total Ticket Price + Fee: ${totalTicketPrice}</li>
              </ul>
            </div>
          </Form>
        )}
        {/* PayPal button container */}
        {/* <div id="paypal-button-container"></div> */}
      </Modal.Body>
      {/* Modal footer */}
      <Modal.Footer>
        {/* Close button */}
        <button type="button" className="btn btn-secondary" onClick={() => { resetState(); setShowModal(false); }}>
          Close
        </button>
        {/* Purchase button */}
        <Button variant="success" onClick={handleCloseModal}>
          Add to CART
        </Button>
        {/* Countdown timer */}
        <div className="countdown-timer">Time Remaining: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</div>
      </Modal.Footer>
    </Modal>

<Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
  <Modal.Header closeButton>
    <Modal.Title>Payment Successful!</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {transactionDetails && (
      <>
        <p>Transaction completed by {transactionDetails.payer.name.given_name}</p>
        <p>Transaction ID: {transactionDetails.id}</p>
        {/* Add any additional information you want to display */}
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseSuccessModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


  </Container>
);






}

export default App;
