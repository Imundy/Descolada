import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const BookReviewTemplate = ({
  content,
  contentComponent,
  description,
  rating,
  tags,
  title,
  helmet,
  featuredImage,
  featuredQuote
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="blog-post-title-container">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <div className="rating">
                <span style={{ fontStyle: "italic" }}>{"My rating: "}</span>
                {`${rating}/10`}
              </div>
            </div>
            <p className="blog-post-description">{description}</p>
            <div className="blog-post-image-container">
              <div className="blog-post-image">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: featuredImage,
                    alt: title
                  }}
                />
              </div>
              <h4>
                {featuredQuote.split("\\n").map((text, i) => (
                  <span key={i}>{text}</span>
                ))}
              </h4>
            </div>
            <PostContent className="content" content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

BookReviewTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  rating: PropTypes.number,
  helmet: PropTypes.object,
  featuredImage: PropTypes.string
};

const BookReview = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BookReviewTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        rating={post.frontmatter.rating}
        featuredImage={post.frontmatter.featuredimage}
        featuredQuote={post.frontmatter.featuredquote}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BookReview.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BookReview;

export const pageQuery = graphql`
  query BookReviewByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        rating
        featuredquote
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
