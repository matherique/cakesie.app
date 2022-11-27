import DashboardLayout from "@components/dashboard-layout";
import { NextPage } from "next";
import * as React from "react";
import EscolhaBoloStep from "./escolha-bolo";
import { StepProps } from "./types";

const CREATE_STEP_NUMBER = 5;

const GetStep: React.FC<
  {
    step: number;
  } & StepProps
> = ({ onNext, onPrev, step }) => {
  let CurrentStep = EscolhaBoloStep

  switch (step) {
    case 1:
      CurrentStep = EscolhaBoloStep;
      break;
    case 2:
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
