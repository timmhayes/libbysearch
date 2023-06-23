export interface LibraryMetadataType {
  id: string,
  websiteId: number,
  name?: string,
  link?: string,
  logo?: string
}

export interface LibraryDetailsType {
  locationName: string,
  address: string,
  id: number,
  city: string,
  region: string,
  country: string,
  branchIds: number[],
  fulfillmentId: string,
  countryCode: string,
  logo: string,
  name: string,
  websiteId: number
}

export type BookFormatType = 'ebook' | 'audiobook' | 'magazine'
export type BookFormatListType = BookFormatType[]

export enum BookFormatEnum {
  ebook = 'ebook-kindle,ebook-overdrive,ebook-epub-adobe,ebook-pdf-adobe,ebook-kobo',
  audiobook = 'audiobook-overdrive,audiobook-mp3',
  magazine = 'magazine-overdrive'
}

export interface BookResultsType {
  id: string,
  author: string,
  title: string,
  image: string,
  sample: string,
  sortOrder: number,
  type: string,
  detailedSeries?: {
    series: string,
    seriesPosition: number
  },
  items: {
    availableCopies: number,
    estimatedWaitDays: number,
    href: string,
    holdsCount: number,
    library: string,
    libraryName: string,
    isAvailable: boolean,
    ownedCopies: number
  }[]
}

