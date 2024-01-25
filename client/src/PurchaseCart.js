import React from 'react';

const PurchaseCart = ({ purchasedItems }) => {
  return (
    <div className="purchase-cart">
      <h4>Purchase Cart Details</h4>
      <ul>
        {purchasedItems.map((item, index) => (
          <li key={index}>
            <strong>Table {item.tableNumber}:</strong> {item.reservationText}, {item.buyerName} {item.buyerSurname}, Tickets: {item.ticketTypes.join(', ')}, Total Price: ${item.totalTicketPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseCart;
