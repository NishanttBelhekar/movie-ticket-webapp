import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useUser } from "../contexts/UserContext"; 
import icon from "../images/Icon2.png";

const ReceiptComponent = ({
  username,
  email,
  movieName,
  selectedSeats,
  totalPrice,
}) => {
  const { user, movie } = useUser(); 

  const handleDownloadReceipt = () => {
    const input = document.getElementById("receipt");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("receipt.pdf");
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg " id="receipt">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Movie Receipt</h2>
          <p className="text-sm text-gray-600">Thank you for your booking!</p>
        </div>
        <div className="text-right">
          <img
            src={icon}
            alt="Ticket Icon"
            className="w-16 h-16"
          />
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      <div className="mb-4">
        
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Email:</span>
          <span>{email || (user ? user.email : "")}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Movie Name:</span>
          <span>{movieName || (movie ? movie.movieName : "")}</span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Seats Booked:</h3>
        <ul className="list-disc list-inside">
          {selectedSeats.map((seat, index) => (
            <li key={index}>
              Seat {seat.id} - Rs. {seat.price}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Total Price: Rs. {totalPrice}</h3>
      </div>
      <div className="mt-4">
        <button
          onClick={handleDownloadReceipt}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default ReceiptComponent;
