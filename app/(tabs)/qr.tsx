import React from "react";
import useQRGeneratorLogic from "../../components/logics/useQRGenerator";
import QRGeneratorView from "../../components/QRGeneratorView";

const QRGeneratorController: React.FC = () => {
  const { gmail, loading, qrId, message, regenerateQR } = useQRGeneratorLogic();

  return (
    <QRGeneratorView
      loading={loading}
      qrPayload={qrId}
      message={message}
      gmail={gmail}
      onRegenerate={regenerateQR}
    />
  );
};

export default QRGeneratorController;
