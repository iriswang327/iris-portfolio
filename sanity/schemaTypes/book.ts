import { defineField, defineType } from "sanity";

export const bookSchema = defineType({
  name: "book",
  title: "Book",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "status",
      title: "Reading Status",
      type: "string",
      options: {
        list: [
          { title: "Currently Reading", value: "currently-reading" },
          { title: "To Be Read", value: "to-be-read" },
          { title: "Almost ✦ Stars", value: "almost-stars" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author",
      media: "cover",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
