import React, { useEffect, useState } from 'react';
import { Media } from '../components/Media';

export const AdminPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/data')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Make sure your local-cms.js server is running!", err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost:3001/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Saved successfully! Commit your changes to Git.');
      } else {
        alert('Failed to save.');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving data. Is the server running?');
    }
    setSaving(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, pathCallback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        pathCallback(result.url);
      } else {
        alert('Upload failed.');
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading file. Is the server running?');
    }
    setUploading(false);
  };

  if (loading) return <div className="p-10 text-white bg-black min-h-screen">Loading CMS...</div>;
  if (!data) return <div className="p-10 text-white bg-black min-h-screen">Failed to connect to local CMS server. Did you run `node server/local-cms.js`?</div>;

  return (
    <div className="p-10 text-white bg-black min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Local Content Manager</h1>
          <button 
            onClick={handleSave} 
            disabled={saving || uploading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Hero Section */}
        <section className="mb-10 bg-gray-900 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Hero Section</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Banner Image URL</label>
            <div className="flex gap-4">
              <input 
                type="text" 
                value={data.hero.banner} 
                onChange={(e) => setData({ ...data, hero: { ...data.hero, banner: e.target.value } })}
                className="bg-gray-800 text-white p-2 rounded flex-1 border border-gray-700"
              />
              <label className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-4 py-2 rounded flex items-center justify-center">
                {uploading ? 'Uploading...' : 'Upload New'}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*,video/*"
                  onChange={(e) => handleUpload(e, (url) => setData({ ...data, hero: { ...data.hero, banner: url } }))} 
                />
              </label>
            </div>
            {data.hero.banner && <Media src={data.hero.banner} className="h-32 object-contain mt-2" alt="Preview" />}
          </div>
        </section>

        {/* Marquee Section */}
        <section className="mb-10 bg-gray-900 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Marquee Images ({data.marquee.length})</h2>
          <p className="text-sm text-gray-400 mb-4">You can paste URLs directly or upload a new file below.</p>
          
          <div className="mb-6 flex gap-4 items-center">
            <label className="bg-green-600 hover:bg-green-500 cursor-pointer px-6 py-2 rounded font-bold flex-1 text-center">
              {uploading ? 'Uploading...' : '+ Upload New Image to Marquee'}
              <input 
                type="file" 
                className="hidden" 
                accept="image/*,video/*,.gif"
                onChange={(e) => handleUpload(e, (url) => setData({ ...data, marquee: [...data.marquee, url] }))} 
              />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {data.marquee.map((url: string, index: number) => (
              <div key={index} className="relative group bg-gray-800 p-2 rounded border border-gray-700">
                <Media src={url} className="w-full h-24 object-cover rounded mb-2" alt="Marquee item" />
                <input 
                  type="text" 
                  value={url} 
                  onChange={(e) => {
                    const newArr = [...data.marquee];
                    newArr[index] = e.target.value;
                    setData({ ...data, marquee: newArr });
                  }}
                  className="w-full bg-gray-900 text-xs p-1 rounded border border-gray-700 text-white"
                />
                <button 
                  onClick={() => {
                    const newArr = [...data.marquee];
                    newArr.splice(index, 1);
                    setData({ ...data, marquee: newArr });
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs hidden group-hover:block"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* About Us Icons */}
        <section className="mb-10 bg-gray-900 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">About Us Icons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((pos) => (
              <div key={pos} className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 capitalize">{pos.replace(/([A-Z])/g, ' $1')} Icon</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={data.about.icons[pos]} 
                    onChange={(e) => setData({ ...data, about: { ...data.about, icons: { ...data.about.icons, [pos]: e.target.value } } })}
                    className="bg-gray-800 text-white p-2 rounded flex-1 border border-gray-700 text-xs"
                  />
                  <label className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-3 py-2 rounded text-xs flex items-center">
                    Upload
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*,video/*"
                      onChange={(e) => handleUpload(e, (url) => setData({ ...data, about: { ...data.about, icons: { ...data.about.icons, [pos]: url } } }))} 
                    />
                  </label>
                </div>
                {data.about.icons[pos] && <Media src={data.about.icons[pos]} className="h-16 object-contain mt-1" alt="Preview" />}
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Links Section */}
        <section className="mb-10 bg-gray-900 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Portfolio Links</h2>
            <button 
              onClick={() => {
                setData({ 
                  ...data, 
                  portfolioLinks: [
                    { title: "New Link", category: "WordPress Website", url: "https://", image: "" }, 
                    ...data.portfolioLinks
                  ] 
                });
              }}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 text-sm rounded font-bold"
            >
              + Add Link
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {data.portfolioLinks?.map((link: any, index: number) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700 relative group">
                <button 
                  onClick={() => {
                    const newArr = [...data.portfolioLinks];
                    newArr.splice(index, 1);
                    setData({ ...data, portfolioLinks: newArr });
                  }}
                  className="absolute -top-3 -right-3 bg-red-600 text-white w-6 h-6 rounded-full text-xs hidden group-hover:block z-10"
                >
                  X
                </button>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Thumbnail */}
                  <div className="w-full sm:w-1/3 flex flex-col gap-2">
                    <Media src={link.image} className="w-full aspect-video object-cover rounded bg-black" alt="Thumbnail" />
                    <label className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-2 py-1 rounded text-xs text-center w-full">
                      Upload Thumbnail
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*,video/*"
                        onChange={(e) => handleUpload(e, (url) => {
                          const newArr = [...data.portfolioLinks];
                          newArr[index].image = url;
                          setData({ ...data, portfolioLinks: newArr });
                        })} 
                      />
                    </label>
                  </div>
                  {/* Details */}
                  <div className="w-full sm:w-2/3 flex flex-col gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Title</label>
                      <input type="text" value={link.title} onChange={(e) => {
                        const newArr = [...data.portfolioLinks];
                        newArr[index].title = e.target.value;
                        setData({ ...data, portfolioLinks: newArr });
                      }} className="w-full bg-gray-900 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Category</label>
                      <select 
                        value={link.category} 
                        onChange={(e) => {
                          const newArr = [...data.portfolioLinks];
                          newArr[index].category = e.target.value;
                          setData({ ...data, portfolioLinks: newArr });
                        }} 
                        className="w-full bg-gray-900 p-2 rounded text-sm text-white border-r-8 border-transparent"
                      >
                        <option value="WordPress Website">WordPress Website</option>
                        <option value="Shopify Website">Shopify Website</option>
                        <option value="3D Animated Website">3D Animated Website</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">URL (opens on click)</label>
                      <input type="text" value={link.url} onChange={(e) => {
                        const newArr = [...data.portfolioLinks];
                        newArr[index].url = e.target.value;
                        setData({ ...data, portfolioLinks: newArr });
                      }} className="w-full bg-gray-900 p-2 rounded text-sm text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Portfolio Links'}
            </button>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-10 bg-gray-900 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Case Studies Section (Projects)</h2>
          <div className="flex flex-col gap-8">
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-bold mb-4">{project.number}. {project.name}</h3>
                
                {/* Project Data */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Project Name</label>
                    <input type="text" value={project.name} onChange={(e) => {
                      const newArr = [...data.projects];
                      newArr[index].name = e.target.value;
                      setData({ ...data, projects: newArr });
                    }} className="w-full bg-gray-900 p-2 rounded text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Category</label>
                    <input type="text" value={project.category} onChange={(e) => {
                      const newArr = [...data.projects];
                      newArr[index].category = e.target.value;
                      setData({ ...data, projects: newArr });
                    }} className="w-full bg-gray-900 p-2 rounded text-sm text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['leftTop', 'leftBottom', 'right'].map((imgKey) => (
                    <div key={imgKey} className="flex flex-col gap-2">
                      <label className="text-xs text-gray-400 capitalize">{imgKey.replace(/([A-Z])/g, ' $1')} Image</label>
                      <div className="flex flex-col gap-2">
                        <Media src={project.images[imgKey]} className="w-full h-24 object-cover rounded bg-black" alt="Preview" />
                        <label className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-2 py-1 rounded text-xs text-center w-full">
                          Upload Replacement
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*,video/*"
                            onChange={(e) => handleUpload(e, (url) => {
                              const newArr = [...data.projects];
                              newArr[index].images[imgKey] = url;
                              setData({ ...data, projects: newArr });
                            })} 
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Data (Raw JSON) */}
        <section className="mb-10 bg-gray-900 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Advanced: Edit Raw JSON</h2>
          <p className="text-sm text-gray-400 mb-4">For Projects and About Icons, you can directly edit the JSON structure here.</p>
          <textarea 
            className="w-full h-96 bg-gray-800 text-green-400 font-mono p-4 rounded border border-gray-700"
            value={JSON.stringify(data, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setData(parsed);
              } catch (err) {
                // Ignore parsing errors while typing
              }
            }}
          />
        </section>

      </div>
    </div>
  );
};
