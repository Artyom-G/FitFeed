import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const globalStyles = require("../globalStyles.json");

const LoadingIndicator = () => {
  return (
    <ActivityIndicator size={'large'} color={globalStyles.activePrimaryColor}/>
  )
}

export default LoadingIndicator

const styles = StyleSheet.create({})