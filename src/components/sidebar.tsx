import React, { useCallback } from 'react'
import { HStack, VStack, Center, Avatar, Heading, IconButton, useColorModeValue } from 'native-base'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import AnimatedColorBox from './animated-color-box'
import ThemeToggle from './theme-toggle'
import { Feather } from '@expo/vector-icons'
import MenuButton from './menu-button'

const Sidebar = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props
  const currentRoute = state.routeNames[state.index]
  const handleBackButtonPress = useCallback(() => {
    navigation.closeDrawer()
  }, [navigation])
  const handleMenuMainPress = useCallback(() => {
    navigation.navigate('Main')
  }, [navigation])
  const handleMenuAboutPress = useCallback(() => {
    navigation.navigate('About')
  }, [navigation])

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handleBackButtonPress}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            _icon={{ as: Feather, name: 'chevron-left', size: 6, color: useColorModeValue('blue.800', 'darkBlue.700') }}
          ></IconButton>
        </HStack>
        <Avatar
          source={require('../assets/profile-image.jpg')}
          size="xl"
          borderRadius={100}
          mb={6}
          borderColor="secondary.500"
          borderWidth={3}
        ></Avatar>
        <Heading mb={4} size="xl">Might do!</Heading>
        <MenuButton
          active={currentRoute === 'Main'}
          onPress={handleMenuMainPress}
          icon="inbox"
        >Tasks</MenuButton>
        <MenuButton
          active={currentRoute === 'About'}
          onPress={handleMenuAboutPress}
          icon="info"
        >About</MenuButton>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
  )
}

export default Sidebar
