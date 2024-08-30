const faqs = [
    {
      question: "FAQ 1: What is your return policy?",
      answer: "We offer a 30-day return policy on all items. If you’re not satisfied with your purchase, you can return it within 30 days of receiving it. Please ensure the item is in its original condition and packaging. Contact our support team to initiate a return.",
    },
    {
      question: "FAQ 2: How long does shipping take?",
      answer: "Shipping times vary depending on your location. Typically, domestic orders take 3-7 business days to arrive, while international orders may take 7-14 business days. You'll receive a tracking number once your order has been shipped.",
    },
    {
      question: "FAQ 3: Do you offer international shipping?",
      answer: "Yes, we do offer international shipping to most countries. Shipping rates and delivery times will vary depending on your location. You can calculate shipping costs at checkout after entering your address.",
    },
    {
      question: "FAQ 4: How can I track my order?",
      answer: "Once your order has been shipped, you will receive an email with a tracking number. You can use this number on our website or the carrier's website to track your order's progress in real-time.",
    },
    {
      question: "FAQ 5: What payment methods do you accept?",
      answer: "We accept a variety of payment methods, including credit/debit cards (Visa, MasterCard, American Express), PayPal, and other secure payment options. All transactions are encrypted to ensure your payment information is safe.",
    },
    {
      question: "FAQ 6: How can I contact customer support?",
      answer: "You can contact our customer support team through our website's contact form, via email at support@example.com, or by calling our toll-free number. We’re available Monday to Friday, 9 AM to 5 PM (local time).",
    },
    {
      question: "FAQ 7: Can I change or cancel my order after it’s been placed?",
      answer: "If you need to change or cancel your order, please contact us as soon as possible. We process orders quickly, but we will do our best to accommodate your request if your order has not yet been shipped. If it has already shipped, you may need to follow our return process.",
    },
  ];
  
  function Accordion() {
    return (
      <div className="join join-vertical w-[60%]">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow join-item border-base-300 border"
          >
            <input type="radio" name="my-accordion-4" defaultChecked={index === 0} />
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default Accordion;
  