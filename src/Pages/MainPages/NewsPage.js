import React from "react";
import { Navbar } from "../../Components/Navbar/navbar";
import { Footer } from "../../Components/Footer/footer";
import { NewsContainer } from "../../Components/NewsContainer/NewsContainer";

export const NewsPage = (props) => {
  return (
    <>
      <Navbar />
      <div className="page newspage">
        <NewsContainer showTitle={true} />
      </div>
      <Footer />
    </>
  );
};