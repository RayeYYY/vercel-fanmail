'use client';
import { useState, useEffect } from 'react';
import { put, list } from '@vercel/blob';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [blobs, setBlobs] = useState<any[]>([]);

  // 上传文件
  const handleUpload = async () => {
    if (!file) return;
    try {
      // 关键：access: 'public'，公开模式，无需Token
      const { url } = await put(file.name, file, { access: 'public' });
      alert('上传成功！');
      window.location.reload(); // 刷新页面显示新文件
    } catch (error) {
      console.error('上传失败：', error);
      alert('上传失败，请重试！');
    }
  };

  // 获取文件列表
  useEffect(() => {
    const fetchBlobs = async () => {
      const { blobs } = await list();
      setBlobs(blobs);
    };
    fetchBlobs();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>同人公邮站</h1>
      
      {/* 上传区域 */}
      <div style={{ margin: '2rem 0' }}>
        <h3>📤 投稿上传</h3>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ margin: '1rem 0' }}
        />
        <button
          onClick={handleUpload}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          上传文件
        </button>
      </div>

      {/* 文库列表 */}
      <div>
        <h3>📚 文库列表</h3>
        {blobs.length === 0 ? (
          <p>暂无投稿文件</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {blobs.map((blob) => (
              <li key={blob.url} style={{ margin: '0.5rem 0' }}>
                <a href={blob.url} target="_blank" rel="noopener noreferrer">
                  {blob.pathname}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
