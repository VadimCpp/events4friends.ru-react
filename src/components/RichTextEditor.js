import React from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";

const plugins = [
  "emoticons advlist autolink lists link image charmap print preview anchor",
  "searchreplace visualblocks code fullscreen",
  "insertdatetime media table paste code help wordcount"
];

const toolbar = `emoticons | undo redo | formatselect | bold italic backcolor | 
alignleft aligncenter alignright alignjustify |
bullist numlist outdent indent | removeformat | help`;

const init = {
  height: 300,
  menubar: false,
  plugins,
  toolbar
};

export const ReachTextEditor = ({ description, onChange }) => {
  return (
    <Editor
      initialValue={description}
      apiKey={process.env.REACT_APP_RTE_KEY}
      init={init}
      onEditorChange={onChange}
    />
  );
};

ReachTextEditor.propTypes = {
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
