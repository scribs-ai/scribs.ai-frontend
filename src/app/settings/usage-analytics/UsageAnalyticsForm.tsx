"use client"

import { getUsageAnalyticData } from '@/app/api/settingsService'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface data {
  date: string,
  time: string,
  feature: string,
  tokens: string
}

const UsageAnalyticsForm: React.FC = () => {
  const [data, setData] = useState<data[]>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsageAnalyticData()
      setData([response.data])

    }
    fetchData()
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 300,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="tokens" fill="#8884d8" />
        <Bar dataKey="user_id" fill="#82ca9d" />
        <Bar dataKey="id" fill="orange" />
      </BarChart>
    </ResponsiveContainer >
  )
}

export default UsageAnalyticsForm