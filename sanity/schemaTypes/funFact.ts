import { defineField, defineType } from "sanity";

export const funFactSchema = defineType({
  name: "funFact",
  title: "Fun Fact",
  type: "document",
  fields: [
    defineField({
      name: "emoji",
      title: "Emoji",
      type: "string",
    }),
    defineField({
      name: "fact",
      title: "Fact",
      type: "string",
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
      title: "fact",
      subtitle: "emoji",
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
