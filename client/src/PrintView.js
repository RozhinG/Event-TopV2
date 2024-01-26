// PrintView.js
import React from 'react';

const PrintView = ({ transactionDetails, capturedDetails }) => {
  if (!(transactionDetails && capturedDetails)) {
    console.error('Transaction details or captured details not available.');
    return null;
  }

  return (
    <div>
      <h3>Ticket Top!</h3>
      <h5>Event Name: Novruz Gala</h5>
      <p>Transaction completed by {transactionDetails.payer.name.given_name} {transactionDetails.payer.name.surname}</p>
      <p>Transaction ID: {transactionDetails.id}</p>
      {capturedDetails.tableNumber && <p>Table Number: {capturedDetails.tableNumber}</p>}
      {capturedDetails.selectedSpots && <p>Number of Seats: {capturedDetails.selectedSpots}</p>}
      <p>Ticket Types: {capturedDetails.ticketTypes && capturedDetails.ticketTypes.join(', ')}</p>
      <p>Paid Amount: {transactionDetails.purchase_units[0].amount.value}</p>
      <p>Purchase Date and Time: {new Date(transactionDetails.create_time).toLocaleString()}</p>
      {/* Add any additional information you want to display */}
      <p>Your ticket has been sent to your email ({capturedDetails.customerEmail})!</p>
    </div>
  );
};

export default PrintView;
