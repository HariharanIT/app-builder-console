import React, {createContext, useContext} from 'react';

interface VerticalTabContext {
  selectedTabValue: number;
  setSelectedTabValue: (value: number) => void;
}
export const VerticalTabContext = createContext(
  null as unknown as VerticalTabContext,
);

VerticalTabContext.displayName = 'LivePreviewContext';

export function VerticalTabProvider({children}: React.PropsWithChildren<{}>) {
  const [selectedTabValue, setSelectedTabValue] = React.useState<number>(1);

  return (
    <VerticalTabContext.Provider
      value={{
        selectedTabValue,
        setSelectedTabValue,
      }}>
      {children}
    </VerticalTabContext.Provider>
  );
}

export function useVerticalTab() {
  const context = useContext(VerticalTabContext);
  if (context === undefined) {
    throw new Error(`useVerticalTab must be used within a VerticalTabContext`);
  }
  return context;
}
