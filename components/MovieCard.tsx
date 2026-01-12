import { icons } from "@/constants/icons";
import { saveMovie, removeMovie, isSaved } from "@/services/appwrite";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentId, setDocumentId] = useState("");

  useEffect(() => {
    checkIfSaved();
  }, []);

  const checkIfSaved = async () => {
    try {
      const result = await isSaved(id);
      setSaved(result.saved);
      setDocumentId(result.documentId);
    } catch (error) {
      console.error("Error checking saved status:", error);
    }
  };

  const handleSaveToggle = async () => {
    setLoading(true);
    try {
      if (saved) {
        await removeMovie(documentId);
        setSaved(false);
      } else {
        const movieData: Partial<Movie> = {
          id,
          title,
          poster_path,
        };
        await saveMovie(movieData as Movie, documentId);
        setSaved(true);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-[30%]">
      <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity>
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
            className="w-32 h-48 rounded-lg"
          />
        </TouchableOpacity>
      </Link>

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
      </View>

      <TouchableOpacity
        onPress={handleSaveToggle}
        disabled={loading}
        className={`mt-2 py-1 px-2 rounded ${saved ? "bg-secondary" : "bg-primary"} border border-secondary`}
      >
        <Text
          className={`text-center text-xs font-semibold ${saved ? "text-white" : "text-light-300"}`}
        >
          {loading ? "..." : saved ? "✓ Saved" : "+ Save"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieCard;
