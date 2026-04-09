'use client';

import { useState, useRef } from 'react';
import { put } from '@vercel/blob';
import { list } from '@vercel/blob';

export default function Home() {
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 加载文件列表
  const loadFiles = async () => {
    const { blobs } = await list();
    setFiles(blobs);
  };

  // 上传文件
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { url } = await put(file.name, file, {
        access: 'public',
      });
      await loadFiles();
      alert(`上传成功！\n文件地址：${url}`);
    } catch (error) {
      alert('上传失败，请重试');
      console.error(error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // 初始化加载
  useState(() => {
    loadFiles();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">同人公邮站</h1>
        
        {/* 上传区域 */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">📤 投稿上传</h2>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />
          {uploading && <p className="mt-2 text-purple-400">上传中...</p>}
        </div>

        {/* 文件列表 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">📚 文库列表</h2>
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.url} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span className="truncate">{file.pathname}</span>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  下载/查看
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
