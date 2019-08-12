import React from "react";

import Helmet from "react-helmet";
import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";

export default class BookReviewIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet title="Ian Mundy - Book Reviews" />
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/second-foundation.jpg')`,
            backgroundPosition: "center"
          }}
        >
          <h1 className="has-text-weight-bold is-size-1 blog-index-title">
            Book Reviews
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
