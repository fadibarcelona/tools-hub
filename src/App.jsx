import React, { useMemo, useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import yaml from 'js-yaml';
import { v4 as uuidv4 } from 'uuid';
import { QRCodeCanvas } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';

export default function App() {
	  const [page, setPage] = useState('home');

	  /* =========================
	   *      STATES
	   *        ========================= */

	  const [text, setText] = useState('Hello World');
	  const [text2, setText2] = useState('Hello World!');

	  const [jsonInput, setJsonInput] = useState('{"name":"ChatGPT"}');

	  const [passwordLength, setPasswordLength] = useState(16);
	  const [generatedPassword, setGeneratedPassword] = useState('');

	  const [yamlInput, setYamlInput] = useState(
		  `name: app
		  services:
		    web:
		        image: nginx`
		    );

	  const [uuidValue, setUuidValue] = useState('');

	  const [hashInput, setHashInput] = useState('hello');

	  const [jwtInput, setJwtInput] = useState('');

	  const [markdownInput, setMarkdownInput] = useState('# Hello');

	  const [regexPattern, setRegexPattern] = useState('\\d+');

	  const [regexText, setRegexText] = useState('hello 123');

	  const [qrValue, setQrValue] = useState('https://google.com');

	  const [ageDate, setAgeDate] = useState('2000-01-01');

	  const [height, setHeight] = useState('170');

	  const [weight, setWeight] = useState('70');

	  const [meters, setMeters] = useState('1');

	  const [kg, setKg] = useState('1');

	  const [temp, setTemp] = useState('0');

	  const [hex, setHex] = useState('#000000');

	  const [imagePreview, setImagePreview] = useState(null);

	  const [compressedImage, setCompressedImage] = useState(null);

	  const fileInputRef = useRef(null);

	  /* =========================
	   *      FUNCTIONS
	   *        ========================= */

	  const generatePassword = () => {
		      const chars =
			        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

		      let password = '';

		      for (let i = 0; i < passwordLength; i++) {
			            password += chars[Math.floor(Math.random() * chars.length)];
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

	  /* YAML VALIDATOR */

	  const validateYAML = () => {
		      try {
			            yaml.load(yamlInput);

			            const lines = yamlInput.split('\n');

			            for (let line of lines) {
					            const spaces = line.match(/^ */)[0].length;

					            if (spaces % 2 !== 0) {
							              return 'Invalid YAML indentation';
							            }
					          }

			            return 'Valid YAML';
			          } catch (e) {
					        return `Invalid YAML: ${e.message}`;
					      }
		    };

	  const generateHash = () => {
		      return CryptoJS.SHA256(hashInput).toString();
		    };

	  const decodeJWT = () => {
		      try {
			            const parts = jwtInput.split('.');

			            if (parts.length !== 3) {
					            return 'Invalid JWT';
					          }

			            const payload = JSON.parse(atob(parts[1]));

			            return JSON.stringify(payload, null, 2);
			          } catch {
					        return 'Invalid JWT';
					      }
		    };

	  const regexMatches = () => {
		      try {
			            const regex = new RegExp(regexPattern, 'g');

			            return regexText.match(regex)?.join(', ') || 'No matches';
			          } catch {
					        return 'Invalid Regex';
					      }
		    };

	  const calculateAge = () => {
		      const birth = new Date(ageDate);

		      const today = new Date();

		      let age = today.getFullYear() - birth.getFullYear();

		      const m = today.getMonth() - birth.getMonth();

		      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
			            age--;
			          }

		      return age;
		    };

	  const bmi = useMemo(() => {
		      const h = Number(height) / 100;

		      const w = Number(weight);

		      if (!h || !w) return 0;

		      return w / (h * h);
		    }, [height, weight]);

	  const bmiStatus = () => {
		      if (bmi < 18.5) return 'Underweight';
		      if (bmi < 25) return 'Healthy';
		      if (bmi < 30) return 'Overweight';
		      return 'Obese';
		    };

	  /* =========================
	   *      IMAGE COMPRESSOR
	   *        ========================= */

	  const handleImageUpload = (e) => {
		      const file = e.target.files[0];

		      if (!file) return;

		      const reader = new FileReader();

		      reader.onload = (event) => {
			            const img = new Image();

			            img.onload = () => {
					            const canvas = document.createElement('canvas');

					            const ctx = canvas.getContext('2d');

					            const MAX_WIDTH = 800;

					            const scale = MAX_WIDTH / img.width;

					            canvas.width = MAX_WIDTH;

					            canvas.height = img.height * scale;

					            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

					            const compressed = canvas.toDataURL('image/jpeg', 0.6);

					            setImagePreview(event.target.result);

					            setCompressedImage(compressed);
					          };

			            img.src = event.target.result;
			          };

		      reader.readAsDataURL(file);
		    };

	  /* =========================
	   *      TEXT DIFFERENCE
	   *        ========================= */

	  const diffView = () => {
		      const a = text.split('\n');

		      const b = text2.split('\n');

		      const max = Math.max(a.length, b.length);

		      return Array.from({ length: max }, (_, i) => {
			            const left = a[i] || '';

			            const right = b[i] || '';

			            const changed = left !== right;

			            return (
					            <div
					              key={i}
					              className={`grid grid-cols-2 border-b ${
							                  changed ? 'bg-red-100' : 'bg-green-100'
							                }`}
					            >
					              <div className="p-2 whitespace-pre-wrap">
					                {left}
					              </div>

					              <div className="p-2 whitespace-pre-wrap">
					                {right}
					              </div>
					            </div>
					          );
			          });
		    };

	  /* =========================
	   *      NAV BUTTON
	   *        ========================= */

	  const NavButton = ({ id, label }) => (
		      <button
		        onClick={() => setPage(id)}
		        className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm"
		      >
		        {label}
		      </button>
		    );

	  return (
		      <div className="min-h-screen bg-gray-100 text-gray-900">

		        {/* NAVBAR */}

		        <div className="bg-black text-white p-4 flex flex-wrap gap-2">

		          <NavButton id="home" label="Home" />
		          <NavButton id="text" label="Text Case Converter" />
		          <NavButton id="password" label="Password Generator" />
		          <NavButton id="diff" label="Text Difference Checker" />
		          <NavButton id="json" label="JSON Formatter" />
		          <NavButton id="yaml" label="YAML Validator" />
		          <NavButton id="uuid" label="UUID Generator" />
		          <NavButton id="hash" label="Hash Generator" />
		          <NavButton id="jwt" label="JWT Decoder" />
		          <NavButton id="markdown" label="Markdown Preview" />
		          <NavButton id="regex" label="Regex Tester" />
		          <NavButton id="qr" label="QR Generator" />
		          <NavButton id="image" label="Image Compressor" />
		          <NavButton id="age" label="Age Calculator" />
		          <NavButton id="bmi" label="BMI Calculator" />
		          <NavButton id="temp" label="Temperature Converter" />
		          <NavButton id="length" label="Length Converter" />
		          <NavButton id="weight" label="Weight Converter" />
		          <NavButton id="color" label="Color Picker" />

		        </div>

		        <div className="p-6">

		          {/* HOME */}

		          {page === 'home' && (
				            <div>
				              <h1 className="text-4xl font-bold">
				                SaaS Tools Hub
				              </h1>

				              <p className="mt-3 text-gray-600">
				                Production-ready utility platform
				              </p>
				            </div>
				          )}

		          {/* TEXT CASE */}

		          {page === 'text' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                Text Case Converter
				              </h2>

				              <textarea
				                value={text}
				                onChange={(e) => setText(e.target.value)}
				                className="w-full h-40 border p-3 rounded"
				              />

				              <div className="flex gap-3 mt-4 flex-wrap">

				                <button
				                  onClick={() => setText(text.toUpperCase())}
				                  className="bg-black text-white px-4 py-2 rounded"
				                >
				                  UPPERCASE
				                </button>

				                <button
				                  onClick={() => setText(text.toLowerCase())}
				                  className="bg-black text-white px-4 py-2 rounded"
				                >
				                  lowercase
				                </button>

				                <button
				                  onClick={() =>
							                    setText(
										                        text.replace(
														                      /\w\S*/g,
														                      (txt) =>
														                        txt.charAt(0).toUpperCase() +
														                        txt.substr(1).toLowerCase()
														                    )
										                      )
							                  }
				                  className="bg-black text-white px-4 py-2 rounded"
				                >
				                  Title Case
				                </button>

				              </div>
				            </div>
				          )}

		          {/* PASSWORD */}

		          {page === 'password' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                Password Generator
				              </h2>

				              <input
				                type="range"
				                min="6"
				                max="64"
				                value={passwordLength}
				                onChange={(e) => setPasswordLength(Number(e.target.value))}
				                className="w-full"
				              />

				              <button
				                onClick={generatePassword}
				                className="mt-4 bg-black text-white px-4 py-2 rounded"
				              >
				                Generate Password
				              </button>

				              <div className="mt-4 bg-gray-100 p-3 rounded break-all">
				                {generatedPassword}
				              </div>

				            </div>
				          )}

		          {/* TEXT DIFF */}

		          {page === 'diff' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                Text Difference Checker
				              </h2>

				              <div className="grid md:grid-cols-2 gap-4">

				                <textarea
				                  value={text}
				                  onChange={(e) => setText(e.target.value)}
				                  className="border p-3 rounded h-64"
				                />

				                <textarea
				                  value={text2}
				                  onChange={(e) => setText2(e.target.value)}
				                  className="border p-3 rounded h-64"
				                />

				              </div>

				              <div className="mt-6 border rounded overflow-hidden">
				                {diffView()}
				              </div>

				            </div>
				          )}

		          {/* JSON */}

		          {page === 'json' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                JSON Formatter
				              </h2>

				              <textarea
				                value={jsonInput}
				                onChange={(e) => setJsonInput(e.target.value)}
				                className="w-full h-40 border p-3 rounded"
				              />

				              <pre className="mt-4 bg-gray-100 p-3 rounded overflow-auto">
				                {formatJSON()}
				              </pre>

				            </div>
				          )}

		          {/* YAML */}

		          {page === 'yaml' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                YAML Validator
				              </h2>

				              <textarea
				                value={yamlInput}
				                onChange={(e) => setYamlInput(e.target.value)}
				                className="w-full h-48 border p-3 rounded font-mono"
				              />

				              <div className="mt-4 bg-gray-100 p-3 rounded">
				                {validateYAML()}
				              </div>

				            </div>
				          )}

		          {/* UUID */}

		          {page === 'uuid' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                UUID Generator
				              </h2>

				              <button
				                onClick={() => setUuidValue(uuidv4())}
				                className="bg-black text-white px-4 py-2 rounded"
				              >
				                Generate UUID
				              </button>

				              <div className="mt-4 bg-gray-100 p-3 rounded break-all">
				                {uuidValue}
				              </div>

				            </div>
				          )}

		          {/* HASH */}

		          {page === 'hash' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                SHA256 Hash Generator
				              </h2>

				              <textarea
				                value={hashInput}
				                onChange={(e) => setHashInput(e.target.value)}
				                className="w-full h-32 border p-3 rounded"
				              />

				              <div className="mt-4 bg-gray-100 p-3 rounded break-all">
				                {generateHash()}
				              </div>

				            </div>
				          )}

		          {/* JWT */}

		          {page === 'jwt' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                JWT Decoder
				              </h2>

				              <textarea
				                value={jwtInput}
				                onChange={(e) => setJwtInput(e.target.value)}
				                className="w-full h-40 border p-3 rounded"
				              />

				              <pre className="mt-4 bg-gray-100 p-3 rounded overflow-auto">
				                {decodeJWT()}
				              </pre>

				            </div>
				          )}

		          {/* MARKDOWN */}

		          {page === 'markdown' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                Markdown Preview
				              </h2>

				              <textarea
				                value={markdownInput}
				                onChange={(e) => setMarkdownInput(e.target.value)}
				                className="w-full h-40 border p-3 rounded"
				              />

				              <div className="mt-4 bg-gray-100 p-4 rounded prose max-w-none">
				                <ReactMarkdown>
				                  {markdownInput}
				                </ReactMarkdown>
				              </div>

				            </div>
				          )}

		          {/* REGEX */}

		          {page === 'regex' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                Regex Tester
				              </h2>

				              <input
				                value={regexPattern}
				                onChange={(e) => setRegexPattern(e.target.value)}
				                className="w-full border p-3 rounded mb-3"
				              />

				              <textarea
				                value={regexText}
				                onChange={(e) => setRegexText(e.target.value)}
				                className="w-full h-32 border p-3 rounded"
				              />

				              <div className="mt-4 bg-gray-100 p-3 rounded">
				                {regexMatches()}
				              </div>

				            </div>
				          )}

		          {/* QR */}
                           {page === 'qr' && (
				     <div className="bg-white p-6 rounded shadow">

				       <h2 className="text-2xl font-bold mb-4">
				         QR Generator
				       </h2>

				       <input
				         value={qrValue}
				         onChange={(e) => setQrValue(e.target.value)}
				         className="w-full border p-3 rounded"
				         placeholder="Enter text or URL"
				       />

				       <div className="mt-6 flex justify-center p-6 border rounded bg-white">

				         {qrValue.trim() ? (
						         <QRCodeCanvas
						           value={qrValue}
						           size={220}
						           bgColor="#ffffff"
						           fgColor="#000000"
						         />
						       ) : (
							               <p className="text-gray-500">
							                 Type something to generate QR
							               </p>
							             )}

				       </div>

				     </div>
			   )}

		          {/* IMAGE COMPRESSOR */}

		          {page === 'image' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                Image Compressor
				              </h2>

				              <input
				                type="file"
				                accept="image/*"
				                ref={fileInputRef}
				                onChange={handleImageUpload}
				              />

				              {imagePreview && (
						                    <div className="mt-6">

						                      <h3 className="font-bold mb-2">
						                        Original
						                      </h3>

						                      <img
						                        src={imagePreview}
						                        alt="Original"
						                        className="max-w-xs rounded border"
						                      />

						                    </div>
						                  )}

				              {compressedImage && (
						                    <div className="mt-6">

						                      <h3 className="font-bold mb-2">
						                        Compressed
						                      </h3>

						                      <img
						                        src={compressedImage}
						                        alt="Compressed"
						                        className="max-w-xs rounded border"
						                      />

						                      <a
						                        href={compressedImage}
						                        download="compressed.jpg"
						                        className="inline-block mt-4 bg-black text-white px-4 py-2 rounded"
						                      >
						                        Download Compressed Image
						                      </a>

						                    </div>
						                  )}

				            </div>
				          )}

		          {/* AGE */}

		          {page === 'age' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                Age Calculator
				              </h2>

				              <input
				                type="date"
				                value={ageDate}
				                onChange={(e) => setAgeDate(e.target.value)}
				                className="border p-3 rounded"
				              />

				              <div className="mt-4 text-xl font-bold">
				                Age: {calculateAge()} years
				              </div>

				            </div>
				          )}

		          {/* BMI */}

		          {page === 'bmi' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                BMI Calculator
				              </h2>

				              <input
				                type="number"
				                value={height}
				                onChange={(e) => setHeight(e.target.value)}
				                placeholder="Height in CM"
				                className="w-full border p-3 rounded mb-3"
				              />

				              <input
				                type="number"
				                value={weight}
				                onChange={(e) => setWeight(e.target.value)}
				                placeholder="Weight in KG"
				                className="w-full border p-3 rounded"
				              />

				              <div className="mt-4 text-xl font-bold">
				                BMI: {bmi.toFixed(2)} ({bmiStatus()})
				              </div>

				            </div>
				          )}

		          {/* TEMPERATURE */}

		          {page === 'temp' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                Temperature Converter
				              </h2>

				              <input
				                type="number"
				                value={temp}
				                onChange={(e) => setTemp(e.target.value)}
				                className="w-full border p-3 rounded"
				              />

				              <div className="mt-4 bg-gray-100 p-3 rounded">
				                Celsius: {temp}°C
				              </div>

				              <div className="mt-2 bg-gray-100 p-3 rounded">
				                Fahrenheit: {(temp * 9 / 5 + 32).toFixed(2)}°F
				              </div>

				              <div className="mt-2 bg-gray-100 p-3 rounded">
				                Kelvin: {(Number(temp) + 273.15).toFixed(2)}K
				              </div>

				            </div>
				          )}

		          {/* LENGTH */}

		          {page === 'length' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                Length Converter
				              </h2>

				              <input
				                type="number"
				                value={meters}
				                onChange={(e) => setMeters(e.target.value)}
				                className="w-full border p-3 rounded"
				              />

				              <div className="mt-4 bg-gray-100 p-3 rounded">
				                Kilometers: {(meters / 1000).toFixed(4)} km
				              </div>

				              <div className="mt-2 bg-gray-100 p-3 rounded">
				                Centimeters: {(meters * 100).toFixed(2)} cm
				              </div>

				              <div className="mt-2 bg-gray-100 p-3 rounded">
				                Inches: {(meters * 39.3701).toFixed(2)} in
				              </div>

				              <div className="mt-2 bg-gray-100 p-3 rounded">
				                Feet: {(meters * 3.28084).toFixed(2)} ft
				              </div>

				            </div>
				          )}

		          {/* WEIGHT */}

		          {page === 'weight' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                Weight Converter
				              </h2>

				              <input
				                type="number"
				                value={kg}
				                onChange={(e) => setKg(e.target.value)}
				                className="w-full border p-3 rounded"
				              />

				              <div className="mt-4 bg-gray-100 p-3 rounded">
				                Grams: {(kg * 1000).toFixed(2)} g
				              </div>

				              <div className="mt-2 bg-gray-100 p-3 rounded">
				                Pounds: {(kg * 2.20462).toFixed(2)} lbs
				              </div>

				              <div className="mt-2 bg-gray-100 p-3 rounded">
				                Ounces: {(kg * 35.274).toFixed(2)} oz
				              </div>

				            </div>
				          )}

		          {/* COLOR */}

		          {page === 'color' && (
				            <div className="bg-white p-6 rounded shadow">

				              <h2 className="text-2xl font-bold mb-4">
				                Color Picker
				              </h2>

				              <input
				                type="color"
				                value={hex}
				                onChange={(e) => setHex(e.target.value)}
				                className="w-full h-20"
				              />

				              <div className="mt-4 bg-gray-100 p-3 rounded">
				                HEX: {hex}
				              </div>

				            </div>
				          )}

		        </div>
		      </div>
		    );
}
