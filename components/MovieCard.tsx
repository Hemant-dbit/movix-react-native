import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ id, title, poster_path, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-32 h-48 rounded-lg"
        />
        <Text className="text-white mt-2 text-sm" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start mt-1 gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-s uppercase font-semibold">
            {Math.round(vote_average)}/10
          </Text>
        </View>

        <View className="flex-row items-center justify-between gap-x-2">
          <Text className="text-light-300 text-xs mt-1">
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-light-300 text-xs mt-1 uppercase font-semibold">
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
