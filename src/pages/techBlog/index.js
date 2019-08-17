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
          className="full-width-image-container margin-top-0 tech-blog-cover-image"
          style={{
            backgroundImage: `url('/img/audio-mixing-ios-cover.jpg')`,
            backgroundPosition: "center"
          }}
        >
          <h1 className="has-text-weight-bold is-size-1 blog-index-title">
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
