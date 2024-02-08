import { View, Text } from 'react-native'
import React from 'react'

export default function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}