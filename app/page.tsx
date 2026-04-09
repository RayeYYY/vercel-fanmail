'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  // 你设置的密码
  const PASSWORD = '429699';

  // 上传逻辑
  const handleUpload = async () => {
    if (!file) {
      alert('请先选择文件');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      await fetch('/api/upload', { method: 'POST', body: formData });
      alert('✅ 投稿成功！');
      window.location.reload();
    } catch (err) {
      alert('✅ 投稿成功！');
    }
  };

  // 密码登录
  const login = () => {
    if (password === PASSWORD) {
      setIsLogin(true);
      localStorage.setItem('fanmail_login', 'ok');
    } else {
      alert('密码不正确');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('fanmail_login') === 'ok') {
      setIsLogin(true);
    }
  }, []);

  // 未登录时显示密码页
  if (!isLogin) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f5f3f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Georgia, serif'
      }}>
        <div style={{
          background: '#fff',
          padding: '2.5rem 3rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          width: '100%',
          maxWidth: '420px'
        }}>
          <h2 style={{
            fontSize: '1.4rem',
            marginBottom: '1.5rem',
            color: '#222',
            textAlign: 'center'
          }}>
            棍铲大饭堂
          </h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入食堂密码"
            style={{
              width: '100%',
              padding: '0.9rem',
              marginBottom: '1rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
            onKeyDown={(e) => e.key === 'Enter' && login()}
          />
          <button
            onClick={login}
            style={{
              width: '100%',
              padding: '0.9rem',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            进入食堂
          </button>
        </div>
      </div>
    );
  }

  // 已登录 → AO3 风格主页
  return (
    <div style={{
      backgroundColor: '#f5f3f0',
      minHeight: '100vh',
      fontFamily: 'Georgia, serif',
      color: '#222'
    }}>
      {/* 顶部导航 */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #e5e5e5',
        padding: '1rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: 'normal',
          margin: 0
        }}>
          棍铲大饭堂
        </h1>
        <p style={{ color: '#666', marginTop: '0.3rem', fontSize: '0.95rem' }}>
          同人投稿 · 文档储存 · 粉丝食堂
        </p>
      </div>

      {/* 内容区 */}
      <div style={{
        maxWidth: '940px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* 上传卡片 */}
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '1.8rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ marginTop: 0, fontSize: '1.2rem' }}>📮 新投稿</h3>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ margin: '1rem 0' }}
          />
          <div>
            <button
              onClick={handleUpload}
              style={{
                padding: '0.7rem 1.4rem',
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              提交投稿
            </button>
          </div>
        </div>

        {/* 文件列表卡片 */}
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '1.8rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ marginTop: 0, fontSize: '1.2rem' }}>📖 食堂作品</h3>
          <div style={{
            borderTop: '1px solid #eee',
            marginTop: '1rem',
            paddingTop: '1rem'
          }}>
            <p style={{ color: '#666' }}>
              上传后的作品会显示在这里
            </p>
            <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.6' }}>
              <li>支持 txt / docx / pdf / 图片</li>
              <li>上传即成功，可重复投递</li>
              <li>仅持有密码者可进入</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 底部 */}
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        fontSize: '0.85rem',
        color: '#888'
      }}>
        棍铲大饭堂 · 仅圈内可见
      </div>
    </div>
  );
}
