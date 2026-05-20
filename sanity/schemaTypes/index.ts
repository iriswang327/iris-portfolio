import { bookSchema } from "./book";
import { musicTrackSchema } from "./musicTrack";
import { funFactSchema } from "./funFact";
import { quoteSchema } from "./quote";
import { communitySchema } from "./community";
import { mockProjectSchema } from "./mockProject";
import { experienceOrgSchema } from "./experienceOrg";
import { artworkSchema } from "./artwork";

export const schemaTypes = [
  mockProjectSchema,
  experienceOrgSchema,
  bookSchema,
  musicTrackSchema,
  funFactSchema,
  quoteSchema,
  communitySchema,
  artworkSchema,
];
