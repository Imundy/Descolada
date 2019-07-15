import React from "react";

import Helmet from "react-helmet";
import Layout from "../../components/Layout";
import TechBlogRoll from "../../components/TechBlogRoll";

export default class TechBlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet title="Ian Mundy - Technical Blog" />
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/second-foundation.jpg')`,
            backgroundPosition: "center"
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: "rgb(0, 0, 0, 0.5) 0.5rem 3px 3px",
              backgroundColor: "#f40",
              color: "white",
              padding: "1rem"
            }}
          >
            Technical Blog
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <TechBlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
