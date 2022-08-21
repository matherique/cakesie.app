type Steps = 1 | 2 | 3 | 4 | 5;

export const Title: React.FC<{ step: Steps }> = ({ step }) => {
  return (
    <div className="w-full my-4">
      <span className={step === 1 ? `font-bold` : ``}>Escolher cliente</span>
      <span className="mx-2">{">"}</span>
      <span className={step === 2 ? `font-bold` : ``}>Escolher produto</span>
      <span className="mx-2">{">"}</span>
      <span className={step === 3 ? `font-bold` : ``}>
        Informações adicionais
      </span>
      <span className="mx-2">{">"}</span>
      <span className={step === 4 ? `font-bold` : ``}>Confirmar</span>
      <span className="mx-2">{">"}</span>
      <span className={step >= 5 ? `font-bold` : ``}>Finalizado</span>
    </div>
  );
};
