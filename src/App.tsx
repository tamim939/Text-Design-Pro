/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, 
  Zap, 
  Flame, 
  Crown, 
  Star, 
  Sword, 
  Ghost, 
  Sparkles, 
  Search,
  RefreshCw,
  CheckCircle2,
  Share2,
  Smartphone,
  Gamepad2,
  MessageCircle
} from 'lucide-react';

const FONT_MAPS = [
  {
    name: 'Cursive',
    map: ['𝓐','𝓑','𝓒','𝓓','𝓔','𝓕','𝓖','𝓗','𝓘','𝓙','𝓚','𝓛','𝓜','𝓝','𝓞','𝓟','𝓠','𝓡','𝓢','𝓣','𝓤','𝓥','𝓦','𝓧','𝓨','𝓩']
  },
  {
    name: 'Double Struck',
    map: ['𝔸','𝔹','ℂ','𝔻','𝔼','𝔽','𝔾','ℍ','𝕀','𝕁','𝕂','𝕃','𝕄','ℕ','𝕆','ℙ','ℚ','ℝ','𝕊','𝕋','𝕌','𝕍','𝕎','𝕏','𝕐','ℤ']
  },
  {
    name: 'Japanese Style',
    map: ['卂','乃','匚','刀','乇','下','Ꮆ','卄','丨','ﾌ','Ҝ','ㄥ','爪','几','ㄖ','卩','ҩ','尺','丂','ㄒ','ㄩ','ᐯ','山','乂','ㄚ','乙']
  },
  {
    name: 'Greek Style',
    map: ['α','в','¢','∂','є','ƒ','g','н','ι','נ','к','ℓ','м','и','σ','ρ','ҩ','я','ѕ','т','υ','ν','ω','χ','у','z']
  },
  {
    name: 'Blocky',
    map: ['🅰','🅱','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹','🅺','🅻','🅼','🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉']
  },
  {
    name: 'Bubbles',
    map: ['ⓐ','ⓑ','ⓒ','ⓓ','ⓔ','ⓕ','ⓖ','ⓗ','ⓘ','ⓙ','ⓚ','ⓛ','ⓜ','ⓝ','ⓞ','ⓟ','ⓠ','ⓡ','ⓢ','ⓣ','ⓤ','ⓥ','ⓦ','ⓧ','ⓨ','ⓩ']
  },
  {
    name: 'Small Caps',
    map: ['ᴀ','ʙ','ᴄ','ᴅ','ᴇ','ғ','ɢ','ʜ','ɪ','ᴊ','ᴋ','ʟ','ᴍ','ɴ','ᴏ','ᴘ','ǫ','ʀ','s','ᴛ','ᴜ','ᴠ','ᴡ','x','ʏ','ᴢ']
  },
  {
    name: 'Gothic',
    map: ['𝔄','𝔅','ℭ','𝔇','𝔈','𝔉','𝔊','ℌ','ℑ','𝔍','𝔎','𝔏','𝔐','𝔑','𝔒','𝔓','𝔔','ℜ','𝔖','𝔗','𝔘','𝔙','𝔚','𝔛','𝔜','ℨ']
  },
  {
    name: 'Bold Gothic',
    map: ['𝕬','𝕭','𝕮','𝕯','𝕰','𝕱','𝕲','𝕳','𝕴','𝕵','𝕶','𝕷','𝕸','𝕹','𝕺','𝕻','𝕼','𝕽','𝕾','𝕿','𝖀','𝖁','𝖂','𝖃','𝖄','𝖅']
  },
  {
    name: 'Bold Serif',
    map: ['𝐀','𝐁','𝐂','𝐃','𝐄','𝐅','𝐆','𝐇','𝐈','𝐉','𝐊','𝐋','𝐌','𝐍','𝐎','𝐏','Ｑ','𝐑','𝐒','𝐓','𝐔','𝐕','𝐖','𝐗','𝐘','𝐙']
  },
  {
    name: 'Italic Serif',
    map: ['𝐴','𝐵','𝐶','𝐷','𝐸','𝐹','𝐺','𝐻','𝐼','𝐽','𝐾','Ｌ','𝑀','𝑁','𝑂','𝑃','𝑄','𝑅','𝑆','𝑇','𝑈','𝑉','𝑊','𝑋','𝑌','𝑍']
  },
  {
    name: 'Monospace',
    map: ['𝙰','𝙱','𝙲','𝙳','𝙴','𝙵','𝙶','𝙷','𝙸','𝙹','𝙺','𝙻','𝙼','𝙽','𝙾','𝙿','𝚀','𝚁','𝚂','𝚃','𝚄','𝚅','𝚆','𝚇','𝚈','𝚉']
  },
  {
    name: 'Handwriting',
    map: ['𝒜','ℬ','𝒞','𝒟','ℰ','ℱ','𝒢','ℋ','ℐ','𝒥','𝒦','ℒ','ℳ','𝒩','𝒪','𝒫','𝒬','ℛ','𝒮','𝒯','𝒰','𝒱','𝒲','𝒳','𝒴','𝒵']
  }
];

const SYMBOLS = [
  '✨','🔥','👑','⚡','💎','🌟','🦋','🎸','⚔️','〆','ツ','꧁','꧂','々','★','💀','🥀','🧸','🍬','❄️','🌈','🚀','🛡️','🏆','🍗','🔫',
  '☯️','☮️','☣️','☢️','⚛️','☪️','☸️','✡️','🔯','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎',
  '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟',
  '🎭','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🎷','🎺','🎸','🎻','🎲','🎮','🎰','🎳','🎯','🎱','🔮'
];

const PLATFORMS = [
  { id: 'ALL', name: 'All Style', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'WA', name: 'WhatsApp', icon: <MessageCircle className="w-4 h-4" /> },
  { id: 'FB', name: 'Facebook', icon: <Share2 className="w-4 h-4" /> },
  { id: 'IG', name: 'Instagram', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'FF', name: 'Free Fire', icon: <Flame className="w-4 h-4" /> },
  { id: 'PUBG', name: 'PUBG', icon: <Gamepad2 className="w-4 h-4" /> },
];

export default function App() {
  const [name, setName] = useState('');
  const [activePlatform, setActivePlatform] = useState('ALL');
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [accentColor, setAccentColor] = useState('#00f2fe');

  const colors = ['#00f2fe', '#ff00cc', '#00ff41', '#f3e016', '#ff4b2b', '#7d5fff', '#ffffff'];

  const generateNames = (input: string) => {
    if (!input) return [];
    const newResults: string[] = [];
    const lowerInput = input.toLowerCase();

    for (let i = 0; i < 200; i++) {
      const fontSet = FONT_MAPS[Math.floor(Math.random() * FONT_MAPS.length)];
      let styled = '';
      
      for (const char of lowerInput) {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) {
          styled += fontSet.map[code - 97];
        } else {
          styled += char;
        }
      }

      const s1 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const s2 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      
      const patterns = [
        `${s1} ${styled} ${s1}`,
        `${s1}${styled}${s2}`,
        `『${styled}』${s1}`,
        `々${styled}★`,
        `꧁${styled}꧂`,
        `${styled} 〆`,
        `ツ ${styled}`,
        `${s2} • ${styled}`,
        `⚡${styled}⚡`,
        `亗 ${styled} 亗`,
        `× ${styled} ×`,
        `『${s1}』${styled}`,
        `${styled} ᴳᵒᵈ`,
        `亗『${styled}』亗`,
        `【${styled}】`,
        `『${styled}』`,
        `《${styled}》`,
        `〔${styled}〕`,
        `〖${styled}〗`,
        `〚${styled}〛`,
        `⦗${styled}⦘`,
        `⦅${styled}⦆`,
        `⟦${styled}⟧`,
        `⟨${styled}⟩`,
        `${s1} ⸸ ${styled} ⸸ ${s1}`,
        `† ${styled} †`,
        `☠️ ${styled} ☠️`,
        `☣️ ${styled} ☣️`,
        `☢️ ${styled} ☢️`,
        `⚛️ ${styled} ⚛️`,
        `☪️ ${styled} ☪️`,
        `☯️ ${styled} ☯️`,
        `☮️ ${styled} ☮️`,
        `🔯 ${styled} 🔯`,
        `💠 ${styled} 💠`,
        `🌀 ${styled} 🌀`,
        `🎭 ${styled} 🎭`,
        `🎨 ${styled} 🎨`,
        `🎬 ${styled} 🎬`,
        `🎤 ${styled} 🎤`,
        `🎧 ${styled} 🎧`,
        `🎼 ${styled} 🎼`,
        `🎹 ${styled} 🎹`,
        `🥁 ${styled} 🥁`,
        `🎷 ${styled} 🎷`,
        `🎺 ${styled} 🎺`,
        `🎸 ${styled} 🎸`,
        `🎻 ${styled} 🎻`,
        `🎲 ${styled} 🎲`,
        `🎮 ${styled} 🎮`,
        `🎰 ${styled} 🎰`,
        `🎳 ${styled} 🎳`,
        `🎯 ${styled} 🎯`,
        `🎱 ${styled} 🎱`,
        `🔮 ${styled} 🔮`,
        `亗 ${styled} 亗`,
        `〆 ${styled} 〆`,
        `『 ${styled} 』`,
        `꧁ ${styled} ꧂`,
        `★ ${styled} ★`,
        `⚡ ${styled} ⚡`,
        `🔥 ${styled} 🔥`,
        `👑 ${styled} 👑`,
        `💎 ${styled} 💎`,
        `🌟 ${styled} 🌟`,
        `🦋 ${styled} 🦋`,
        `💀 ${styled} 💀`,
        `🥀 ${styled} 🥀`,
        `🧸 ${styled} 🧸`,
        `🍬 ${styled} 🍬`,
        `❄️ ${styled} ❄️`,
        `🌈 ${styled} 🌈`,
        `🚀 ${styled} 🚀`,
        `🛡️ ${styled} 🛡️`,
        `🏆 ${styled} 🏆`,
        `🍗 ${styled} 🍗`,
        `🔫 ${styled} 🔫`,
        `×͜× ${styled}`,
        `×͜× ${styled} ×͜×`,
        `亗 ${styled} 亗`,
        `〆 ${styled} 〆`,
        `『 ${styled} 』`,
        `꧁ ${styled} ꧂`,
        `★ ${styled} ★`,
        `⚡ ${styled} ⚡`,
        `🔥 ${styled} 🔥`,
        `👑 ${styled} 👑`,
        `💎 ${styled} 💎`,
        `🌟 ${styled} 🌟`,
        `🦋 ${styled} 🦋`,
        `💀 ${styled} 💀`,
        `🥀 ${styled} 🥀`,
        `🧸 ${styled} 🧸`,
        `🍬 ${styled} 🍬`,
        `❄️ ${styled} ❄️`,
        `🌈 ${styled} 🌈`,
        `🚀 ${styled} 🚀`,
        `🛡️ ${styled} 🛡️`,
        `🏆 ${styled} 🏆`,
        `🍗 ${styled} 🍗`,
        `🔫 ${styled} 🔫`,
        `×͜× ${styled}`,
        `×͜× ${styled} ×͜×`,
        `亗 ${styled} 亗`,
        `〆 ${styled} 〆`,
        `『 ${styled} 』`,
        `꧁ ${styled} ꧂`,
        `★ ${styled} ★`,
        `⚡ ${styled} ⚡`,
        `🔥 ${styled} 🔥`,
        `👑 ${styled} 👑`,
        `💎 ${styled} 💎`,
        `🌟 ${styled} 🌟`,
        `🦋 ${styled} 🦋`,
        `💀 ${styled} 💀`,
        `🥀 ${styled} 🥀`,
        `🧸 ${styled} 🧸`,
        `🍬 ${styled} 🍬`,
        `❄️ ${styled} ❄️`,
        `🌈 ${styled} 🌈`,
        `🚀 ${styled} 🚀`,
        `🛡️ ${styled} 🛡️`,
        `🏆 ${styled} 🏆`,
        `🍗 ${styled} 🍗`,
        `🔫 ${styled} 🔫`,
        `×͜× ${styled}`,
        `×͜× ${styled} ×͜×`,
        `亗 ${styled} 亗`,
        `〆 ${styled} 〆`,
        `『 ${styled} 』`,
        `꧁ ${styled} ꧂`,
        `★ ${styled} ★`,
        `⚡ ${styled} ⚡`,
        `🔥 ${styled} 🔥`,
        `👑 ${styled} 👑`,
        `💎 ${styled} 💎`,
        `🌟 ${styled} 🌟`,
        `🦋 ${styled} 🦋`,
        `💀 ${styled} 💀`,
        `🥀 ${styled} 🥀`,
        `🧸 ${styled} 🧸`,
        `🍬 ${styled} 🍬`,
        `❄️ ${styled} ❄️`,
        `🌈 ${styled} 🌈`,
        `🚀 ${styled} 🚀`,
        `🛡️ ${styled} 🛡️`,
        `🏆 ${styled} 🏆`,
        `🍗 ${styled} 🍗`,
        `🔫 ${styled} 🔫`,
        `×͜× ${styled}`,
        `×͜× ${styled} ×͜×`,
        `꧁༒☬${styled}☬༒꧂`,
        `꧁༺${styled}༻꧂`,
        `꧁[${styled}]꧂`,
        `『${styled}』•ᴳᵒᵈ`,
        `亗『${styled}』亗`,
        `〆${styled}〆`,
        `꧁${styled}꧂`,
        `★${styled}★`,
        `⚡${styled}⚡`,
        `🔥${styled}🔥`,
        `👑${styled}👑`,
        `💎${styled}💎`,
        `🌟${styled}🌟`,
        `🦋${styled}🦋`,
        `💀${styled}💀`,
        `🥀${styled}🥀`,
        `🧸${styled}🧸`,
        `🍬${styled}🍬`,
        `❄️${styled}❄️`,
        `🌈${styled}🌈`,
        `🚀${styled}🚀`,
        `🛡️${styled}🛡️`,
        `🏆${styled}🏆`,
        `🍗${styled}🍗`,
        `🔫${styled}🔫`,
        `×͜×${styled}`,
        `×͜×${styled}×͜×`
      ];

      newResults.push(patterns[Math.floor(Math.random() * patterns.length)]);
    }
    return newResults;
  };

  const handleGenerate = () => {
    if (!name.trim()) return;
    const nextColor = colors[(colors.indexOf(accentColor) + 1) % colors.length];
    setAccentColor(nextColor);
    setResults(generateNames(name));
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Glow */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[150px] opacity-10 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: accentColor }}
      />

      <div className="max-w-2xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-4xl font-bold tracking-widest uppercase mb-2"
            style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}44` }}
          >
            Text Design Pro
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-medium"
          >
            Stylish Name Studio Pro
          </motion.p>
        </header>

        {/* Platform Selector */}
        <div className="flex overflow-x-auto gap-3 pb-6 no-scrollbar">
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => setActivePlatform(plat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 text-sm font-medium ${
                activePlatform === plat.id 
                  ? 'bg-white text-black border-white' 
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
              }`}
              style={activePlatform === plat.id ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
            >
              {plat.icon}
              {plat.name}
            </button>
          ))}
        </div>

        {/* Input Section */}
        <div className="space-y-4 mb-10">
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Enter your name..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg outline-none focus:border-white/30 transition-all placeholder:text-zinc-600"
              style={{ borderColor: name ? `${accentColor}44` : '' }}
            />
            {name && (
              <button 
                onClick={() => setName('')}
                className="absolute right-14 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-zinc-500" />
              </button>
            )}
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!name.trim()}
            className="w-full py-5 rounded-2xl font-mono font-bold text-lg tracking-widest uppercase transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            style={{ backgroundColor: accentColor, color: accentColor === '#ffffff' ? '#000' : '#000' }}
          >
            Generate Styles
          </button>
        </div>

        {/* Results List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {results.map((res, idx) => (
              <motion.div
                key={`${res}-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.02 }}
                className="group flex items-center justify-between bg-white/5 border-l-4 p-4 rounded-r-2xl border-white/10 hover:bg-white/10 transition-all"
                style={{ borderLeftColor: accentColor }}
              >
                <span className="text-lg font-medium text-zinc-100 truncate pr-4">
                  {res}
                </span>
                <button
                  onClick={() => copyToClipboard(res, idx)}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                  style={copiedIndex === idx ? { backgroundColor: accentColor, color: '#000' } : {}}
                >
                  {copiedIndex === idx ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {results.length === 0 && name && (
            <div className="text-center py-20 text-zinc-600">
              <RefreshCw className="w-12 h-12 mx-auto mb-4 opacity-20 animate-spin-slow" />
              <p className="font-mono uppercase tracking-widest text-xs">Ready to style your name</p>
            </div>
          )}
        </div>

        {/* Developer Footer */}
        <footer className="mt-20 pb-10 text-center border-t border-white/5 pt-10">
          <p className="text-zinc-500 text-sm mb-4">
            Developed by <span className="text-white font-bold">Tamim Hasan</span>
          </p>
          <a 
            href="https://www.facebook.com/share/186xpFdkPL/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4 text-[#1877F2]" />
            Connect on Facebook
          </a>
        </footer>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {copiedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm shadow-2xl z-50 flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-current" />
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
}
