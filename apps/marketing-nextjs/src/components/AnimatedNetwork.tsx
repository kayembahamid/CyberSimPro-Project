'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

export default function AnimatedNetwork() {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes([Math.floor(Math.random() * 8)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: '1,247 Threats', icon: AlertTriangle, color: '#ef4444', x: 200, y: 100 },
    { label: '892 CVEs', icon: AlertTriangle, color: '#f59e0b', x: 600, y: 150 },
    { label: '3,421 Secure', icon: CheckCircle, color: '#10b981', x: 800, y: 250 },
    { label: '156 Incidents', icon: Shield, color: '#8b5cf6', x: 300, y: 350 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for lines */}
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Animated flowing paths */}
        {[
          { d: 'M 50 100 Q 300 50 600 200 T 1100 300', gradient: 'lineGradient1' },
          { d: 'M 100 400 Q 400 300 700 350 T 1150 200', gradient: 'lineGradient2' },
          { d: 'M 0 250 Q 300 200 600 300 T 1200 250', gradient: 'lineGradient3' },
          { d: 'M 50 500 Q 400 450 800 400 T 1150 450', gradient: 'lineGradient1' },
          { d: 'M 200 50 Q 500 150 800 100 T 1100 150', gradient: 'lineGradient2' },
        ].map((path, index) => (
          <g key={index}>
            {/* Base path */}
            <path
              d={path.d}
              fill="none"
              stroke="url(#lineGradient1)"
              strokeWidth="1"
              opacity="0.2"
            />
            {/* Animated flowing line */}
            <motion.path
              d={path.d}
              fill="none"
              stroke={`url(#${path.gradient})`}
              strokeWidth="2"
              strokeDasharray="20 80"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -100 }}
              transition={{
                duration: 3 + index,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </g>
        ))}

        {/* Animated node circles */}
        {[
          { cx: 100, cy: 150 },
          { cx: 300, cy: 250 },
          { cx: 500, cy: 150 },
          { cx: 700, cy: 350 },
          { cx: 900, cy: 200 },
          { cx: 600, cy: 450 },
          { cx: 400, cy: 500 },
          { cx: 1000, cy: 400 },
        ].map((node, index) => (
          <g key={index}>
            {/* Outer ring pulse */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="20"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.5, 0.8],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            />
            {/* Inner node */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="6"
              fill={activeNodes.includes(index) ? '#3b82f6' : '#1e293b'}
              stroke="#3b82f6"
              strokeWidth="2"
              animate={
                activeNodes.includes(index)
                  ? { scale: [1, 1.3, 1] }
                  : {}
              }
              transition={{ duration: 0.5 }}
            />
            {/* Warning triangle for some nodes */}
            {index % 3 === 0 && (
              <motion.path
                d={`M ${node.cx} ${node.cy - 15} L ${node.cx + 6} ${node.cy - 3} L ${node.cx - 6} ${node.cy - 3} Z`}
                fill="#ef4444"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.4,
                }}
              />
            )}
          </g>
        ))}

        {/* Central hub with logo */}
        <g transform="translate(600, 300)">
          {/* Outer glow */}
          <motion.circle
            r="60"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            opacity="0.3"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          {/* Inner circle */}
          <circle r="40" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" />
          {/* Logo/Icon */}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#3b82f6"
            fontSize="24"
            fontWeight="bold"
          >
            CS
          </text>
        </g>
      </svg>

      {/* Floating metric labels */}
      <div className="absolute inset-0 pointer-events-none">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${(metric.x / 1200) * 100}%`,
              top: `${(metric.y / 600) * 100}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [20, 0, 0, -10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 1.5,
            }}
          >
            <div className="bg-gray-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-700 flex items-center gap-2 whitespace-nowrap">
              <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
              <span className="text-sm font-medium text-gray-200">{metric.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
