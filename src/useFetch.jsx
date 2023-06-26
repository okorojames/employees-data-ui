import { useContext, useEffect } from "react";
import { Context } from "./Context";

const useFetch = (url) => {
  // states
  const { data, setData, loading, setLoading, error, setError } =
    useContext(Context);

  // useEffect
  useEffect(() => {
    const getData = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setLoading(false);
        setData(data);
      } catch (err) {
        const msg = err.msg ? err.msg : "Something Went Wrong";
        setError(msg);
      }
    };
    getData(url);
  }, [url]);

  //
  return { data, loading, error };
};

export default useFetch;
