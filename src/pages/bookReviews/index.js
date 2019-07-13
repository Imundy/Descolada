import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/second_foundation.jpg')`,
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
            Latest Book Reviews
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
