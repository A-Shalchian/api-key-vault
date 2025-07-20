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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Key Distribution Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Distribution</h2>
        {keyDistData.length > 0 ? (
          <div className="h-64">
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
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Distribution of keys by first letter
        </p>
      </div>
      
      {/* Keys Added Over Time */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Keys Added Over Time</h2>
        {keyMonthData.length > 0 ? (
          <div className="h-64">
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
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Number of keys added each month
        </p>
      </div>
      
      {/* Key Stats Summary */}
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <p className="text-sm text-blue-700">Total Keys</p>
            <p className="text-3xl font-bold text-blue-800">{keys.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <p className="text-sm text-green-700">Most Recent</p>
            <p className="text-xl font-bold text-green-800 truncate">
              {keys.length > 0 ? 
                new Date(Math.max(...keys.map(k => new Date(k.createdAt).getTime())))
                  .toLocaleDateString() : 
                'N/A'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <p className="text-sm text-purple-700">Average Key Length</p>
            <p className="text-3xl font-bold text-purple-800">
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
