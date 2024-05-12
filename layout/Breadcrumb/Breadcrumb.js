import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Img from "../../utils/BackgroundImageRatio";

const Breadcrumb = ({ right, name }) => {
  const router = useRouter();
  const [path, setPath] = useState();

  useEffect(() => {
    setPath(router.pathname.split("/"));
  }, [router.pathname]);

  // Determine the title to display
  const pageTitle = path && path[path.length - 1].replaceAll("-", " ") === "[id]" ? name : path && path[path.length - 1].replaceAll("-", " ");

  return (
    <section className="breadcrumb p-0">
      <Img
        src="/assets/images/about.jpg"
        className="bg-img img-fluid"
        alt=""
        
      />

      <h2 className="h-100 d-flex justify-center align-items-center text-white" style={{ margin: "0 5%" }}>
        {pageTitle}
      </h2>
    </section>
  );
};

export default Breadcrumb;
