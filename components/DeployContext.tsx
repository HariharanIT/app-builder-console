import {
  createContext,
  useState,
  useContext,
  Dispatch,
  useEffect,
  SetStateAction,
} from 'react';
import {useProductInfo} from './ProductInfoContext';
import {DeployStatus} from '../constants/productInfoDefaults';
interface DeployContext {
  herokuStatus: DeployStatus;
  setHerokuStatus: Dispatch<SetStateAction<DeployStatus>>;
  vercelStatus: DeployStatus;
  setVercelStatus: Dispatch<SetStateAction<DeployStatus>>;
}

const DeployContext = createContext(null as unknown as DeployContext);

export function DeployContextProvider({children}: React.PropsWithChildren<{}>) {
  const {productInfo} = useProductInfo();
  const [herokuStatus, setHerokuStatus] = useState<DeployStatus>(() => {
    return productInfo.backend_deploy_status;
  });
  const [vercelStatus, setVercelStatus] = useState<DeployStatus>(() => {
    return productInfo.frontend_deploy_status;
  });
  useEffect(() => {
    setHerokuStatus(productInfo.backend_deploy_status);
    setVercelStatus(productInfo.frontend_deploy_status);
  }, [productInfo]);

  return (
    <DeployContext.Provider
      value={{
        herokuStatus,
        vercelStatus,
        setHerokuStatus,
        setVercelStatus,
      }}>
      {children}
    </DeployContext.Provider>
  );
}
export function useDeploy() {
  const context = useContext(DeployContext);
  if (context === undefined) {
    throw new Error(`useDeploy must be used within a DeployContext`);
  }
  return context;
}

export default DeployContext;
