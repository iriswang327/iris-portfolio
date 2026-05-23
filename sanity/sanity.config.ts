import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "iris wang",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("iris wang")
          .items([
            S.listItem()
              .title("Dreams — Mock Projects")
              .child(S.documentTypeList("mockProject")),
            S.listItem()
              .title("Experience")
              .child(S.documentTypeList("experienceOrg")),
            S.listItem()
              .title("Books")
              .child(S.documentTypeList("book")),
            S.listItem()
              .title("Music Rotation")
              .child(S.documentTypeList("musicTrack")),
            S.listItem()
              .title("Fun Facts")
              .child(S.documentTypeList("funFact")),
            S.listItem()
              .title("Quotes")
              .child(S.documentTypeList("quote")),
            S.listItem()
              .title("Community")
              .child(S.documentTypeList("community")),
            S.listItem()
              .title("Artwork (Museum of Art)")
              .child(S.documentTypeList("artwork")),
          ]),
    }),
  ],
});
