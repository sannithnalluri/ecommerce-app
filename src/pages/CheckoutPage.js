import React, { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        paymentMethod: '',
    });

    const [orderSummary, setOrderSummary] = useState(null);
    const [hiddenform, sethiddenform] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sethiddenform(true);
        setOrderSummary(formData);
        setFormData({
            name: '',
            address: '',
            paymentMethod: '',
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">

            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {hiddenform ? "" : <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="address">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <fieldset className="mb-4">
                    <legend className="block text-sm font-medium mb-1">Payment Method</legend>
                    <div className="flex flex-col">
                        <label className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Paytm"
                                checked={formData.paymentMethod === 'Paytm'}
                                onChange={handleChange}
                                className="mr-2"
                                required
                            />
                            <i className="fab fa-cc-paypal text-yellow-500 mr-2"></i> {/* Paytm icon */}
                            Paytm
                        </label>
                        <label className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="PhonePe"
                                checked={formData.paymentMethod === 'PhonePe'}
                                onChange={handleChange}
                                className="mr-2"
                                required
                            />
                            <i className="fab fa-cc-visa text-blue-500 mr-2"></i> {/* PhonePe icon */}
                            PhonePe
                        </label>
                        <label className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Google Pay"
                                checked={formData.paymentMethod === 'Google Pay'}
                                onChange={handleChange}
                                className="mr-2"
                                required
                            />
                            <i className="fab fa-google text-red-500 mr-2"></i> {/* Google Pay icon */}
                            Google Pay
                        </label>
                        <label className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Cash on Delivery"
                                checked={formData.paymentMethod === 'Cash on Delivery'}
                                onChange={handleChange}
                                className="mr-2"
                                required
                            />
                            <i className="fas fa-money-bill-wave text-green-500 mr-2"></i> {/* Cash on Delivery icon */}
                            Cash on Delivery
                        </label>
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                    Submit
                </button>
            </form>
            }

            {orderSummary && (
                <div className="mt-6 bg-white p-4 rounded shadow-md w-full max-w-md flex flex-col items-center">
                    <AiFillCheckCircle className='text-green-500 w-20 h-20' />
                    <h2 className="text-lg font-bold">Order Summary</h2>
                    <p><strong>Name:</strong> {orderSummary.name}</p>
                    <p><strong>Address:</strong> {orderSummary.address}</p>
                    <p><strong>Payment Method:</strong> {orderSummary.paymentMethod}</p>
                    <p className="text-green-600 font-bold mt-2">Thank you for your order!</p>
                </div>
            )}
        </div>
    );
};

export default Checkout;
