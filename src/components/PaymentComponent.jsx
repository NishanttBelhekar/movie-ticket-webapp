import React, { useState } from "react";
import QRCode from "qrcode.react";
import ReceiptComponent from "./ReceiptComponent";
import { useUser } from "../contexts/UserContext"; // Import useUser hook from UserContext

const PaymentComponent = ({
  selectedSeats,
  totalPrice,
  onPayment,
  onClose,
}) => {
  const { user, movie } = useUser(); // Retrieve user and movie from UserContext
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const generateRandomOrderId = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const handleConfirmPayment = () => {
    // Simulate confirming payment (you can integrate with payment gateway API here)
    onPayment();
    setPaymentConfirmed(true); // Set payment confirmation state to true
  };

  const handleCancel = () => {
    onClose(); // Close payment component if cancelled
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg overflow-scroll h-screen">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
      <ul className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
        {selectedSeats.map((seat, index) => (
          <li key={index} className="flex justify-between items-center py-2">
            <span>Seat {seat.id}</span>
            <span>Rs. {seat.price}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Total Price: Rs. {totalPrice}</h3>
        <button
          onClick={handleConfirmPayment}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Confirm Payment
        </button>
        <button
          onClick={handleCancel}
          className="mt-4 ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
      {paymentConfirmed && (
        <div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Scan QR Code to Pay</h3>
            <div className="flex justify-center items-center">
              <QRCode
                value={`OrderId: ${generateRandomOrderId()}, Total: Rs. ${totalPrice}`}
                size={180}
              />
            </div>
          </div>
          {/* Render ReceiptComponent if payment is confirmed */}
          <ReceiptComponent
            username={user ? user.displayName : ""}
            email={user ? user.email : ""}
            movieName={movie ? movie.movieName : ""}
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
