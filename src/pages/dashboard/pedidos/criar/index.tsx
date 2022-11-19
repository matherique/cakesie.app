import DashboardLayout from "@components/dashboard-layout";
import { NextPage } from "next";
import * as React from "react";
import EscolhaBoloStep from "./escolha-bolo";
import EscolhaClienteStep from "./escolha-cliente";
import { StepProps } from "./types";

const CREATE_STEP_NUMBER = 5;

const GetStep: React.FC<
  {
    step: number;
  } & StepProps
> = ({ onNext, onPrev, step }) => {
  let CurrentStep = EscolhaClienteStep;

  switch (step) {
    case 1:
      CurrentStep = EscolhaClienteStep;
      break;
    case 2:
      CurrentStep = EscolhaBoloStep;
    case 3:
      CurrentStep = EscolhaBoloStep;
    case 4:
      CurrentStep = EscolhaBoloStep;
    case 5:
      CurrentStep = EscolhaBoloStep;
      break;
  }

  return <CurrentStep onNext={onNext} onPrev={onPrev} />;
};

const CriarPedido: NextPage = () => {
  const [step, setStep] = React.useState(1);

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

  return (
    <DashboardLayout>
      <GetStep step={step} onNext={next} onPrev={prev} />
    </DashboardLayout>
  );
};

export default CriarPedido;
