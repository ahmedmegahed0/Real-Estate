export interface Project {
  _id: string;
  name: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  gallery: string[];
  amenities: string[];
  googleMapsUrl?: string;
  whatsappNumber: string;
  phoneNumber: string;
  isPublished: boolean;
  isFeatured: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  name: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  gallery: string[];
  amenities: string[];
  googleMapsUrl?: string;
  whatsappNumber: string;
  phoneNumber: string;
  isPublished?: boolean;
  isFeatured?: boolean;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {}
