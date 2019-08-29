import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { HTMLContent } from "../components/Content";
import Helmet from "react-helmet";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";

class BookReviewIndexPage extends React.Component {
  render() {
    const { content } = this.props;

    return (
      <Layout>
        <Helmet title="Ian Mundy - Book Reviews" />
        <div
          className="full-width-image-container margin-top-0 book-review-cover-image"
          style={{
            backgroundImage: `url('/img/second-foundation.jpg')`,
            backgroundPosition: "center"
          }}
        >
          <h1 className="has-text-weight-bold is-size-1 blog-index-title">
            Book Reviews
          </h1>
        </div>
        <section className="section content">
          <div className="top-10-books">{content()}</div>
        </section>
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

BookReviewIndexPage.propTypes = {
  content: PropTypes.func
};

const BookReviewIndex = ({ data }) => {
  return (
    <BookReviewIndexPage
      content={() => {
        return <HTMLContent content={data.markdownRemark.html} />;
      }}
    />
  );
};

BookReviewIndex.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string
    })
  })
};

export default BookReviewIndex;

export const pageQuery = graphql`
  query BookReviewIndex($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
