// pages/SeatBookingPage.jsx

import React, { useState } from "react";
import Seat from "../components/seat";
import PaymentComponent from "../components/PaymentComponent";
import ReceiptComponent from "../components/ReceiptComponent";
import { db } from "../firebase";

const SeatBookingPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [movieName, setMovieName] = useState(""); 

  const handleSeatSelect = (seatId, isSelected, price) => {
    if (isSelected) {
      setSelectedSeats([...selectedSeats, { id: seatId, price }]);
      setTotalPrice((prevPrice) => prevPrice + price);
    } else {
      setSelectedSeats(selectedSeats.filter((seat) => seat.id !== seatId));
      setTotalPrice((prevPrice) => prevPrice - price);
    }
  };

  const handlePayment = async () => {
    try {
      // Example: Store booking details in Firestore
      const bookingRef = await db.collection("bookings").add({
        seats: selectedSeats,
        totalPrice,
        username,
        email,
        movieName,
        createdAt: new Date(),
      });
      console.log("Booking ID:", bookingRef.id);

      // Close the payment modal
      setIsPaymentOpen(false);
      // Optionally, you can redirect to a success page or display a confirmation message.
    } catch (error) {
      console.error("Error adding document:", error);
      // Handle error gracefully
    }
  };

  return (
    <div className="bg-gray-100 h-screen overflow-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Seat Booking</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {generateSections().map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mb-4">
                Section {index + 1} (Rs. {section.price})
              </h2>
              <div className="max-h-96 overflow-y-auto grid grid-cols-4 gap-4">
                {generateSeats(section.price).map((seat) => {
                  const isSelected = selectedSeats.some(
                    (selected) => selected.id === `${index}-${seat.id}`
                  );
                  return (
                    <Seat
                      key={`${index}-${seat.id}`}
                      id={`${index}-${seat.id}`}
                      price={seat.price}
                      isSelected={isSelected}
                      onSelect={handleSeatSelect}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Selected Seats</h2>
          <ul className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
            {selectedSeats.length > 0 ? (
              selectedSeats.map((seat, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <span>Seat {seat.id}</span>
                  <span>Rs. {seat.price}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-600">No seats selected</li>
            )}
          </ul>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              Total Price: Rs. {totalPrice}
            </h3>
            <button
              onClick={() => setIsPaymentOpen(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={selectedSeats.length === 0}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Payment Component Modal */}
      {isPaymentOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <PaymentComponent
              selectedSeats={selectedSeats}
              totalPrice={totalPrice}
              username={username}
              email={email}
              movieName={movieName}
              onPayment={handlePayment}
              onClose={() => setIsPaymentOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const generateSections = () => {
  return [{ price: 180 }, { price: 230 }, { price: 280 }];
};

const generateSeats = (price) => {
  const seats = [];
  for (let i = 1; i <= 14; i++) {
    seats.push({ id: i, price });
  }
  return seats;
};

export default SeatBookingPage;
