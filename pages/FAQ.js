import React, { useState } from "react";
import NavbarFive from "../layout/headers/NavbarFive";
import { Container, Accordion, Card, Button } from "reactstrap";
import { ChevronDown } from "react-feather";
import FooterThree from "../layout/footers/FooterThree";

const faqData = [
  {
    question: "What is a property listing website?",
    answer:
      "A property listing website is an online platform that allows users to browse and search for real estate properties available for sale or rent. It serves as a centralized hub for property owners, real estate agents, and potential buyers or tenants to connect and transact."
  },
  {
    question: "How do I search for properties on the website?",
    answer:
      "To search for properties, use the search bar on the homepage to enter keywords, location, property type, or any other specific criteria. You can also use advanced filters to narrow down your search based on price range, number of bedrooms, amenities, and more."
  },
  {
    question: "How can I list my property for sale or rent on the website?",
    answer:
      "To list your property, create an account or log in if you already have one. Then, navigate to the 'Request Property Listing' section and fill in all the necessary details, such as Date and Time. Once submitted, one of your agents on that area will receive a Listing request and will come to your property for listing."
  },
  {
    question: "Is it free to list a property on the website?",
    answer:
      "We do have a Free version of the Package for listing the property. But we encourage you to take the Premium or Grand Premium package. By taking such package you will get access to our cutting-edge Rent Management System for maintaining the customers."
  },
  {
    question: "How can I contact the property owner or agent?",
    answer:
      "Each property listing includes contact information for the property owner or real estate agent. You can reach out to them directly using the provided email address or phone number."
  },
  {
    question: "Can I save properties to view later?",
    answer:
      "Yes, most property listing websites offer a 'Save' or 'Add to Favorites' feature. By clicking on this option, you can save properties you're interested in and access them later in your account's 'Saved Properties' section."
  },
  {
    question: "Are the property listings updated in real-time?",
    answer:
      "Property listings are typically updated regularly to ensure accurate and up-to-date information. However, the frequency of updates may vary, and it's recommended to verify the availability of a property with the owner or agent before making any decisions."
  },
  {
    question: "Are there any hidden fees associated with property transactions on the website?",
    answer:
      "As a property listing website, we do not charge any transaction fees. However, individual property owners or real estate agents may have their own terms and conditions, including commission fees for successful transactions. Make sure to clarify all financial matters with the relevant parties involved."
  },
  {
    question: "Can I request a property viewing through the website?",
    answer:
      "Yes, if the property owner or agent has provided the option for property viewings, you can typically request a viewing through the website. This may involve filling out a form or contacting the owner/agent directly to schedule an appointment."
  },
  {
    question: "How can I report a property listing that appears to be fraudulent or misleading?",
    answer:
      "If you suspect a property listing to be fraudulent or misleading, please contact our customer support team immediately. We take such matters seriously and will investigate the issue promptly."
  },
  {
    question: "Is my personal information secure on the website?",
    answer:
      "We prioritize the security and privacy of our users. Your personal information is protected as per our privacy policy. We do not share or sell your data to third parties without your consent."
  },
  {
    question: "Can I set up email alerts for new properties that match my preferences?",
    answer:
      "Yes, most property listing websites offer the option to set up email alerts. You can customize your preferences, and the website will send you notifications when new properties matching your criteria are listed."
  },
  {
    question: "Can I share a property listing with others?",
    answer:
      "Yes, you can usually share property listings through social media platforms or by copying the property's URL to send to others directly."
  },
  {
    question: "What should I do if I encounter technical issues on the website?",
    answer:
      "If you encounter technical issues, such as error messages or difficulties using certain features, please contact our technical support team. They will assist you in resolving the problem and ensure a smooth user experience."
  },
  {
    question: "Are there any mobile apps available for the property listing website?",
    answer:
      "Many property listing websites offer mobile apps for enhanced user convenience. Check your app store for our official app, compatible with both Android and iOS devices."
  },
  {
    question: "Can I list commercial properties on the website, or is it only for residential properties?",
    answer:
      "Our platform caters to both residential and commercial property listings. You can list a wide range of property types, including apartments, houses, offices, retail spaces, and more."
  },
  {
    question: "Can I contact customer support for assistance with my property search or listing?",
    answer:
      "Absolutely! Our customer support team is available to assist you with any inquiries related to property searches, listings, technical issues, or general queries. Feel free to reach out to us through our contact page or support email."
  },
  {
    question: "How often should I check for new listings on the website?",
    answer:
      "The frequency of new property listings may vary. It's a good idea to check the website regularly, set up email alerts, or follow our social media channels for updates on newly added properties."
  }
];


function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <NavbarFive />
      <div className="faq top-padding" style={{marginBottom:"2rem"}}>
        <Container className="container">
          <h1 style={{ textAlign: "center",margin:"2rem" }}>Frequently Asked Questions</h1>
          {faqData.map((faq, index) => (
            <Card
              key={index}
              className={`card ${activeIndex === index ? "active" : ""}`}
            >
              <div className="card-header" onClick={() => handleToggle(index)}>
                <Button className="faq-arrow-button">
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:"1.1rem",padding:"10px 10px"}}>
                    {faq.question}
                    <ChevronDown
                      size={24}
                      className={`arrow-icon ${
                        activeIndex === index ? "active" : ""
                      }`}
                    />
                  </div>
                  {activeIndex === index && (
                    <div className="card-body">{faq.answer}</div>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </Container>
      </div>
      <FooterThree />
    </div>
  );
}

export default FAQPage;
