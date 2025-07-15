// // // BuyNowModal.jsx
// // import React from "react";
// // import { Elements } from "@stripe/react-stripe-js";
// // import { loadStripe } from "@stripe/stripe-js";
// // import BuyNowForm from "./BuyNowForm";

// // const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

// // const BuyNowModal = ({ amount, onClose }) => {
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// //       <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
// //         <button
// //           onClick={onClose}
// //           className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
// //         >
// //           &times;
// //         </button>
// //         <Elements stripe={stripePromise}>
// //           <BuyNowForm amount={amount} closeModal={onClose} />
// //         </Elements>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BuyNowModal;

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function DialogDemo() {
//   return (
//     <Dialog>
//       <form>

//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Edit profile</DialogTitle>
//             <DialogDescription>
//               Make changes to your profile here. Click save when you&apos;re
//               done.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="name-1">Name</Label>
//               <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="username-1">Username</Label>
//               <Input id="username-1" name="username" defaultValue="@peduarte" />
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button type="submit">Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   );
// }
