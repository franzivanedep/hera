import React from "react";
import BranchesView from "../../components/BranchesView";
import { useBranches } from "../../components/logics/branchesLogic";

const BranchesController = () => {
  const { branches, selectedBranch, openBranchModal, closeBranchModal, openMap } = useBranches();

  return (
    <BranchesView
      branches={branches}
      selectedBranch={selectedBranch}
      openBranchModal={openBranchModal}
      closeBranchModal={closeBranchModal}
      openMap={openMap}
    />
  );
};

export default BranchesController;
