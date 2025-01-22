'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<null | { url: string; title: string }>(null);
  const [language, setLanguage] = useState('zh');

  const handleParse = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      setVideoInfo(data);
    } catch (error) {
      console.error('解析失败:', error);
      alert('视频解析失败，请检查链接是否正确');
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">DouTikYou</span>
            </div>
            <div className="relative inline-block text-left">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {language === 'zh' ? '中文' : 'English'}
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{language === 'zh' ? '视频解析下载' : 'Video Parser'}</h1>
            <p className="text-gray-600 mb-8">{language === 'zh' ? '一键复制URL链接，即可下载！完全免费！' : 'Just copy and paste URL to download! Completely free!'}</p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">
            {/* 左侧支持平台卡片 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'zh' ? '支持平台' : 'Supported Platforms'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: '微博', icon: '🔥', color: 'bg-red-500' },
                  { name: '抖音', icon: '🎵', color: 'bg-black' },
                  { name: 'YouTube', icon: '▶️', color: 'bg-red-600' },
                  { name: 'Twitter', icon: '🐦', color: 'bg-blue-400' },
                  { name: 'Bilibili', icon: '📺', color: 'bg-pink-400' }
                ].map((platform) => (
                  <div
                    key={platform.name}
                    className={`${platform.color} p-4 rounded-lg shadow-md text-white text-center transform transition-transform hover:scale-105`}
                  >
                    <div className="text-2xl mb-2">{platform.icon}</div>
                    <div className="font-medium">{platform.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 中间解析卡片 */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center">
              <div className="text-gray-500 text-sm mb-4 text-center">
                {language === 'zh' ? '本站不缓存任何网站的视频内容' : 'This site does not cache any video content'}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={language === 'zh' ? '请输入视频链接' : 'Please enter video URL'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleParse}
                disabled={loading || !url}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${loading || !url ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {loading ? (language === 'zh' ? '解析中...' : 'Parsing...') : (language === 'zh' ? '开始解析' : 'Start Parsing')}
              </button>

              {videoInfo && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{language === 'zh' ? '解析结果' : 'Parse Result'}</h3>
                  <p className="text-gray-600 mb-4">{videoInfo.title}</p>
                  <a
                    href={videoInfo.url}
                    download
                    className="inline-block w-full text-center py-2 px-4 border border-transparent rounded-md text-white bg-green-600 hover:bg-green-700 font-medium"
                  >
                    {language === 'zh' ? '下载视频' : 'Download Video'}
                  </a>
                  <div className="text-gray-500 text-xs mt-4 text-center">
                    {language === 'zh' ? '设计的图片和视频归相关网站和作者所有' : 'All images and videos belong to their respective websites and authors'}
                  </div>
                </div>
              )}
            </div>

            {/* 右侧使用说明卡片 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'zh' ? '使用说明' : 'Usage Guide'}
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {language === 'zh' ? '网页版' : 'Web Version'}
                  </h4>
                  <p className="text-gray-600">
                    {language === 'zh' 
                      ? '直接浏览器打开视频后，复制浏览器的URL和链接，粘贴到输入框即可！'
                      : 'Open the video in your browser, copy the URL, and paste it into the input box!'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {language === 'zh' ? 'APP端' : 'Mobile App'}
                  </h4>
                  <p className="text-gray-600">
                    {language === 'zh'
                      ? '打开某个视频，复制分享链接粘贴到输入框，点击开始按钮即可。'
                      : 'Open a video in the app, copy the share link, paste it into the input box, and click the start button.'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {language === 'zh' ? '更多教程' : 'More Tutorials'}
                  </h4>
                  <p className="text-gray-600">
                    {language === 'zh'
                      ? '更多教程请跳转本站教程页面'
                      : 'Please visit our tutorial page for more guides'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
