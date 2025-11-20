import React, { useState, useEffect } from 'react';
import { Step } from '../types';
import { generateHRAdvice } from '../services/geminiService';
import { Loader2, Send, User, Lightbulb, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Normally would add this package, but for standard HTML rendering we'll use simple whitespace handling or just display text. Since I can't add packages, I will use simple whitespace pre-wrap.

interface StepDetailProps {
  step: Step;
  employeeName: string;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const StepDetail: React.FC<StepDetailProps> = ({ step, employeeName, onNext, onPrev, isFirst, isLast }) => {
  const [context, setContext] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Reset advice when step changes
  useEffect(() => {
    setAdvice(null);
    setContext('');
  }, [step.id]);

  const handleGetAdvice = async () => {
    if (!context.trim()) return;
    
    setLoading(true);
    const result = await generateHRAdvice(step.title, context, employeeName);
    setAdvice(result);
    setLoading(false);
  };

  // Determine color scheme based on step ID roughly matching the image spectrum
  const getHeaderColor = () => {
    if (step.id <= 6) return "bg-cyan-600";
    if (step.id <= 10) return "bg-purple-600";
    return "bg-orange-500";
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      {/* Header */}
      <div className={`${getHeaderColor()} p-6 text-white relative overflow-hidden transition-colors duration-500`}>
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
          <svg width="200" height="200" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="white" />
          </svg>
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 text-indigo-100 mb-1 text-sm font-medium uppercase tracking-wider">
                <span>Bước {step.id.toString().padStart(2, '0')}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{step.title}</h2>
            <p className="text-white/90 text-sm md:text-base max-w-xl">{step.shortDesc}</p>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar">
        
        {/* Action Section */}
        <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Input Context */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                    <User className="w-5 h-5 text-indigo-600" />
                    <h3>Nhập bối cảnh thực tế</h3>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-2">
                        Vấn đề với {employeeName || "nhân viên"} là gì?
                    </label>
                    <textarea 
                        className="w-full bg-transparent outline-none text-slate-700 resize-none placeholder:text-slate-400 text-sm"
                        rows={5}
                        placeholder={`Ví dụ: ${employeeName} thường xuyên đi làm muộn và không hoàn thành báo cáo đúng hạn tuần này...`}
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                        <button 
                            onClick={handleGetAdvice}
                            disabled={loading || !context.trim()}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
                            {loading ? "Đang suy nghĩ..." : "Xin lời khuyên AI"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: AI Advice Output */}
            <div className="space-y-4">
                 <div className="flex items-center gap-2 text-slate-800 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h3>Lời khuyên từ Chuyên gia (AI)</h3>
                </div>
                
                <div className={`min-h-[200px] rounded-xl border p-6 text-sm leading-relaxed ${advice ? 'bg-emerald-50 border-emerald-100 text-slate-800' : 'bg-slate-50 border-slate-100 text-slate-400 flex items-center justify-center italic'}`}>
                    {loading ? (
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                            <p>Đang phân tích tình huống...</p>
                        </div>
                    ) : advice ? (
                        <div className="whitespace-pre-wrap">{advice}</div>
                    ) : (
                        <div className="text-center max-w-xs mx-auto">
                            Hãy nhập bối cảnh bên trái và nhấn nút để nhận kịch bản tư vấn cụ thể cho bước này.
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
        <button 
            onClick={onPrev}
            disabled={isFirst}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:shadow-sm hover:text-indigo-600'}`}
        >
            <ArrowLeft className="w-4 h-4" />
            Bước trước
        </button>

        <div className="text-xs font-medium text-slate-400 uppercase tracking-widest hidden md:block">
            Tiến độ: {Math.round((step.id / 15) * 100)}%
        </div>

        <button 
            onClick={onNext}
            disabled={isLast}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isLast ? 'text-slate-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'}`}
        >
            Bước tiếp theo
            <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StepDetail;
