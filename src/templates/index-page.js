import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import TechBlogRoll from "../components/TechBlogRoll";

// primary-red rgb: 175,44,29

export const IndexPageTemplate = ({ image, title, subtitle }) => (
  <div>
    <div
      className="full-width-image margin-top-0 index-image"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "150px",
          lineHeight: "1",
          justifyContent: "space-around",
          alignItems: "left",
          flexDirection: "column"
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              "rgba(255,231,204, 0.8) 0.5rem 0px 0px, rgba(255,231,204, 0.8) -0.5rem 0px 0px",
            backgroundColor: "rgba(255,231,204, 0.8)",
            color: "#0F0B66",
            lineHeight: "1",
            padding: "0.25em",
            width: "fit-content",
            "border-radius": "1px"
          }}
        >
          {title}
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              "rgba(255,231,204, 0.8) 0.5rem 0px 0px, rgba(255,231,204, 0.8) -0.5rem 0px 0px",
            backgroundColor: "rgba(255,231,204, 0.8)",
            color: "#0F0B66",
            lineHeight: "1",
            padding: "0.25em",
            "border-radius": "1px"
          }}
        >
          {subtitle}
        </h3>
      </div>
    </div>
    <div className="index-image-below"></div>
    <section className="section section--gradient index-body">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Technical Blog
                  </h3>
                  <h4>Find my technical posts on <a href="https://medium.com/@ian.mundy">Medium</a> as well.</h4>
                  <TechBlogRoll limit={4} />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/techBlog">
                      Technical Blog
                    </Link>
                  </div>
                  <h3 className="has-text-weight-semibold is-size-2">
                    Book Reviews
                  </h3>
                  <BlogRoll limit={4} />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/bookReviews">
                      Books
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subtitle: PropTypes.string
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subtitle={frontmatter.subtitle}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subtitle
      }
    }
  }
`;
