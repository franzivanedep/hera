import React from "react";
import BranchesView from "../../components/BranchesView";
import { useBranches } from "../../components/logics/branchesLogic";

const BranchesController = () => {
  const { 
    branches, 
    selectedBranch, 
    openBranchModal, 
    closeBranchModal, 
    openMap,
    loading,
    error
  } = useBranches();

  return (
    <BranchesView
      branches={branches}
      selectedBranch={selectedBranch}
      openBranchModal={openBranchModal}
      closeBranchModal={closeBranchModal}
      openMap={openMap}
      loading={loading}   // <--- add this
      error={error}       // <--- add this
    />
  );
};

export default BranchesController;
