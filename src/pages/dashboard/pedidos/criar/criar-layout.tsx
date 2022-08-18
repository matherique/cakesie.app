import DashboardLayout from "@/components/dashboard-layout";
import { CriarPedidoProvider } from "@/context/criar-pedido-context";
import next from "next";

const TitleSteps: React.FC<{ currentStep: 1 | 2 | 3 | 4 | 5 }> = ({
  currentStep,
}) => {
  return (
    <div className="w-full my-6">
      <span className={currentStep === 1 ? `font-bold` : ``}>
        Escolher cliente
      </span>
      <span className="mx-2">{">"}</span>
      <span className={currentStep === 2 ? `font-bold` : ``}>
        Escolher produto
      </span>
      <span className="mx-2">{">"}</span>
      <span className={currentStep === 3 ? `font-bold` : ``}>
        Informações adicionais
      </span>
      <span className="mx-2">{">"}</span>
      <span className={currentStep === 4 ? `font-bold` : ``}>Confirmar</span>
      <span className="mx-2">{">"}</span>
      <span className={currentStep >= 5 ? `font-bold` : ``}>Finalizado</span>
    </div>
  );
};

function CriarPedidoLayout({ children }: { children: React.ReactNode }) {
  return (
    <CriarPedidoProvider>
      <DashboardLayout>
        <div className="grid grid-rows-layout">
          <TitleSteps currentStep={1} />
          {children}
        </div>
      </DashboardLayout>
    </CriarPedidoProvider>
  );
}

export default CriarPedidoLayout;
