import { useState, useEffect } from "react";

const useSessionStorage = (name) => {
  const [value, setValue] = useState(true);

  console.log("value: ", value);

  useEffect(() => {
    setValue(sessionStorage.getItem(name));
  }, []);

  return value;
};

export default useSessionStorage;
