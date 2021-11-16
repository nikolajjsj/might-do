import React, { useCallback, useState } from 'react'
import { VStack, useColorModeValue, Fab, Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import TaskList from '../components/task-list'
import MastHead from '../components/masthead'
import Navbar from '../components/navbar'
import shortid from 'shortid'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy stuff!',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Remember to buy milk',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Go walk the dog',
    done: false,
  },
]

export default function MainScreen() {
  const [data, setData] = useState(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])
  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject
      }
      return newData
    })

  }, [])
  const handleFinishEditingTaskItem = useCallback((_item) => {
    setEditingItemId(null)
  }, [])
  const handlePressTaskItemLabel = useCallback((item) => {
    setEditingItemId(item.id)
  }, [])
  const handleRemoveItem = useCallback((item) => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, [])

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'blueGray.900')}
      w="full"
    >
      <MastHead
        title="Well hello there!"
        image={require('../assets/masthead.jpg')}
      >
        <Navbar />
      </MastHead>
      <VStack
        space={1}
        flex={1}
        bg={useColorModeValue('warmGray.50', 'blueGray.900')}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
      >
        <TaskList
          data={data}
          editingItemId={editingItemId}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData([
            {
              id,
              subject: '',
              done: false,
            },
            ...data
          ])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox >
  )
}
