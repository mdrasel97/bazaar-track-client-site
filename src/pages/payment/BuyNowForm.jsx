// BuyNowForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const BuyNowForm = ({ amount, closeModal, selectedProduct }) => {
  console.log("Amount received in Payment component:", amount);
  const { handleSubmit } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe is not ready.");
      return;
    }

    const card = elements.getElement(CardElement);

    // 🔸 Call your backend to create PaymentIntent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents: amount * 100,
    });

    // ✅ axios response data access করে this way:
    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      // payment data db save
      if (result.paymentIntent.status === "succeeded") {
        // 🟩 Step: Prepare data
        const paymentInfo = {
          //userEmail, productId
          userEmail: user?.email,
          marketName: selectedProduct?.marketName,
          productId: selectedProduct?._id,
          productName: selectedProduct?.itemName,
          amount,
          transactionId: result.paymentIntent.id,
          status: "paid",
          createdAt: new Date(),
        };

        // 🟩 Step: Send to backend
        try {
          const saveRes = await axiosSecure.post("/payments", paymentInfo);
          if (saveRes.data.insertedId) {
            toast.success("✅ Payment Successful!");
            navigate("/dashboard/myOrders");
          }
        } catch (error) {
          toast.error("❌ Failed to save payment");
          console.error(error);
        }

        // Close the modal
        if (typeof closeModal === "function") closeModal();
      }
    }
  };

  return (
    <div className=" w-full mx-auto p-6 mt-10 bg-white shadow-2xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Complete Payment
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <div className="border p-4 rounded-md shadow-sm">
          <CardElement className="text-gray-700" />
        </div>
        <button
          className="bg-blue-500 text-white w-full py-2 px-4 font-bold rounded"
          type="submit"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
      </form>
    </div>
  );
};

export default BuyNowForm;
