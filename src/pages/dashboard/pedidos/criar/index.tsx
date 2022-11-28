import DashboardLayout from "@components/dashboard-layout";
import useLocalStorage from "@hooks/useLocalStorage";
import { NextPage } from "next";
import * as React from "react";
import EscolhaBoloStep from "./escolha-bolo";
import { StepProps, OrderDetails } from "./types";

const CREATE_STEP_NUMBER = 5;

const GetStep: React.FC<
  {
    step: number;
  } & StepProps
> = ({ onNext, onPrev, step, order, setOrder }) => {
  let CurrentStep = EscolhaBoloStep

  switch (step) {
    case 1:
      CurrentStep = EscolhaBoloStep;
      break;
    case 2:
      break;
  }

  return <CurrentStep onNext={onNext} onPrev={onPrev} order={order} setOrder={setOrder} />;
};

const CriarPedido: NextPage = () => {
  const [step, setStep] = React.useState(1);

  const [orderDetails, setOrderDetails] = useLocalStorage<OrderDetails>("pedido", {
    address: "teste",
    client: "matheus henrique",
    phone: "",
    cakes: [],
    total: 0,
  });

  const next = React.useCallback(() => {
    if (step + 1 > CREATE_STEP_NUMBER) {
      return;
    }
    setStep(step + 1);
  }, [step, setStep]);

  const prev = React.useCallback(() => {
    if (step - 1 < 0) {
      return;
    }
    setStep(step - 1);
  }, [step, setStep]);

  const setOrder = React.useCallback((order: Partial<OrderDetails>) => {
    setOrderDetails({ ...orderDetails, ...order })
  }, [orderDetails, setOrderDetails]);

  return (
    <DashboardLayout>
      <GetStep step={step} onNext={next} onPrev={prev} order={orderDetails} setOrder={setOrder} />
    </DashboardLayout>
  );
};

export default CriarPedido;
