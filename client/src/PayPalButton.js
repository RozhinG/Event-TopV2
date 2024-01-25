// PayPalButton.js

import React, { useEffect } from 'react';

const PayPalButton = ({ onCaptureDetails }) => {
  useEffect(() => {
    // ... (same code as before)

    const initializePayPalButton = () => {
      window.paypal
        .Buttons({
          // ... (same code as before)

          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              // Send captured details to the parent component
              onCaptureDetails(details);
            });
          },
        })
        .render('#paypal-button-container');
    };

    initializePayPalButton();
  }, [onCaptureDetails]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
