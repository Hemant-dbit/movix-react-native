import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { getSavedMoviesCount, getTrendingMovies } from '@/services/appwrite'
import useFetch from '@/services/useFetch'

const Profile = () => {
  const {
    data: stats = { saved: 0, trending: 0 },
    loading,
    error,
  } = useFetch(async () => {
    const saved = await getSavedMoviesCount()
    const trending = await getTrendingMovies()
    return {
      saved,
      trending: trending?.length || 0,
    }
  })

  const userStats = [
    { label: 'Trending Searches', value: stats.trending.toString() },
    { label: 'Saved Movies', value: stats.saved.toString() },
    { label: 'Total Suggestions', value: (stats.trending + stats.saved).toString() },
  ]

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 20 }}
      >
        <View className="items-center mt-16 mb-8">
          <View className="w-20 h-20 rounded-full bg-secondary items-center justify-center mb-4">
            <Image source={icons.profile || icons.logo} className="w-10 h-10" />
          </View>
          <Text className="text-white text-2xl font-bold">Movie Lover</Text>
          <Text className="text-light-300 text-sm mt-1">Discover & Save Your Favorite Movies</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
        ) : error ? (
          <Text className="text-red-500 px-5 my-3">Error: {error.message}</Text>
        ) : (
          <>
            <View className="bg-secondary rounded-lg p-4 mb-6">
              <Text className="text-white text-lg font-bold mb-4">Your Stats</Text>
              {userStats.map((stat, index) => (
                <View
                  key={index}
                  className={`flex-row justify-between items-center py-3 ${index !== userStats.length - 1 ? 'border-b border-primary' : ''}`}
                >
                  <Text className="text-light-300">{stat.label}</Text>
                  <Text className="text-white font-semibold text-lg">{stat.value}</Text>
                </View>
              ))}
            </View>

            <View className="bg-secondary rounded-lg p-4 mb-6">
              <Text className="text-white text-lg font-bold mb-3">About</Text>
              <Text className="text-light-300 text-sm leading-6 mb-4">
                Movix is your personal movie suggestion engine. Explore trending searches, save your favorite movies, and discover new recommendations based on your interests.
              </Text>
            </View>

            <View className="bg-secondary rounded-lg p-4 mb-6">
              <Text className="text-white text-lg font-bold mb-3">Quick Links</Text>
              <View className="py-3 border-b border-primary">
                <Text className="text-light-300">Privacy Policy</Text>
              </View>
              <View className="py-3 border-b border-primary">
                <Text className="text-light-300">Terms of Service</Text>
              </View>
              <View className="py-3">
                <Text className="text-light-300">Version 1.0.0</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default Profile