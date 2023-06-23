
const autocompleteResponse = {
  "branches": [
    {
      "id": 123,
      "name": "Anytown Public Library",
      "address": "52 Main St.",
      "phoneNumber": "555-555-5555",
      "city": "Anytown",
      "regionCode": "NY",
      "region": "New York",
      "postalCode": "55555",
      "countryCode": "US",
      "country": "United States",
      "links": [
        {
          "name": "BranchLibraryUrl",
          "url": "http://www.publiclibrary.org/"
        }
      ],
      "systems": [
        {
          "id": 5555,
          "websiteId": 555,
          "type": "Public Library",
          "name": "Sample Library, Inc.",
          "fulfillmentId": "samplelibrary",
          "branchIds": [
            1111,
            22222
          ],
          "links": [
            {
              "name": "DigitalLibraryUrl",
              "url": "sample-library.lib.overdrive.com"
            }
          ],
          "styling": {
            "logos": [
              {
                "size": "140x60",
                "sourceUrl": "https://thunder.cdn.overdrive.com/logos/crushed/1281.png?1"
              }
            ]
          },
          "countryCode": [
            "US"
          ],
          "regionCode": [
            "CT"
          ]
        }
      ]
    }
  ]
}

const libraryResponse = {
  "items": [
    {
      "accessId": 1111,
      "websiteId": 55555,
      "settings": {
        "logo140X60": {
          "href": "https://thunder.cdn.overdrive.com/logos/crushed/1111.png?1"
        }
      },
      "links": {
        "libraryHome": {
          "href": "http://www.test.org"
        },
      },
      "name": "Sample Library, Inc.",
      "fulfillmentId": "slibrary",
      "visitorKey": "sli-visitor",
      "preferredKey": "sli",
      "id": "sli"
    }
  ]
}

const bookResponse = {
  "totalItems": 2,
  "items": [
    {
      "isAvailable": true,
      "creators": [
        {
          "id": 470544,
          "sortName": "Vonnegut, Kurt",
          "role": "Author",
          "name": "Kurt Vonnegut"
        }
      ],
      "sample": {
        "href": "https://samples.link-to-sample.com/book=1"
      },
      "publisher": {
        "name": "Test Publishing Group",
        "id": "1054"
      },
      "type": {
        "name": "eBook",
        "id": "ebook"
      },
      "covers": {
        "cover150Wide": {
          "primaryColor": {
            "rgb": {
              "blue": 224,
              "green": 195,
              "red": 50
            },
            "hex": "#32C3E0"
          },
          "width": 150,
          "height": 200,
          "href": "https://img1.od-cdn.com/ImageType-150/0111-1/E1A/5D1/13/{E1A5D113-86A7-46F7-9FF7-0DA4553B0E3F}Img150.jpg"
        },
        "cover300Wide": {
          "primaryColor": {
            "rgb": {
              "blue": 211,
              "green": 188,
              "red": 79
            },
            "hex": "#4FBCD3"
          },
          "width": 300,
          "height": 400,
          "href": "https://img1.od-cdn.com/ImageType-400/0111-1/E1A/5D1/13/{E1A5D113-86A7-46F7-9FF7-0DA4553B0E3F}Img400.jpg"
        },
        "cover510Wide": {
          "primaryColor": {
            "rgb": {
              "blue": 203,
              "green": 166,
              "red": 22
            },
            "hex": "#16A6CB"
          },
          "width": 510,
          "height": 680,
          "href": "https://img1.od-cdn.com/ImageType-100/0111-1/{E1A5D113-86A7-46F7-9FF7-0DA4553B0E3F}Img100.jpg"
        }
      },
      "subtitle": "A Novel",
      "description": "Novel Description",
      "availableCopies": 2,
      "ownedCopies": 4,
      "holdsCount": 0,
      "holdsRatio": 0,
      "estimatedWaitDays": 4,
      "availabilityType": "normal",
      "id": "278113",
      "firstCreatorName": "Kurt Vonnegut",
      "firstCreatorSortName": "Vonnegut, Kurt",
      "title": "Cat's Cradle",
      "sortTitle": "Cats Cradle A Novel",
      "starRating": 4.1,
      "starRatingCount": 580,
      "publishDate": "2009-11-04T05:00:00Z",
      "publishDateText": "11/04/2009",
      "reserveId": "e1a5d113-86a7-46f7-9ff7-0da4553b0e3f"
    },
    {
      "isAvailable": false,
      "creators": [
        {
          "id": 470544,
          "sortName": "Vonnegut, Kurt",
          "role": "Author",
          "name": "Kurt Vonnegut"
        }
      ],
      "sample": {
        "href": "https://samples.link-to-sample.com/book=2"
      },
      "publisher": {
        "name": "Random House Publishing Group",
        "id": "1054"
      },
      "type": {
        "name": "eBook",
        "id": "ebook"
      },
      "covers": {
        "cover150Wide": {
          "primaryColor": {
            "rgb": {
              "blue": 38,
              "green": 109,
              "red": 243
            },
            "hex": "#F36D26"
          },
          "width": 150,
          "height": 200,
          "href": "https://img1.od-cdn.com/ImageType-150/0111-1/CDD/1B6/3C/{CDD1B63C-E757-4F49-91E2-35F2388AFAE7}Img150.jpg"
        },
        "cover300Wide": {
          "primaryColor": {
            "rgb": {
              "blue": 38,
              "green": 109,
              "red": 243
            },
            "hex": "#F36D26"
          },
          "width": 300,
          "height": 400,
          "href": "https://img1.od-cdn.com/ImageType-400/0111-1/CDD/1B6/3C/{CDD1B63C-E757-4F49-91E2-35F2388AFAE7}Img400.jpg"
        },
        "cover510Wide": {
          "primaryColor": {
            "rgb": {
              "blue": 38,
              "green": 109,
              "red": 243
            },
            "hex": "#F36D26"
          },
          "width": 510,
          "height": 680,
          "href": "https://img1.od-cdn.com/ImageType-100/0111-1/{CDD1B63C-E757-4F49-91E2-35F2388AFAE7}Img100.jpg"
        }
      },
      "subtitle": "A Novel",
      "description": "Novel Description",
      "availableCopies": 0,
      "ownedCopies": 2,
      "holdsCount": 0,
      "holdsRatio": 0,
      "estimatedWaitDays": 7,
      "availabilityType": "normal",
      "id": "268506",
      "firstCreatorName": "Kurt Vonnegut",
      "firstCreatorSortName": "Vonnegut, Kurt",
      "title": "Breakfast of Champions",
      "sortTitle": "Breakfast of Champions A Novel",
      "starRating": 3.9,
      "starRatingCount": 293,
      "publishDate": "2009-09-23T04:00:00Z",
      "publishDateText": "09/23/2009",
      "reserveId": "cdd1b63c-e757-4f49-91e2-35f2388afae7"
    }
  ]
}
export default async function mockFetch(input:RequestInfo|URL, init?:RequestInit | undefined): Promise<Response> {
  const url = input.toString();
  let response
  if(url.startsWith('/api/locate/autocomplete')) {
    response = autocompleteResponse;
  } else if (url.startsWith('https://thunder.api.overdrive.com/v2/libraries/?websiteIds')) {
    response = libraryResponse;
  } else if (url.startsWith('https://thunder.api.overdrive.com/v2/libraries/')) {
    response = bookResponse;
  }
  if(response) {
    return {
      json: jest.fn().mockResolvedValue(response)
    } as unknown as Response;
  } else {
    throw new Error(`Unhandled request: ${url}`);
  }

}