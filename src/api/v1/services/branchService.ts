import { Branch } from "../interfaces/branch";

let branches: Branch[] = [];


export const fetchAllBranches = (): Branch[] => {
    return branches;
}

export const fetchBranchById = (id: string): Branch | null => {
    return branches.find(branch => branch.id === id) || null;
};

export const addBranch = (branch: Branch): Branch => {
    branch.id = (branches.length + 1).toString();
    branches.push(branch);
    return branch;
};

export const modifyBranch = (id: string, updates: Partial<Branch>): Branch | null => {
    const branchIndex = branches.findIndex(branch => branch.id === id);
  
    if (branchIndex === -1) return null;
  
    const updatedBranch = { ...branches[branchIndex], ...updates };
    branches[branchIndex] = updatedBranch;
    return updatedBranch;
}

export const removeBranch = (id: string): boolean => {
    const branchIndex = branches.findIndex(branch => branch.id === id);
    
    if (branchIndex === -1) return false;
  
    branches.splice(branchIndex, 1);
    return true;
};