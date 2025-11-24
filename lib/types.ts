import { CarouselItem } from "@/components/HeroCarousel/HeroCarousel";

export interface Paragraph {
  id: string;
  title?: string; // Identifier only, not displayed
  body: string;
  body_format: 'plain_text' | 'full_html';
}
export interface AirPartner {
  id: string;
  name: string;
  logo: string;
  logoHover?: string;
  url: string;
  alt: string;
}
export interface HomeSection {
  id: string;
  title: string;
  section_type: string;
  paragraphs?: Paragraph[];
  media?: AboutMedia[];
  stats?: AboutStat[];
  image?: string;
  created?: string;
  changed?: string;
  carousel?: CarouselItem[]; 
  partners?: AirPartner[];
  deals?: SpecialDeal[];
  services?: Service[];
}

export interface HomeSectionsResponse {
  data: HomeSection[];
  meta: {
    count: number;
  };
}

export interface AboutStat {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface AboutMedia {
  id: string;
  type: 'iframe' | 'image';
  src: string;
  class?: string;
  height?: number;
  width?: number;
  title?: string;
  alt?: string;
}

export interface AboutParagraph {
  id: string;
  title: string;
  body: string;
  body_format: 'plain_text' | 'full_html';
}

export interface AboutSectionProps {
  title: string;
  paragraphs: AboutParagraph[];
  media?: AboutMedia[];
  stats?: AboutStat[];
}

export interface SpecialDeal {
  id: string;
  title: string;
  image: string;
  url: string;
  description: string;
  button_text: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
}