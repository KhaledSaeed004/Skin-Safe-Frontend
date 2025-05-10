import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Assuming Button is a custom component, import it or define it
// import Button from './Button';

export default function PasswordConfirmation() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index | 0] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d{0,6}$/.test(paste)) return;

    const newCode = paste.split('').concat(Array(6).fill('')).slice(0, 6);
    setCode(newCode);
    inputsRef.current[Math.min(paste.length, 5)].focus();
  };

  const handleSubmit = ({/* e */_}) => {
    // e.preventDefault();
    // const codeString = code.join('');
    // if (codeString.length === 6) {
    //   // Add your verification logic here (e.g., API call)
    //   console.log('Verifying code:', codeString);
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Enter the confirmation code</h1>
      <p className="text-gray-500 mb-4">Enter the code we sent you</p>

      <form onSubmit={handleSubmit} className="flex justify-center space-x-3">
        {code.map((digit, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            ref={(el) => (inputsRef.current[i] = el)}
            className="h-16 w-16 rounded-lg border border-gray-300 text-center text-xl focus:ring-2 focus:ring-blue-500 focus:outline-none hover:shadow-xl transition-shadow duration-300"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            aria-label={`Code digit ${i + 1}`}
          />
        ))}
      </form>

      <div className="mt-6">
        {/* Replace with your Button component */}
        
       < Link to="/login/password-reset">
       <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
          onClick={handleSubmit}
          disabled={code.join('').length !== 6}
        >
          Verify code
        </button>
       </Link>
      </div>
    </div>
  );
}
