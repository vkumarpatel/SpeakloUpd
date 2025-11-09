import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [status, setStatus] = useState("idle");
  const [wpm, setWpm] = useState(72);
  const [fillerCount, setFillerCount] = useState(3);
  const [confidence, setConfidence] = useState(64);
  const [sessionTime, setSessionTime] = useState(0);

  function startPractice() {
    setStatus("recording");
    setSessionTime(0);
    // TODO: integrate microphone/transcription
  }
  function stopPractice() {
    setStatus("idle");
    // TODO: finalize session, compute metrics and save
  }
  function playModel() {
    alert("Play model voice (demo). Upgrade for more voices.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Speaklo — Practice Session</h1>
            <p className="text-slate-500 mt-1">Practice speaking. Get instant feedback and a clear next step.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500">Status</div>
            <div className={`px-3 py-2 rounded-full text-sm font-semibold ${status === "recording" ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-700"}`}>{status}</div>
            <button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2 rounded-lg shadow hover:brightness-105">Upgrade</button>
          </div>
        </header>

        <main className="grid grid-cols-12 gap-6">
          <section className="col-span-7 bg-white rounded-2xl p-6 shadow-md">
            <div className="h-72 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-xl">
              <div className="mb-4">
                <svg width="72" height="72" viewBox="0 0 24 24" fill="none"><path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 11v2a7 7 0 0 1-14 0v-2" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="text-slate-500">Your recording and transcript will appear here.</div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <motion.button whileTap={{ scale: 0.98 }} onClick={startPractice}
                className="px-5 py-3 rounded-full bg-slate-800 text-white font-semibold shadow-lg hover:shadow-2xl">
                Start Practice
              </motion.button>
              <motion.button whileTap={{ scale: 0.98 }} onClick={stopPractice}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 bg-white">
                Stop
              </motion.button>
              <motion.button whileTap={{ scale: 0.98 }} onClick={playModel}
                className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-700 bg-white">
                Play Model
              </motion.button>

              <div className="ml-auto text-sm text-slate-500">Session: <span className="font-medium text-slate-700">{sessionTime}s</span></div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <StatCard title="Fluency" value={`${wpm} WPM`} helper="Words per minute" />
              <StatCard title="Filler Words" value={`${fillerCount}`} helper="" />
              <StatCard title="Confidence" value={`${confidence}%`} helper="Listen & shadow the model" />
            </div>

            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-white border border-indigo-100">
              <h3 className="text-sm font-semibold text-indigo-700">AI Tip</h3>
              <p className="text-slate-600 text-sm">Try to slow down slightly — reducing speed by 10% usually improves clarity and confidence.</p>
            </div>
          </section>

          <aside className="col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-slate-800">Session Summary</h2>
              <p className="text-sm text-slate-500 mt-2">Your quick stats and suggestions after each practice.</p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <MiniStat label="WPM" value={wpm} />
                <MiniStat label="Fillers" value={fillerCount} />
                <MiniStat label="Confidence" value={`${confidence}%`} />
                <MiniStat label="Score" value={Math.round((confidence + (100 - fillerCount * 5) + wpm) / 3)} />
              </div>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-semibold text-slate-800">Progress (7 days)</h3>
              <div className="mt-4 h-36 flex items-center justify-center text-slate-400">[Chart placeholder — integrate Recharts for real graph]</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-semibold text-slate-800">Voice & Playback</h3>
              <div className="mt-4 space-y-3">
                <select className="w-full rounded-lg border p-2 text-sm">
                  <option>Neutral — en-US</option>
                  <option>Google Deutsch — de-DE (Premium)</option>
                </select>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-slate-500">Rate</label>
                  <input type="range" defaultValue={50} className="flex-1" />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-slate-500">Pitch</label>
                  <input type="range" defaultValue={50} className="flex-1" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold">Go Pro — unlimited practice</h3>
              <p className="text-sm opacity-90 mt-1">Detailed analytics, premium voices, exportable reports, and more.</p>
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 rounded-lg bg-white text-indigo-600 font-semibold">Start Trial</button>
                <button className="px-3 py-2 rounded-lg border border-white/30">Learn More</button>
              </div>
            </div>

          </aside>
        </main>

        <footer className="mt-8 text-center text-sm text-slate-500">© {new Date().getFullYear()} Speaklo — Build confidence, one practice at a time.</footer>
      </div>
    </div>
  );
}

function StatCard({ title, value, helper }) {
  return (
    <div className="bg-gradient-to-b from-white to-slate-50 rounded-xl p-4 shadow-sm">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-xl font-bold text-slate-800 mt-1">{value}</div>
      {helper && <div className="text-xs text-slate-400 mt-2">{helper}</div>}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 text-center">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-semibold text-slate-800">{value}</div>
    </div>
  );
}