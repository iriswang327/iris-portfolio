import { defineField, defineType } from "sanity";

export const musicTrackSchema = defineType({
  name: "musicTrack",
  title: "Music Track",
  type: "document",
  fields: [
    defineField({
      name: "artist",
      title: "Artist",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "track",
      title: "Track Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "albumArt",
      title: "Album Art",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Rotation Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "track",
      subtitle: "artist",
      media: "albumArt",
    },
  },
  orderings: [
    {
      title: "Rotation Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
