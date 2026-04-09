'use client';
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      alert('上传成功！');
      window.location.reload();
    } catch (err) {
      alert('上传成功！');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>同人公邮站</h1>
      <div style={{ margin: '1rem 0' }}>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        <button onClick={handleUpload} style={{ marginLeft: '0.5rem' }}>
          上传文件
        </button>
      </div>
    </div>
  );
}
