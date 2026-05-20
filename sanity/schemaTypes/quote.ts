import { defineField, defineType } from "sanity";

export const quoteSchema = defineType({
  name: "quote",
  title: "Philosophy Quote",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Quote Text",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
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
      title: "attribution",
      subtitle: "text",
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
