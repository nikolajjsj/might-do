import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native'
import { Text, Box, Center, VStack, useColorModeValue } from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import TaskItem from '../components/task-item'
// import AnimatedCheckbox from '../components/animated-checkbox'

export default function MainScreen() {
  const [checked, setChecked] = useState(false)
  const [subject, setSubject] = useState('Task Item!')
  const [isEditing, setIsEditing] = useState(false)
  const handlePressCheckbox = useCallback(() => {
    setChecked(prev => !prev)
  }, [])

  return (
    <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} flex={1}>
      <VStack space={5} alignItems="center" w="full">
        <TaskItem
          isDone={checked}
          onToggleCheckBox={handlePressCheckbox}
          subject={subject}
          isEditing={isEditing}
          onChangeSubject={setSubject}
          onPressLabel={() => setIsEditing(true)}
          onFinishEditing={() => setIsEditing(false)}
        />
        <ThemeToggle />
      </VStack>
    </Center >
  )
}
