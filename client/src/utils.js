// utils.js

export const calculateTotalWithFee = (ticketTypes, ticketPrices, feePercentage) => {
  const totalTicketPrice = ticketTypes.reduce((total, type) => total + ticketPrices[type], 0);
  const feeAmount = (totalTicketPrice * feePercentage) / 100;
  return {
    totalWithFee: totalTicketPrice + feeAmount,
    feeAmount,
  };
};
