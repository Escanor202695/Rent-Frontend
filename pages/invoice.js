import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap"; // Import modal components
import NavbarFive from "../layout/headers/NavbarFive";
import FooterThree from "../layout/footers/FooterThree";
import Breadcrumb from "../layout/Breadcrumb/Breadcrumb.js";
import InvoicePDF from "../components/invoice/invoice";

function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State for modal
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State to store selected invoice
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const router = useRouter();
  const { id, role } = router.query;

  const generateYearsOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear; i++) {
      years.push(i.toString());
    }
    return years;
  };

  const generateMonthsOptions = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months;
  };

  const toggleModal = (invoice) => {
    setSelectedInvoice(invoice);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    let isMounted = true;

    if (id && role) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://backend.asholproperty.com/rent-managements",
            {
              params: {
                order: "createdAt",
                filter: {
                  where: {
                    ownerId: role === "owner" ? id : null,
                    renterId: role === "customer" ? id : null,
                    year: selectedYear,
                    month: selectedMonth,
                  },
                },
              },
            }
          );

          setInvoices(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [id, role, selectedMonth, selectedYear]);

  return (
    <div>
      <NavbarFive />
      <Breadcrumb />
      <div
        className="px-4 d-flex flex-column align-items-center justify-content-center"
        style={{ width: "100vw", margin: "60px 0", overflow: "hidden" }}
      >
        <div className="pb-4 d-flex flex-column align-items-center justify-content-center">
          <div
            className="d-flex padding-issue px-4"
            style={{ width: "100vw", maxWidth: "800px", margin: "20px 0" }}
          >
            <div className="mb-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {generateYearsOptions().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 mx-4">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {generateMonthsOptions().map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {invoices.length !== 0 && (
            <div className="table-flow">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Owner's Name</th>
                    <th>Flat Name</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <>
                      <tr key={invoice.id}>
                        <td>
                          {invoice?.createdAt
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                        <td>{invoice?.ownersName}</td>
                        <td>{invoice?.title}</td>
                        <td>{invoice?.year}</td>
                        <td>{invoice?.month}</td>
                        <td>
                          <button
                            className="btn btn-gradient"
                            onClick={() => toggleModal(invoice)}
                          >
                            View Invoice
                          </button>
                        </td>
                      </tr>
                      <Modal isOpen={modalOpen} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div> {invoice.month}'s Rent</div>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={toggleModal}
                              style={{ color: "white",zIndex:"1000" }}
                            >
                              &times;
                            </button>
                          </div>
                        </ModalHeader>
                        <ModalBody>
                          <InvoicePDF invoiceData={invoice} />
                        </ModalBody>
                      </Modal>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {invoices.length === 0 && (
          <div className="empty">No Invoice Found!</div>
        )}
      </div>
      <FooterThree />

      {/* Modal */}
    </div>
  );
}

export default InvoiceTable;
