import { LibraryMetadataType, LibraryDetailsType, BookFormatListType, BookFormatEnum, BookResultsType} from "../types";

const consolidateBookSearchResults = (results: any[], libraries: LibraryMetadataType[]): BookResultsType[] => {
  const items = results.map((libraryResults, libraryIndex) => libraryResults.items.map((item:any, sortOrder:number) => {
    item.library = libraries[libraryIndex].id
    item.libraryName = libraries[libraryIndex].name
    item.sortOrder = sortOrder
    return item
  }))
  const allBookResults = [].concat.apply([], items)

  const sortFn = (a:any, b:any) => {
    if (a.isAvailable === b.isAvailable) {
      return (a.estimatedWaitDays||10000) - (b.estimatedWaitDays||10000)
    } else {
      return b.isAvailable - a.isAvailable
    }
  }
  const grouped = groupBooksById(allBookResults).map(book => {
    book.items = book.items.sort(sortFn)
    return book
  })
  return grouped
}

const findBook = async (library: LibraryMetadataType, query: string, format: BookFormatListType) => {
  const cleanedQuery = encodeURIComponent(query.trim())
  let formatsAll = format.map(formatType => BookFormatEnum[formatType])
  return await fetch(`https://thunder.api.overdrive.com/v2/libraries/${library.id}/media?query=${cleanedQuery}&format=${formatsAll.join()}&page=1&perPage=20`)
    .then(response => response.json())
}

const groupBooksById = (books:any): BookResultsType[] => {
  return books.reduce((result:any, book:any) => {
    let match:BookResultsType = result.find((r:any) => r.id === book.id)
    if (!match) {
      match = {
        id: book.id,
        author: book.firstCreatorName,
        title: book.title,
        image: book.covers.cover150Wide ? book.covers.cover150Wide.href : null,
        sample: book.sample ? book.sample.href: null,
        sortOrder: book.sortOrder,
        type: book.type.name,
        items:[]
      }
      if (book.detailedSeries) {
        match.detailedSeries = {
          series: book.detailedSeries.seriesName,
          seriesPosition: book.detailedSeries.readingOrder
        }
      }
      result.push(match)
    }
    const bookData = {
      availableCopies: book.availableCopies,
      estimatedWaitDays: book.estimatedWaitDays,
      href: `https://libbyapp.com/search/${book.library}/search/query-${book.title}/page-1/${book.id}`,
      holdsCount: book.holdsCount,
      library: book.library,
      libraryName: book.libraryName,
      isAvailable: book.isAvailable,
      ownedCopies: book.ownedCopies
    }
    match.items.push(bookData)
    return result;
  }, []);
}

const findBooks = async (searchTerm: string, libraries: LibraryMetadataType[], format: BookFormatListType): Promise<BookResultsType[]> => {
  const results = await Promise.all(libraries.map(library => findBook(library, searchTerm, format)))
  return consolidateBookSearchResults(results, libraries);
}

const getLibraryInfo = async (websiteIds: number[]): Promise<LibraryMetadataType[]> => {
  const response = await fetch(`https://thunder.api.overdrive.com/v2/libraries/?websiteIds=${websiteIds.join()}`);
  const data = await response.json();
  const libraryData = data.items.map((data:any) => {
    return {
      id: data.preferredKey,
      name: data.name,
      websiteId: data.websiteId,
      link: data.links.libraryHome ? data.links.libraryHome.href : null,
      logo: data.settings.logo140X60.href
    }
  })
  return libraryData as LibraryMetadataType[];
};

const findLibraries = async (searchTerm: string, signal:AbortSignal): Promise<LibraryDetailsType[]> => {
  if (!signal.aborted) {
    const libraries: LibraryDetailsType[] = await fetch(`/api/locate/autocomplete/${searchTerm}`, {signal})
      .then((response) => response.json())
      .then((data: any) => {
        return data.branches
          .filter((branch: any) => branch.systems.length > 0)
          .map((branch: any) => {
            return {
              id: branch.systems[0].id,
              locationName: branch.name,
              address: branch.address,
              city: branch.city,
              region: branch.region,
              country: branch.country,
              countryCode: branch.countryCode,
              fulfillmentId: branch.systems[0].fulfillmentId,
              name: branch.systems[0].name,
              logo: branch.systems[0].styling.logos[0].sourceUrl,
              branchIds: branch.systems[0].branchIds,
              websiteId: branch.systems[0].websiteId
            }
          })
          .filter((value: LibraryDetailsType, index: number, self: LibraryDetailsType[]) => {
            return index === self.findIndex((t) =>  t.id === value.id )
          }
          )
        })
        .catch(e => [])
      return libraries;
  } else {
    return [];
  }
}

export { findBooks, getLibraryInfo, findLibraries }