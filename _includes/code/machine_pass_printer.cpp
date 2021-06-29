
struct MachinePrinter: public llvm::MachineFunctionPass {

  static char ID;

  MachinePrinter():
    MachineFunctionPass(ID) {}

  bool runOnMachineFunction(llvm::MachineFunction& F)
      override
  { 
    for(auto & MBB : F) {
      const llvm::BasicBlock * bb = MBB.getBasicBlock();
      if(bb)
        llvm::outs() << bb->size() << ' '
            << MBB.size() << '\n';
      else
        llvm::outs() << MBB.getName() << ' '
            << MBB.size() << '\n';
      for(auto & inst : BB)
        llvm::outs() << inst << '\n';
      }
      return false;
  }
};

char MachinePrinter::ID = 0;

namespace llvm {
    void initializeMachinePrinterPass(llvm::PassRegistry &);
}

using llvm::PassRegistry;
using llvm::PassInfo;
using llvm::callDefaultCtor;
INITIALIZE_PASS(MachinePrinter, "x86-printer", "X86 Printer", true, true)

namespace llvm {
    FunctionPass * createMachinePrinter() {
        return new MachinePrinter();
    }
}

