import React from "react";
import PropTypes from "prop-types";
import { TechBlogPostTemplate } from "../../templates/tech-blog-post";

const TechBlogPostPreview = ({ entry, widgetFor }) => (
  <TechBlogPostTemplate
    content={widgetFor("body")}
    description={entry.getIn(["data", "description"])}
    tags={entry.getIn(["data", "tags"])}
    title={entry.getIn(["data", "title"])}
  />
);

TechBlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default TechBlogPostPreview;
