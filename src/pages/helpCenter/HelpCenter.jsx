import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FaQuestionCircle, FaEnvelope } from "react-icons/fa";

const faqData = [
  {
    question: "How can I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login page and follow the instructions.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can email us at support@example.com or use the contact form below.",
  },
  {
    question: "Where can I view my orders?",
    answer: "Go to your dashboard and click on 'My Orders'.",
  },
];

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Help Center</h1>

      {/* Search */}
      <div className="flex justify-center">
        <Input
          type="text"
          placeholder="Search for help..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {/* <FaQuestionCircle className="text-blue-500" /> Frequently Asked */}
          Questions
        </h2>
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg">{faq.question}</h3>
                <p className="text-gray-600 mt-1">{faq.answer}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No FAQs matched your search.</p>
        )}
      </div>

      {/* Contact Support */}
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2 mt-6">
          <FaEnvelope className="text-green-500" /> Contact Support
        </h2>
        <Card>
          <CardContent className="p-4 space-y-2">
            <p>If you can't find your answer, feel free to reach out to us:</p>
            <p className="font-medium">
              Email:{" "}
              <a
                href="mailto:support@example.com"
                className="text-blue-600 hover:underline"
              >
                support@example.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;
