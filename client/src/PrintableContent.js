import React from 'react';

const PrintableContent = ({ transactionDetails, capturedDetails }) => (
  <div>
    <h3>Ticket Top!</h3>
    <h5>Event Name: Novruz Gala</h5>
    <p>Transaction completed by {transactionDetails.payer.name.given_name} {transactionDetails.payer.name.surname}</p>
    <p>Transaction ID: {transactionDetails.id}</p>
    {capturedDetails.tableNumber && <p>Table Number: {capturedDetails.tableNumber}</p>}
    {capturedDetails.tableNumber && <p>Number of Seats: {capturedDetails.tableNumber}</p>}
    <p>Ticket Types: {capturedDetails.ticketTypes && capturedDetails.ticketTypes.join(', ')}</p>
    <p>Paid Amount: {transactionDetails.purchase_units[0].amount.value}</p>
    <p>Purchase Date and Time: {new Date(transactionDetails.create_time).toLocaleString()}</p>
    {/* Add any additional information you want to display */}
    <p>Your ticket has been sent to your email ({capturedDetails.customerEmail})!</p>
  </div>
);

export default PrintableContent;
