import React from "react";
import PropTypes from "prop-types";
import { BookReviewTemplate } from "../../templates/book-review";

const BookReviewPreview = ({ entry, widgetFor }) => (
  <BookReviewTemplate
    content={widgetFor("body")}
    description={entry.getIn(["data", "description"])}
    tags={entry.getIn(["data", "tags"])}
    title={entry.getIn(["data", "title"])}
  />
);

BookReviewPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default BookReviewPreview;
