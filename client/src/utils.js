// utils.js

export const calculateTotalWithFee = (ticketTypes, ticketPrices, transfeePercentage, feePercentage) => {
  const totalTicketPrice = ticketTypes.reduce((total, type) => total + ticketPrices[type], 0);
  const trnsfee = (totalTicketPrice * transfeePercentage) / 100 ;
  const feeAmount = (totalTicketPrice * feePercentage) / 100;
  return {
    totalWithFee: totalTicketPrice + trnsfee + feeAmount,
	trnsfee,
	feeAmount,
  };
};
