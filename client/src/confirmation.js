// confirmation.js

import React, { useEffect } from 'react';

const ConfirmationPage = () => {
  useEffect(() => {
    // Read URL parameters or fetch details from backend using transactionId
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get('transactionId');
    const status = params.get('status');
    const buyerName = params.get('buyerName');
    // ... retrieve other details

    // Display the confirmation information
    console.log('Transaction ID:', transactionId);
    console.log('Payment Status:', status);
    console.log('Buyer Name:', buyerName);
    // ... display other details on the page
  }, []);

  return (
    <div>
      <h2>Payment Confirmation</h2>
      {/* Display confirmation details here */}
    </div>
  );
};

export default ConfirmationPage;

