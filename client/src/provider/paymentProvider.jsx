import React, { createContext, useState, useContext } from 'react';

export const PaymentContext = createContext(); // Export PaymentContext

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const addPayment = (newPayment) => {
    setPayments((prevPayments) => [...prevPayments, newPayment]);
  };

  const contextValue = {
    payments,
    addPayment,
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);