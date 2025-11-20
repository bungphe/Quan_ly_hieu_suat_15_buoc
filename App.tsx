import React, { useState } from 'react';
import { STEPS } from './constants';
import CircularNav from './components/CircularNav';
import StepDetail from './components/StepDetail';
import { Users, LayoutGrid, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [employeeName, setEmployeeName] = useState<string>('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const currentStep = STEPS.find(s => s.id === currentStepId) || STEPS[0];

  const handleNext = () => {
    if (currentStepId < STEPS.length) setCurrentStepId(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStepId > 1) setCurrentStepId(prev => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100 overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-sm z-50">
        <h1 className="font-bold text-indigo-700">HR 15-Steps</h1>
        <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
            <LayoutGrid className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar / Left Panel */}
      <div className={`
        fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden transition-opacity duration-300
        ${showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `} onClick={() => setShowMobileMenu(false)} />

      <div className={`
        fixed md:relative z-40 w-80 h-full bg-white border-r border-slate-200 flex flex-col transition-transform duration-300
        ${showMobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="font-bold text-slate-800">Quản Lý</h1>
                    <p className="text-xs text-slate-500">Hiệu suất nhân sự</p>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tên nhân viên</label>
                <input 
                    type="text" 
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Nhập tên nhân viên..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
            </div>
        </div>

        {/* Circular Nav (Desktop Only - Top part of sidebar) */}
        <div className="hidden md:flex items-center justify-center py-8 bg-slate-50/50">
            <div className="scale-75 origin-center">
                 <CircularNav activeStepId={currentStepId} onStepClick={setCurrentStepId} />
            </div>
        </div>

        {/* List Nav (Mobile/Overflow) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
             <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 md:hidden">Danh sách bước</h3>
             {STEPS.map(step => (
                 <button
                    key={step.id}
                    onClick={() => {
                        setCurrentStepId(step.id);
                        setShowMobileMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        step.id === currentStepId 
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                 >
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs border ${step.id === currentStepId ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400 border-slate-200'}`}>
                        {step.id}
                    </span>
                    <span className="text-left line-clamp-1">{step.title}</span>
                    {step.id === currentStepId && <ChevronRight className="w-4 h-4 ml-auto text-indigo-400" />}
                 </button>
             ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 h-[calc(100vh-64px)] md:h-screen overflow-hidden flex flex-col relative">
         {/* Decorative Background Element */}
         <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
         <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

         <div className="relative z-10 h-full">
            <StepDetail 
                step={currentStep}
                employeeName={employeeName}
                onNext={handleNext}
                onPrev={handlePrev}
                isFirst={currentStepId === 1}
                isLast={currentStepId === STEPS.length}
            />
         </div>
      </main>

    </div>
  );
};

export default App;
