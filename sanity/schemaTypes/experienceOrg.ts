import { defineField, defineType, defineArrayMember } from "sanity";

export const experienceOrgSchema = defineType({
  name: "experienceOrg",
  title: "Experience Org",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Organization Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tagline",
      title: "Pill Label",
      type: "string",
      description: "e.g. 'Tower & Bridge · Analytics Strategy'",
    }),
    defineField({
      name: "description",
      title: "Card Description",
      type: "string",
      description: "Appears below card on hover",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cardGradient",
      title: "Card Gradient CSS",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "dateRange",
      title: "Date Range",
      type: "string",
      description: "e.g. '2025–Present'",
    }),
    defineField({
      name: "isCurrent",
      title: "Currently Active",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "projects",
      title: "Projects / Case Studies",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "expProject",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            defineField({
              name: "context",
              title: "Context",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "problem",
              title: "The Problem",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "process",
              title: "Process",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "solution",
              title: "Solution",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "impact",
              title: "Impact",
              type: "text",
              rows: 2,
              description: "e.g. '🏆 Best Presentation out of 18 teams'",
            }),
            defineField({
              name: "reflection",
              title: "Reflection",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "thumbnail",
              title: "Thumbnail",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "title", media: "thumbnail" },
          },
        }),
      ],
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
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
