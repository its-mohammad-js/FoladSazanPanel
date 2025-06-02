import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase.from("products").select("*");

        const mergedData = data.map((d) => ({
          ...d,
          technicalSpecs: JSON.parse(d.technicalSpecs),
        }));

        setProducts(mergedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <DataContext.Provider value={{ products, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
