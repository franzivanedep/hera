import React from "react";
import useQRGeneratorLogic from "../../components/logics/useQRGenerator";
import QRGeneratorView from "../../components/QRGeneratorView";

const QRGeneratorController: React.FC = () => {
  const { qrId, qrUsed, message, showRefresh, regenerateQR } = useQRGeneratorLogic();

  return (
    <QRGeneratorView
      qrPayload={qrId}
      qrUsed={qrUsed}
      message={message}
      showRefresh={showRefresh}
      onRegenerate={regenerateQR}
    />
  );
};

export default QRGeneratorController;
