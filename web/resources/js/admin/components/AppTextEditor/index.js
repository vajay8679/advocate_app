import React from 'react';
import {FormLabel, Box} from "@mui/material";
import {CKEditor} from "@ckeditor/ckeditor5-react";


//import Editor from 'ckeditor5-custom-build';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ClassicEditor from 'ckeditor5-custom-build'

import MyUploadAdapterPlugin from "./UploadPlugin";
import './editor.css';
const AppTextEditor = ({value, onChange, label}) => {
  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  }
  return (<>
    <Box >
      <FormLabel sx={{marginBottom: '10px'}}>{label}</FormLabel>
      <CKEditor
        config={{
          title: false,
          extraPlugins: [MyUploadAdapterPlugin],
          indentBlock: {
            offset: 1,
            unit: 'em'
          }
        }}
        editor={ClassicEditor}
        // onReady={(editor)=> {}}
        onChange={(event, editor) => {
          const data = editor.getData()
          handleChange(data)
        }}
        data={value}
      />
      {/*<div dangerouslySetInnerHTML={{__html: textValue}}></div>*/}
    </Box>
    </>)
}
export default AppTextEditor;
