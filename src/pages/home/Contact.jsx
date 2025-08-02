import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-16">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Contact Form */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <Input type="text" placeholder="Your name" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Input type="email" placeholder="Your email" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <Textarea placeholder="Your message..." rows={5} />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            >
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* Image */}
        <div className="hidden md:block">
          <img
            src="https://i.ibb.co/qFcymXc1/Screenshot-3.png"
            alt="Contact Us"
            className="rounded-xl shadow-lg w-full h-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
