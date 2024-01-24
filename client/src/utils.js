// utils.js

export const calculateTotalWithFee = (ticketTypes, ticketPrices, transfeePercentage, feePercentage) => {
  const totalTicketPrice = ticketTypes.reduce((total, type) => total + ticketPrices[type], 0);
  const trnsfee = (totalTicketPrice * transfeePercentage) / 100 ;
  const feeAmount = (totalTicketPrice * feePercentage) / 100;
  const totalfee = trnsfee + feeAmount ;
  return {
    totalWithFee: totalTicketPrice + totalfee,
	trnsfee,
	feeAmount,
	totalfee,
  };
};
