import { useState } from "react";

import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Select from "./components/ui/Select";

// placeholder example
const skinTone = [
  { name: "Light", value: "light" },
  { name: "Medium-Light", value: "medium-light" },
  { name: "Medium", value: "medium" },
  { name: "Medium-Dark", value: "medium-dark" },
  { name: "Dark", value: "dark" },
];

function App() {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(skinTone[0]);

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <Input
            className="min-w-2xs"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your name"
          />
          <Button variant="primary">Login</Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="min-w-2xs">
            <Select
              options={skinTone}
              value={selected}
              onChange={setSelected}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
