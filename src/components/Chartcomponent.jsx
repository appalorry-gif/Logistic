import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ChartComponent = ({ type = 'bar', data, title, dataKeyX, dataKeyY, colors = ['#ff6b35', '#4ade80'] }) => {
  if (type === 'bar') {
    return (
      <div className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-6 w-full">
        <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a4f7a" />
            <XAxis dataKey={dataKeyX} stroke="#7aa3d1" />
            <YAxis stroke="#7aa3d1" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a2f4a', border: '1px solid #2a4f7a', borderRadius: '8px' }}
              cursor={{ fill: '#2a4f7a' }}
            />
            {Array.isArray(dataKeyY) ? (
              dataKeyY.map((key, idx) => (
                <Bar key={key} dataKey={key} fill={colors[idx]} radius={[8, 8, 0, 0]} />
              ))
            ) : (
              <Bar dataKey={dataKeyY} fill={colors[0]} radius={[8, 8, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === 'line') {
    return (
      <div className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-6 w-full">
        <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a4f7a" />
            <XAxis dataKey={dataKeyX} stroke="#7aa3d1" />
            <YAxis stroke="#7aa3d1" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a2f4a', border: '1px solid #2a4f7a', borderRadius: '8px' }}
            />
            <Line
              type="monotone"
              dataKey={dataKeyY}
              stroke={colors[0]}
              strokeWidth={2}
              dot={{ fill: colors[0] }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === 'pie') {
    return (
      <div className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-6 w-full">
        <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color || colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-4">
          {data.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="flex items-center gap-2 text-white">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color || colors[idx] }}
                ></div>
                {item.name}
              </span>
              <span className="font-semibold text-[#7aa3d1]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ChartComponent;