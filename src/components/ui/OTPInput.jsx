import { useRef } from "react";

function OTPInput({ code, setCode }) {
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
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Move back only if current input is empty
      inputsRef.current[index - 1]?.focus();
      setTimeout(() => {
        inputsRef.current[index - 1]?.select();
      }, 0);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
      setTimeout(() => {
        inputsRef.current[index - 1]?.select();
      }, 0);
    } else if (e.key === "ArrowRight" && index < code.length - 1) {
      inputsRef.current[index + 1]?.focus();
      setTimeout(() => {
        inputsRef.current[index + 1]?.select();
      }, 0);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d{0,6}$/.test(paste)) return;

    const newCode = paste.split("").concat(Array(6).fill("")).slice(0, 6);
    setCode(newCode);
    const nextIndex = Math.min(newCode.length, code.length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-center space-x-3">
      {code.map((digit, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          autoFocus={i === 0}
          onFocus={(e) => e.target.select()}
          onPaste={handlePaste}
          ref={(el) => (inputsRef.current[i] = el)}
          className="h-16 w-16 rounded-lg border border-gray-300 text-center text-xl transition-shadow duration-300 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          required
          aria-label={`Code digit ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default OTPInput;
