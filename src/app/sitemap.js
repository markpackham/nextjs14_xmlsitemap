import { connectToDatabase } from "@/utils/connectMongo";

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

  return [
    {
      url: "https://acme.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://acme.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://acme.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
