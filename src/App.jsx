import React, { useMemo, useState } from 'react';
import CryptoJS from 'crypto-js';
import yaml from 'js-yaml';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'react-qr-code';
import ReactMarkdown from 'react-markdown';

export default function App() {
	  const [page, setPage] = useState('home');

	  const [text, setText] = useState('Hello World');
	  const [text2, setText2] = useState('Hello World!');

	  const [jsonInput, setJsonInput] = useState('{"name":"ChatGPT"}');

	  const [passwordLength, setPasswordLength] = useState(16);
	  const [generatedPassword, setGeneratedPassword] = useState('');

	  const [yamlInput, setYamlInput] = useState('name: test');

	  const [uuidValue, setUuidValue] = useState('');

	  const [hashInput, setHashInput] = useState('hello');

	  const [jwtInput, setJwtInput] = useState('');

	  const [markdownInput, setMarkdownInput] = useState('# Hello');

	  const [regexPattern, setRegexPattern] = useState('\\d+');
	  const [regexText, setRegexText] = useState('hello 123');

	  const [qrValue, setQrValue] = useState('https://example.com');

	  const [ageDate, setAgeDate] = useState('2000-01-01');

	  const [height, setHeight] = useState('170');
	  const [weight, setWeight] = useState('70');

	  const [meters, setMeters] = useState('1');

	  const [kg, setKg] = useState('1');

	  const [temp, setTemp] = useState('0');

	  const [hex, setHex] = useState('#000000');

	  /* =====================
	   *      FUNCTIONS
	   *        ===================== */

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

	  const validateYAML = () => {
		      try {
			            yaml.load(yamlInput);
			            return 'Valid YAML';
			          } catch (e) {
					        return 'Invalid YAML';
					      }
		    };

	  const generateHash = () => {
		      return CryptoJS.SHA256(hashInput).toString();
		    };

	  const decodeJWT = () => {
		      try {
			            const parts = jwtInput.split('.');
			            return JSON.stringify(
					            JSON.parse(atob(parts[1])),
					            null,
					            2
					          );
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

	  /* =====================
	   *      NAVIGATION
	   *        ===================== */

	  const NavButton = ({ id, label }) => (
		      <button
		        onClick={() => setPage(id)}
		        className="bg-gray-800 px-3 py-2 rounded hover:bg-gray-700"
		      >
		        {label}
		      </button>
		    );

	  /* =====================
	   *      UI
	   *        ===================== */

	  return (
		      <div className="min-h-screen bg-gray-100">
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
		          <NavButton id="age" label="Age Calculator" />
		          <NavButton id="bmi" label="BMI Calculator" />
		          <NavButton id="length" label="Length Converter" />
		          <NavButton id="weight" label="Weight Converter" />
		          <NavButton id="temp" label="Temperature Converter" />
		          <NavButton id="color" label="Color Picker" />
		        </div>

		        <div className="p-6">

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

				              <div className="flex gap-3 mt-4">
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
				              </div>
				            </div>
				          )}

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
				                onChange={(e) =>
							                setPasswordLength(Number(e.target.value))
							              }
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

		          {page === 'yaml' && (
				            <div className="bg-white p-6 rounded shadow">
				              <h2 className="text-2xl font-bold mb-4">
				                YAML Validator
				              </h2>

				              <textarea
				                value={yamlInput}
				                onChange={(e) => setYamlInput(e.target.value)}
				                className="w-full h-40 border p-3 rounded"
				              />

				              <div className="mt-4 bg-gray-100 p-3 rounded">
				                {validateYAML()}
				              </div>
				            </div>
				          )}

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

				              <div className="mt-4 bg-gray-100 p-4 rounded">
				                <ReactMarkdown>
				                  {markdownInput}
				                </ReactMarkdown>
				              </div>
				            </div>
				          )}

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

		          {page === 'qr' && (
				            <div className="bg-white p-6 rounded shadow">
				              <h2 className="text-2xl font-bold mb-4">
				                QR Generator
				              </h2>

				              <input
				                value={qrValue}
				                onChange={(e) => setQrValue(e.target.value)}
				                className="w-full border p-3 rounded"
				              />

				              <div className="mt-6 flex justify-center">
				                <QRCode value={qrValue} />
				              </div>
				            </div>
				          )}

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

		        </div>
		      </div>
		    );
}
