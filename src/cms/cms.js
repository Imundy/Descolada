import CMS from "decap-cms-app";
import uploadcare from "decap-cms-media-library-uploadcare";
import cloudinary from "decap-cms-media-library-cloudinary";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import BookReviewPreview from "./preview-templates/BookReviewPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import TechBlogPostPreview from "./preview-templates/TechBlogPostPreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("bookReviews", BookReviewPreview);
CMS.registerPreviewTemplate("techBlogPosts", TechBlogPostPreview);
