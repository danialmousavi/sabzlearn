import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default function Editor({value,setValue}) {
  return (
    <div>
      <h2>CKEditor 5 Example</h2>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(data);
        }}
      />
      <div style={{ marginTop: '20px' }}>
      </div>
    </div>
  )
}
