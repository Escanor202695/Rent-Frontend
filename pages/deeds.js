import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import NavbarFive from "../layout/headers/NavbarFive";
import FooterThree from "../layout/footers/FooterThree";
import Breadcrumb from "../layout/Breadcrumb/Breadcrumb";
import Empty from "../components/common/emptyPage";

function Deeds() {
  const [deals, setDeals] = useState([]);
  const router = useRouter();
  const { id, role } = router.query;

  useEffect(() => {
    let isMounted = true;

    if (id && role) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://backend.asholproperty.com/close-deals",
            {
              params: {
                order: "createdAt",
                filter: {
                  where: {
                    ownerId: role === "owner" ? id : null,
                    renterId: role === "customer" ? id : null,
                  },
                },
              },
            }
          );

          console.log('deeds',response.data);

          if (isMounted) {
            setDeals(response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }

    // Cleanup function to cancel any ongoing requests when component unmounts
    return () => {
      isMounted = false;
    };
  }, [id, role]);

  return (
    <div>
      <NavbarFive />
      <Breadcrumb />

      <div
        className="p-4 d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100vw", margin: "100px 0" }}
      >
        {deals.length === 0 && <div className="empty">No Deed Found!</div>}
        {deals.length !== 0 && (
          <table className="table table-bordered" style={{ maxWidth: "800px" }}>
            <thead>
              <tr className="text-center">
                <th>Date</th>
                <th>Owner Name</th>
                <th>Renter Name</th>
                <th>Renter Id</th>
                <th>Deeds</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => (
                <tr key={deal.id} className="text-center">
                  <td className="text-center">
                    {deal?.createdAt
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                  </td>
                  <td className="text-center">{deal.owner.fullName}</td>
                  <td className="text-center">{deal?.renter.fullName}</td>
                  <td className="text-center">{deal?.renterId}</td>
                  <td>{deal?.deedsUrl}</td>
                  <td className="text-center">
                    <a
                      href={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${deal.deedsUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <FooterThree />
    </div>
  );
}

export default Deeds;
