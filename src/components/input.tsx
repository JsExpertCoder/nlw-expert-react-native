import { View, Text, TextInput, TextInputProps } from 'react-native'
import React from 'react'
import colors from 'tailwindcss/colors'

export default function Input({...rest}: TextInputProps) {
  return (
    <TextInput 
      {...rest}
      multiline
      textAlignVertical='top'
      placeholderTextColor={colors.slate[400]}
      className='h-32 bg-slate-800 text-white rounded-md px-4 py-3 font-body text-sm'
    />
  )
}