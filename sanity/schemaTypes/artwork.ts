import { defineField, defineType } from "sanity";

export const artworkSchema = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      options: {
        list: [
          { title: "Illustration", value: "illustration" },
          { title: "Oil", value: "oil" },
          { title: "Watercolor", value: "watercolor" },
          { title: "Sketchbook", value: "sketchbook" },
          { title: "Childhood", value: "childhood" },
        ],
        layout: "dropdown",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      options: {
        list: [
          { title: "Portrait", value: "portrait" },
          { title: "Landscape", value: "landscape" },
          { title: "Square", value: "square" },
        ],
        layout: "radio",
      },
      initialValue: "portrait",
    }),
    defineField({
      name: "frameStyle",
      title: "Frame Style",
      type: "string",
      options: {
        list: [
          { title: "Heavy Carved", value: "heavy" },
          { title: "Thin Elegant", value: "thin" },
        ],
        layout: "radio",
      },
      initialValue: "heavy",
    }),
    defineField({
      name: "tiltDeg",
      title: "Tilt (degrees)",
      type: "number",
      description: "Subtle 1-2° tilt for organic feel. Use 0 for no tilt.",
      initialValue: 0,
      validation: (R) => R.min(-3).max(3),
    }),
    defineField({
      name: "order",
      title: "Gallery Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "medium",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title ?? "Artwork",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Gallery Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
