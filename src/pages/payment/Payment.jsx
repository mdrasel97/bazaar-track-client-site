import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BuyNowForm from "./BuyNowForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = ({ amount, closeModal, selectedProduct }) => {
  //   console.log("Amount received in Payment component:", amount);

  return (
    <Elements stripe={stripePromise}>
      <BuyNowForm
        closeModal={closeModal}
        amount={amount}
        selectedProduct={selectedProduct}
      />
    </Elements>
  );
};

export default Payment;
