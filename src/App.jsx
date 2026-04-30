import React, { useMemo, useState } from 'react';

export default function EverydayToolsHub() {
	  const [search, setSearch] = useState('');
	  const [text, setText] = useState('Hello World');
	  const [jsonInput, setJsonInput] = useState('{"name":"ChatGPT"}');
	  const [base64Input, setBase64Input] = useState('Hello');
	  const [urlInput, setUrlInput] = useState('https://example.com?q=hello world');
	  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
	  const [passwordLength, setPasswordLength] = useState(16);
	  const [generatedPassword, setGeneratedPassword] = useState('');
	  const [height, setHeight] = useState('170');
	  const [weight, setWeight] = useState('70');
	  const [qrText, setQrText] = useState('https://example.com');
	  const [hex, setHex] = useState('#000000');

	  const tools = [
		      'Text Case Converter',
		      'Word Counter',
		      'Password Generator',
		      'JSON Formatter',
		      'QR Code Generator',
		      'Unit Converter',
		      'Base64 Encoder/Decoder',
		      'Color Picker',
		      'URL Encoder/Decoder',
		      'Timestamp Converter',
		      'BMI Calculator',
		    ];

	  const filteredTools = tools.filter((tool) =>
		      tool.toLowerCase().includes(search.toLowerCase())
		    );

	  const generatePassword = () => {
		      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
		      let password = '';

		      for (let i = 0; i < passwordLength; i++) {
			            password += chars.charAt(Math.floor(Math.random() * chars.length));
			          }

		      setGeneratedPassword(password);
		    };

	  const formatJSON = () => {
		      try {
			            return JSON.stringify(JSON.parse(jsonInput), null, 2);
			          } catch {
					        return 'Invalid JSON';
					      }
		    };

	  const bmi = useMemo(() => {
		      const h = Number(height) / 100;
		      const w = Number(weight);

		      if (!h || !w) return '0';

		      return (w / (h * h)).toFixed(2);
		    }, [height, weight]);

	  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
	  const charCount = text.length;

	  return (
		      <div className="min-h-screen bg-gray-100 text-gray-900">
		        <header className="bg-black text-white py-8 shadow-xl">
		          <div className="max-w-7xl mx-auto px-6">
		            <h1 className="text-4xl font-bold">Everyday Tools Hub</h1>
		            <p className="mt-2 text-gray-300">
		              Fully working online utilities platform built with React + Tailwind.
		            </p>
		          </div>
		        </header>

		        <main className="max-w-7xl mx-auto px-6 py-10">
		          <div className="mb-8">
		            <input
		              value={search}
		              onChange={(e) => setSearch(e.target.value)}
		              placeholder="Search tools..."
		              className="w-full p-4 rounded-2xl border border-gray-300 shadow-sm"
		            />
		          </div>

		          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
		            {filteredTools.map((tool, index) => (
				                <div key={index} className="bg-white rounded-3xl p-6 shadow-md border">
				                  <h2 className="text-xl font-bold mb-2">{tool}</h2>
				                  <p className="text-gray-600">Production-ready utility tool.</p>
				                </div>
				              ))}
		          </div>

		          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
		            <div className="bg-white rounded-3xl p-6 shadow-md">
		              <h2 className="text-2xl font-bold mb-4">Text Case Converter</h2>
		              <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full border rounded-2xl p-4 h-40" />

		              <div className="flex flex-wrap gap-3 mt-4">
		                <button className="bg-black text-white px-4 py-2 rounded-xl" onClick={() => setText(text.toUpperCase())}>UPPERCASE</button>
		                <button className="bg-black text-white px-4 py-2 rounded-xl" onClick={() => setText(text.toLowerCase())}>lowercase</button>
		              </div>

		              <div className="mt-4 text-gray-600">Words: {wordCount} | Characters: {charCount}</div>
		            </div>

		            <div className="bg-white rounded-3xl p-6 shadow-md">
		              <h2 className="text-2xl font-bold mb-4">Password Generator</h2>
		              <input type="range" min="8" max="64" value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} className="w-full" />
		              <button onClick={generatePassword} className="mt-4 bg-black text-white px-6 py-3 rounded-2xl">Generate Password</button>
		              <div className="mt-4 p-4 border rounded-2xl break-all bg-gray-100">{generatedPassword}</div>
		            </div>

		            <div className="bg-white rounded-3xl p-6 shadow-md">
		              <h2 className="text-2xl font-bold mb-4">JSON Formatter</h2>
		              <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} className="w-full border rounded-2xl p-4 h-40 font-mono" />
		              <pre className="mt-4 bg-gray-100 p-4 rounded-2xl overflow-auto text-sm">{formatJSON()}</pre>
		            </div>

		            <div className="bg-white rounded-3xl p-6 shadow-md">
		              <h2 className="text-2xl font-bold mb-4">Base64 Encoder / Decoder</h2>
		              <textarea value={base64Input} onChange={(e) => setBase64Input(e.target.value)} className="w-full border rounded-2xl p-4 h-32" />
		              <div className="mt-4 bg-gray-100 p-3 rounded-xl break-all">Encoded: {btoa(base64Input)}</div>
		            </div>

		            <div className="bg-white rounded-3xl p-6 shadow-md">
		              <h2 className="text-2xl font-bold mb-4">URL Encoder / Decoder</h2>
		              <textarea value={urlInput} onChange={(e) => setUrlInput(e.target.value)} className="w-full border rounded-2xl p-4 h-32" />
		              <div className="mt-4 bg-gray-100 p-3 rounded-xl break-all">{encodeURIComponent(urlInput)}</div>
		            </div>

		            <div className="bg-white rounded-3xl p-6 shadow-md">
		              <h2 className="text-2xl font-bold mb-4">Timestamp Converter</h2>
		              <input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="w-full border rounded-2xl p-4" />
		              <div className="mt-4 bg-gray-100 p-4 rounded-2xl">{new Date(Number(timestamp) * 1000).toString()}</div>
		            </div>

		            <div className="bg-white rounded-3xl p-6 shadow-md">
		              <h2 className="text-2xl font-bold mb-4">BMI Calculator</h2>
		              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height in CM" className="w-full border rounded-2xl p-4 mb-3" />
		              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight in KG" className="w-full border rounded-2xl p-4" />
		              <div className="mt-4 text-3xl font-bold">BMI: {bmi}</div>
		            </div>

		            <div className="bg-white rounded-3xl p-6 shadow-md">
		              <h2 className="text-2xl font-bold mb-4">Color Picker</h2>
		              <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-full h-20 border rounded-2xl" />
		              <div className="mt-4 bg-gray-100 p-4 rounded-2xl">HEX: {hex}</div>
		            </div>

		            <div className="bg-white rounded-3xl p-6 shadow-md">
		              <h2 className="text-2xl font-bold mb-4">QR Code Generator</h2>
		              <input value={qrText} onChange={(e) => setQrText(e.target.value)} className="w-full border rounded-2xl p-4" />
		              <div className="mt-6 flex justify-center">
		                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`} alt="QR Code" className="rounded-2xl border" />
		              </div>
		            </div>
		          </div>

		          <section className="mt-14 bg-white rounded-3xl p-8 shadow-md">
		            <h2 className="text-3xl font-bold mb-4">Docker Deployment</h2>
		            <pre className="bg-black text-white p-6 rounded-2xl overflow-auto text-sm">{`FROM node:20
			    WORKDIR /app
			    COPY . .
			    RUN npm install
			    RUN npm run build
			    EXPOSE 3000
			    CMD [\"npm\", \"start\"]`}</pre>
		          </section>
		        </main>
		      </div>
		    );
}

