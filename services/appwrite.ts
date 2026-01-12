import { Client, Databases, Query, ID } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movieId: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return undefined;
  }
};

// Saved Movies Functions
export const saveMovie = async (movie: Movie, documentId: string) => {
  try {
    if (documentId) {
      // Movie exists in DB, just update the saved flag
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, {
        saved: true,
      });
    } else {
      // Movie doesn't exist in DB, create it first
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        movieId: movie.id,
        title: movie.title,
        searchTerm: movie.title,
        count: 0,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        saved: true,
      });
    }
  } catch (error) {
    console.error("Error saving movie:", error);
    throw error;
  }
};

export const removeMovie = async (documentId: string) => {
  try {
    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, {
      saved: false,
    });
  } catch (error) {
    console.error("Error removing movie:", error);
    throw error;
  }
};

export const getSavedMovies = async (): Promise<Movie[] | undefined> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("saved", true),
      Query.orderDesc("$createdAt"),
    ]);
    return result.documents as unknown as Movie[];
  } catch (error) {
    console.error("Error fetching saved movies:", error);
    return undefined;
  }
};

export const isSaved = async (
  movieId: number
): Promise<{ saved: boolean; documentId: string }> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("movieId", movieId),
    ]);
    if (result.documents.length > 0) {
      return {
        saved: result.documents[0].saved || false,
        documentId: result.documents[0].$id,
      };
    }
    return { saved: false, documentId: "" };
  } catch (error) {
    console.error("Error checking if movie is saved:", error);
    return { saved: false, documentId: "" };
  }
};

export const getSavedMoviesCount = async (): Promise<number> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("saved", true),
    ]);
    return result.total;
  } catch (error) {
    console.error("Error fetching saved movies count:", error);
    return 0;
  }
};
