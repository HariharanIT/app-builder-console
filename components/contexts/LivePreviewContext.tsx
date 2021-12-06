import React, {createContext, useContext} from 'react';

interface LivePreviewContext {
  livePreviewDisplayType: number;
  setLivePreviewDisplayType: (type: number) => void;
}
export const LivePreviewContext = createContext(
  null as unknown as LivePreviewContext,
);

LivePreviewContext.displayName = 'LivePreviewContext';

export function LivePreviewProvider({children}: React.PropsWithChildren<{}>) {
  const [livePreviewDisplayType, setLivePreviewDisplayType] =
    React.useState<number>(0);

  return (
    <LivePreviewContext.Provider
      value={{
        livePreviewDisplayType,
        setLivePreviewDisplayType,
      }}>
      {children}
    </LivePreviewContext.Provider>
  );
}

export function useLivePreview() {
  const context = useContext(LivePreviewContext);
  if (context === undefined) {
    throw new Error(`useLivePreview must be used within a LivePreviewProvider`);
  }
  return context;
}
