import React, { useEffect, useState, useRef } from "react";
import {
  PDFdiver,
  Document,
  Page,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const styles = StyleSheet.create({
  cell: { width: "50%", padding: "5px 10px", border: "1px solid rgba(0,0,0,.3)" },
  row: {
    display: "flex",
  },

  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  cell: {
    width: "50%",
    margin: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  labeldiv: {
    fontWeight: "Bold",
  },
  title1: {
    fontSize: 24,
    marginBottom: 2,
  },
  title2: {
    fontSize: 18,
    marginBottom: 2,
  },
  title3: {
    fontSize: 10,
    marginBottom: 15,
  },
  footer: {
    color: "green",
    marginTop: "20px",
    textAlign: "center",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    textAlign: "center",
  },
  image: {
    width: "200px",
    marginTop: "50px",
    height: "auto",
  },
  footer: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row-reverse",
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  date: {
    fontSize: 10,
    marginTop: -10,
  },
  ghost: {
    color: "white",
  },
  border:{
    borderTop: "1px solid rgba(0,0,0,.2",
    borderLeft: "1px solid rgba(0,0,0,.2)",
  }
});

const InvoicePDF = ({ invoiceData }) => {
  const [reversedDate, setReversedDate] = useState("");
  const [total, setTotal] = useState(10);
  const contentRef = useRef(null);

  const tableHeader = [
    "Propery Title",
    "Address",
    "Owner's Name",
    "Tenant's Name",
  ];

  console.log(invoiceData);
  useEffect(() => {
    function reverseDateBeforeT(dateString) {
      if (typeof dateString === "string") {
        const datePart = dateString.split("T")[0];
        const reversedDatePart = datePart.split("-").reverse().join("-");
        return reversedDatePart;
      }
      return "";
    }

    if (invoiceData) {
      const reversed = reverseDateBeforeT(invoiceData.createdAt);
      setReversedDate(reversed);
    }

    const total =
      parseFloat(invoiceData.rentAmount) +
      parseFloat(invoiceData.gasBill) +
      parseFloat(invoiceData.waterBill) +
      parseFloat(invoiceData.serviceCharge);

    setTotal(total);
  }, [invoiceData]);

  const handleDownloadPDF = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("invoice.pdf");
      });
    }
  };
  return (
    <div>
      <Document>
        <Page size="A4"  ref={contentRef}>
          <div style={styles.page}>
            <div style={styles.header}>
              <div style={styles.title1}>{invoiceData.assetTitle||"Asset Title"}</div>
              <div style={styles.address}>{invoiceData.address}</div>
            </div>
            <div style={styles.meta}>
              <div>
                <div style={styles.title2}>Invoice</div>
                <div style={styles.title3}>Ref: {invoiceData.id}</div>
              </div>
              <div>
                <div style={styles.ghost}>Date: {reversedDate}</div>
                <div style={styles.date}>Date: {reversedDate}</div>
              </div>
            </div>

            <div
              style={styles.border}
            >
              <div style={styles.row}>
                <div style={styles.cell}>Property Title</div>
                <div style={styles.cell}>{invoiceData.title}</div>
              </div>

              <div style={styles.row}>
                <div style={styles.cell}>Owner's Name</div>
                <div style={styles.cell}>{invoiceData.ownersName}</div>
              </div>
              <div style={styles.row}>
                <div style={styles.cell}>Tenant's Name</div>
                <div style={styles.cell}>{invoiceData.tenantsName}</div>
              </div>
              <div style={styles.row}>
                <div style={styles.cell}>Year</div>
                <div style={styles.cell}>{invoiceData.year}</div>
              </div>
              <div style={styles.row}>
                <div style={styles.cell}>Month</div>
                <div style={styles.cell}>{invoiceData.month}</div>
              </div>
              <div style={styles.row}>
                <div style={styles.cell}>Rent Amount</div>
                <div style={styles.cell}>{invoiceData.rentAmount}</div>
              </div>
              <div style={styles.row}>
                <div style={styles.cell}>Service Charge</div>
                <div style={styles.cell}>{invoiceData.serviceCharge}</div>
              </div>

              <div style={styles.row}>
                <div style={styles.cell}>Gas Bill</div>
                <div style={styles.cell}>{invoiceData.gasBill}</div>
              </div>

              <div style={styles.row}>
                <div style={styles.cell}>Water Bill</div>

                <div style={styles.cell}>{invoiceData.waterBill}</div>
              </div>

              <div style={styles.row}>
                <div style={styles.cell}>
                  <div style={styles.ghost}>total</div>
                </div>
                <div style={styles.cell}>Total {total}/= tk</div>
              </div>
            </div>

            <div style={styles.status}>
              <div>Status: Paid</div>
            </div>
            <div style={styles.footer}>
              <img
                src="/assets/images/invoice.png"
                style={styles.image}
                alt="logo"
              />
            </div>
          </div>
        </Page>
      </Document>
      <button className="btn btn-gradient" onClick={handleDownloadPDF}>
        Download Invoice
      </button>
    </div>
  );
};

export default InvoicePDF;
