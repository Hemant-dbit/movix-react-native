import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";

const Saved = () => {
  const {
    data: savedMovies = [],
    loading,
    error,
  } = useFetch(() => getSavedMovies());

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
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Text className="text-white text-2xl font-bold mt-16 mb-5">
          Saved Movies
        </Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text className="text-red-500 px-5 my-3">Error: {error.message}</Text>
        ) : savedMovies && savedMovies.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={savedMovies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 16,
              paddingRight: 10,
              marginBottom: 10,
            }}
          />
        ) : (
          <View className="flex-1 justify-center items-center mt-20">
            <Text className="text-white text-lg">No saved movies yet</Text>
            <Text className="text-light-300 text-sm mt-2">
              Start saving your favorite movies!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Saved;
