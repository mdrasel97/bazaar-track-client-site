// src/components/payment/BuyNow.jsx
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const BuyNow = ({ product }) => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const createSessionAndRedirect = async () => {
      try {
        const stripe = await stripePromise;

        const res = await axiosSecure.post("/create-checkout-session", {
          product,
        });

        const { sessionId } = res.data;

        const result = await stripe.redirectToCheckout({
          sessionId,
        });

        if (result.error) {
          toast.error(result.error.message);
        }
      } catch (error) {
        console.error("Stripe Checkout Error:", error);
        toast.error("Payment failed. Try again.");
      }
    };

    createSessionAndRedirect();
  }, [product, axiosSecure]);

  return null;
};

export default BuyNow;
