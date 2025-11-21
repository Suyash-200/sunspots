export interface Paragraph {
  id: string;
  title?: string; // Identifier only, not displayed
  body: string;
  body_format?: string;
}

export interface HomeSection {
  id: string;
  title: string;
  section_type: string;
  paragraphs?: Paragraph[];
  image?: string;
  created?: string;
  changed?: string;
}

export interface HomeSectionsResponse {
  data: HomeSection[];
  meta: {
    count: number;
  };
}

