"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

interface KeyEntry {
  id: number;
  name: string;
  apiKey: string;
  createdAt: string;
}

interface AnalyticsSectionProps {
  keys: KeyEntry[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function AnalyticsSection({ keys }: AnalyticsSectionProps) {
  const processAnalyticsData = (keys: KeyEntry[]) => {
    const distribution: Record<string, number> = {};
    keys.forEach(key => {
      const firstChar = key.name.charAt(0).toUpperCase();
      distribution[firstChar] = (distribution[firstChar] || 0) + 1;
    });
    
    const keyDistData = Object.entries(distribution)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
    
    const monthData: Record<string, number> = {};
    keys.forEach(key => {
      const date = new Date(key.createdAt);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      monthData[monthYear] = (monthData[monthYear] || 0) + 1;
    });
    
    const keyMonthData = Object.entries(monthData)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        const dateA = new Date(a.name);
        const dateB = new Date(b.name);
        return dateA.getTime() - dateB.getTime();
      });
    
    return { keyDistData, keyMonthData };
  };

  const { keyDistData, keyMonthData } = processAnalyticsData(keys);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Key Distribution Chart */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent mb-6">Key Distribution</h2>
        {keyDistData.length > 0 ? (
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={keyDistData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={(props) => {
                    const { name, percent } = props;
                    return percent ? `${name}: ${(percent * 100).toFixed(0)}%` : '';
                  }}
                >
                  {keyDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} keys`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 sm:h-80 text-center">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-full mb-4">
              <svg className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium text-base sm:text-lg">No data available</p>
          </div>
        )}
        <p className="text-sm sm:text-base text-gray-600 mt-6 text-center font-medium">
          Distribution of keys by first letter
        </p>
      </div>
      
      {/* Keys Added Over Time */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent mb-6">Keys Added Over Time</h2>
        {keyMonthData.length > 0 ? (
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={keyMonthData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0088FE" name="Keys Added" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 sm:h-80 text-center">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-full mb-4">
              <svg className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium text-base sm:text-lg">No data available</p>
          </div>
        )}
        <p className="text-sm sm:text-base text-gray-600 mt-6 text-center font-medium">
          Number of keys added each month
        </p>
      </div>
      
      {/* Key Stats Summary */}
      <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent mb-6">Key Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl border border-indigo-200">
            <p className="text-sm sm:text-base font-semibold text-indigo-700 mb-2">Total Keys</p>
            <p className="text-3xl sm:text-4xl font-bold text-indigo-800">{keys.length}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
            <p className="text-sm sm:text-base font-semibold text-emerald-700 mb-2">Most Recent</p>
            <p className="text-lg sm:text-xl font-bold text-emerald-800 truncate">
              {keys.length > 0 ? 
                new Date(Math.max(...keys.map(k => new Date(k.createdAt).getTime())))
                  .toLocaleDateString() : 
                'N/A'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
            <p className="text-sm sm:text-base font-semibold text-purple-700 mb-2">Average Key Length</p>
            <p className="text-3xl sm:text-4xl font-bold text-purple-800">
              {keys.length > 0 ? 
                Math.round(keys.reduce((sum, key) => sum + key.apiKey.length, 0) / keys.length) : 
                'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
