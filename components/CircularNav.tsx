import React from 'react';
import { STEPS } from '../constants';

interface CircularNavProps {
  activeStepId: number;
  onStepClick: (id: number) => void;
}

const CircularNav: React.FC<CircularNavProps> = ({ activeStepId, onStepClick }) => {
  const radius = 140;
  const center = 180;
  const stepsCount = STEPS.length;
  
  // Calculate position for each step circle
  const getPosition = (index: number) => {
    // Start from top (-90 degrees), go clockwise
    const angle = (index * (360 / stepsCount) - 90) * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="relative w-[360px] h-[360px] mx-auto hidden md:block">
      {/* Connecting Circle Line */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Center Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-40">
        <h2 className="text-xl font-bold text-purple-700 leading-tight">QUẢN LÝ NHÂN VIÊN</h2>
        <p className="text-xs text-slate-500 mt-1">KÉM HIỆU QUẢ VỚI 15 BƯỚC</p>
      </div>

      {/* Step Circles */}
      {STEPS.map((step, index) => {
        const { x, y } = getPosition(index);
        const isActive = step.id === activeStepId;
        
        // Dynamic classes for colors
        let bgColor = "bg-white";
        let textColor = "text-slate-600";
        let borderColor = "border-slate-200";
        
        if (isActive) {
          bgColor = "bg-indigo-600";
          textColor = "text-white";
          borderColor = "border-indigo-600";
        } else if (step.id < activeStepId) {
            // Completed/Past steps
             bgColor = "bg-indigo-50";
             textColor = "text-indigo-400";
             borderColor = "border-indigo-200";
        }

        return (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`absolute w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110 shadow-sm z-10 ${bgColor} ${borderColor} ${textColor}`}
            style={{
              left: `${x - 20}px`, // subtract half width
              top: `${y - 20}px`,  // subtract half height
            }}
            title={step.title}
          >
            {step.id}
          </button>
        );
      })}
    </div>
  );
};

export default CircularNav;
