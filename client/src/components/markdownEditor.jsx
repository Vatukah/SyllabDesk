import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize'



export default function MarkdownEditor({value,setValue}) {
  

  return (
    <div className="container mx-auto primary-bg border rounded">
      <MDEditor value={value} onChange={setValue}  previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }} />
    </div>
  );
}
