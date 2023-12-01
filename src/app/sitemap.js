import { connectToDatabase } from "@/utils/connectMongo";

// Sitemap location
// http://localhost:3000/sitemap.xml

export default async function sitemap() {
  const client = await connectToDatabase();
  // Sitemap is my database' name
  const db = client.db("sitemap");
  // Grab everything posts collection
  const data = await db.collection("posts").find({}).toArray();

  const post = data.map((item) => ({
    url: `${item.url}`,
    lastModified: `${item.lastModified}`,
    changeFrequency: `${item.changeFrequency}`,
    priority: `${item.priority}`,
  }));

  return [...post];
}
