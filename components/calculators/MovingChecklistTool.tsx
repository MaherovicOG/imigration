'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  Printer, 
  Plus, 
  RotateCcw, 
  Sparkles, 
  Calendar, 
  Tag, 
  CheckCircle2,
  FileDown
} from 'lucide-react';
import { MOVING_CHECKLIST_DATA, ChecklistPhase, ChecklistTask } from '@/data/checklist';

export function MovingChecklistTool() {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<string>('all');
  const [customTasks, setCustomTasks] = useState<ChecklistTask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPhase, setNewTaskPhase] = useState('phase_8_weeks');
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem('movewise_completed_tasks');
      if (saved) {
        setCompletedTasks(JSON.parse(saved));
      }
      const savedCustom = localStorage.getItem('movewise_custom_tasks');
      if (savedCustom) {
        setCustomTasks(JSON.parse(savedCustom));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem('movewise_completed_tasks', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all checked tasks?')) {
      setCompletedTasks({});
      try {
        localStorage.removeItem('movewise_completed_tasks');
      } catch (e) {}
    }
  };

  const handleAddCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task: ChecklistTask = {
      id: `custom_${Date.now()}`,
      title: newTaskTitle.trim(),
      description: 'Custom relocation task added by you.',
      category: 'logistics',
      priority: 'high'
    };

    const updated = [...customTasks, task];
    setCustomTasks(updated);
    setNewTaskTitle('');
    try {
      localStorage.setItem('movewise_custom_tasks', JSON.stringify(updated));
    } catch (e) {}
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Compute total and completed stats
  const allTasksCount = MOVING_CHECKLIST_DATA.reduce((acc, phase) => acc + phase.tasks.length, 0) + customTasks.length;
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = allTasksCount > 0 ? Math.round((completedCount / allTasksCount) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden print-page">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 sm:p-8 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/20">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Interactive Client-Side Checklist</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              The Complete Out-of-State Moving Checklist
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Chronological countdown from 8 weeks out to moving day. Progress saves automatically in your browser—no account or login required.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print Checklist</span>
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 text-xs font-semibold transition-colors"
              title="Reset progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-700/60">
          <div className="flex items-center justify-between text-xs font-semibold mb-2 text-slate-300">
            <span>Overall Moving Preparation Progress</span>
            <span className="text-emerald-400 font-bold">{completedCount} of {allTasksCount} Tasks Completed ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-print border-b border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Phases ({allTasksCount})
          </button>
          {MOVING_CHECKLIST_DATA.map((phase) => (
            <button
              key={phase.id}
              type="button"
              onClick={() => setActiveTab(phase.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === phase.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {phase.timeframe}
            </button>
          ))}
        </div>

        {/* Phase Tasks List */}
        <div className="space-y-8">
          {MOVING_CHECKLIST_DATA.filter(
            (phase) => activeTab === 'all' || activeTab === phase.id
          ).map((phase) => (
            <div key={phase.id} className="space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>{phase.timeframe}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {phase.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {phase.tasks.map((task) => {
                  const isDone = Boolean(completedTasks[task.id]);
                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isDone
                          ? 'bg-slate-50 border-slate-200 opacity-75'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 shrink-0 text-blue-600 focus:outline-none"
                        aria-label={isDone ? 'Mark task incomplete' : 'Mark task complete'}
                      >
                        {isDone ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-sm font-semibold ${
                            isDone ? 'line-through text-slate-500' : 'text-slate-900'
                          }`}>
                            {task.title}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {task.category}
                          </span>
                        </div>
                        <p className={`text-xs mt-1 leading-relaxed ${
                          isDone ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {task.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Task Addition Form */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 no-print">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Add a Custom Relocation Task</span>
          </h4>
          <form onSubmit={handleAddCustomTask} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. Schedule piano mover specialty transport..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
