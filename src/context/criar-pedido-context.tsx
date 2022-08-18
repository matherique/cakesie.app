import * as React from "react";

type CriarPedidoContextType = {
  step: number;
  next: () => void;
  prev: () => void;
};

const CriarPedidoContext = React.createContext({} as CriarPedidoContextType);

export function CriarPedidoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = React.useState(1);

  function next() {
    setStep((old) => {
      if (old < 5) {
        return old + 1;
      }
      return old;
    });
  }

  function prev() {
    setStep((old) => {
      if (old > 0) {
        return old - 1;
      }
      return old;
    });
  }

  return (
    <CriarPedidoContext.Provider value={{ step, next, prev }}>
      {children}
    </CriarPedidoContext.Provider>
  );
}

export function useCriarPedido(): CriarPedidoContextType {
  const context = React.useContext(CriarPedidoContext);

  if (!context) {
    throw new Error("useCriarPedido must be used within a CriarPedidoProvider");
  }

  return context;
}
