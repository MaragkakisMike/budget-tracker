import { Category } from "@/src/db/schema";
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

type CategoriesContextType = {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
};
export const CategoriesContext = createContext<CategoriesContextType>({
  selectedCategory: null,
  setSelectedCategory: () => {},
});

type Props = {
  children?: ReactNode;
};

export const CategoriesProvider: FC<Props> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  return (
    <CategoriesContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
