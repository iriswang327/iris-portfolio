import { defineField, defineType } from "sanity";

export const communitySchema = defineType({
  name: "community",
  title: "Community Org",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Organization Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "logo",
    },
  },
});
