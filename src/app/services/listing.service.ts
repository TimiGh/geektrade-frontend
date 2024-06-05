import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable, of} from "rxjs";
import {Listing, Quality} from "../models/listing";
import {ListingView} from "../components/listing-card/listing-card.component";


@Injectable({
  providedIn: 'root'
})
export class ListingService {
  personalListings: ListingView[] = [
    {
      listingId: '1',
      imageKey: 'asd',
      title: 'Asus ROG RTX 4090',
      quality: Quality.NEW,
      price: 9000,
      isNegotiable: false,
      createdAt: new Date().toString(),
      categoryId: 1
    },
    {
      listingId: '2',
      imageKey: 'asd',
      title: 'Mario Kart 8 - Switch',
      quality: Quality.NEW,
      price: 15080,
      isNegotiable: false,
      createdAt: new Date().toString(),
      categoryId: 4
    },
    {
      listingId: '3',
      imageKey: 'asd',
      title: 'Forza Horizon 5 Xbox Series X/S',
      quality: Quality.USED,
      price: 35900,
      isNegotiable: true,
      createdAt: new Date().toString(),
      categoryId: 3
    },
    {
      listingId: '4',
      imageKey: 'asd',
      title: 'Custom made PC',
      quality: Quality.USED,
      price: 989999,
      isNegotiable: true,
      createdAt: new Date().toString(),
      categoryId: 1
    }
  ];

  searchListings: ListingView[] = [
    {
      listingId: '5',
      title: 'MSI B650 Tomahawk WIFI',
      price: 19999,
      isNegotiable: true,
      categoryId: 1,
      quality: Quality.USED,
      imageKey: 'asd',
      createdAt: new Date().toString(),
    },
    {
      listingId: '6',
      title: 'Skyrim Legendary Edition',
      price: 2000,
      isNegotiable: false,
      categoryId: 2,
      quality: Quality.USED,
      imageKey: 'asd',
      createdAt: new Date().toString(),
    },
    {
      listingId: '7',
      title: 'Giblioteca - Gibli Enciclopedia',
      price: 18000,
      isNegotiable: true,
      categoryId: 6,
      quality: Quality.NEW,
      imageKey: 'asd',
      createdAt: new Date().toString(),
    },
    {
      listingId: '8',
      title: 'Zelda: Breath of the Wild',
      price: 2499,
      isNegotiable: false,
      categoryId: 4,
      quality: Quality.USED,
      imageKey: 'asd',
      createdAt: new Date().toString(),
    },
    {
      listingId: '9',
      title: 'PC Repair Services',
      price: 1500,
      isNegotiable: false,
      categoryId: 9,
      quality: Quality.NEW,
      imageKey: 'asd',
      createdAt: new Date().toString(),
    },
    {
      listingId: '1',
      title: 'Asus ROG RTX 4090',
      price: 9000,
      isNegotiable: false,
      categoryId: 1,
      quality: Quality.NEW,
      imageKey: 'asd',
      createdAt: new Date().toString(),
    },
    {
      listingId: '2',
      title: 'Mario Kart 8 - Switch',
      price: 15080,
      isNegotiable: false,
      categoryId: 4,
      quality: Quality.NEW,
      imageKey: 'asd',
      createdAt: new Date().toString(),
    },
    {
      listingId: '3',
      title: 'Forza Horizon 5 Xbox Series X/S',
      price: 35900,
      isNegotiable: true,
      categoryId: 3,
      quality: Quality.USED,
      imageKey: 'asd',
      createdAt: new Date().toString(),
    },
    {
      listingId: '4',
      title: 'Custom made PC',
      price: 989999,
      isNegotiable: true,
      categoryId: 3,
      quality: Quality.USED,
      imageKey: 'asd',
      createdAt: new Date().toString(),
    }
  ]

  allListingDetails: Listing[] = [
    {
      id: 5,
      title: 'MSI B650 Tomahawk WIFI',
      price: 19999,
      isNegotiable: true,
      categoryId: '1',
      categoryName: 'PC Components',
      quality: Quality.USED,
      description: 'Selling a used MSI B650 Tomahawk WIFI motherboard in excellent condition! This reliable and high-performance board is perfect for gamers and PC enthusiasts. Supports AMD Ryzen processors, has built-in Wi-Fi, multiple PCIe slots, and plenty of USB ports for all your peripherals. It’s been well taken care of, and I\'m only selling because I upgraded my system. Comes with the original box and all accessories. A great deal for anyone looking to build or upgrade their PC.',
      imageKeys: ['', '', '', ''],
      createdAt: new Date().toString(),
      seenCount: 1259,
      sellerProfile: {
        name: 'Ionut Sfert',
        phone: '0746455878',
        profileImageKey: '',
        county: 'Bihor',
        city: 'Oradea'
      }
    },
    {
      id: 6,
      title: 'Skyrim Legendary Edition',
      price: 2000,
      isNegotiable: false,
      categoryId: '2',
      categoryName: 'Playstation Games',
      quality: Quality.USED,
      description: 'Selling a used copy of Skyrim Legendary Edition for Playstation 4 (upgradeable to PS5). PRICE IS NON-NEGOTIABLE!!!',
      imageKeys: ['', '', '', ''],
      createdAt: new Date().toString(),
      seenCount: 82,
      sellerProfile: {
        name: 'Cristi Oskt',
        phone: '0784556231',
        profileImageKey: '',
        county: 'Bihor',
        city: 'Alparea'
      }
    },
    {
      id: 7,
      title: 'Giblioteca - Gibli Enciclopedia',
      price: 18000,
      isNegotiable: true,
      categoryId: '6',
      categoryName: 'Books & Guides',
      quality: Quality.NEW,
      description: 'Scopri tutti i film del più grande studio di animazione al mondo: Lo studio Ghibli. Nato dalla penna degli scrittori ed esperti di Studio Ghibli Leader e Cunningham,Ghiblioteca offre un\'affascinante e precisa critica di alcuni dei più grandi film d\'animazione di tutti i tempi, compresi "La città incantata", Il mio vicino Totoro e Principessa Mononoke. ',
      imageKeys: ['', '', '', ''],
      createdAt: new Date().toString(),
      seenCount: 3,
      sellerProfile: {
        name: 'Renata M.',
        phone: '0798556221',
        profileImageKey: '',
        county: 'Cluj',
        city: 'Cluj-Napoca'
      }
    },
    {
      id: 8,
      title: 'Zelda: Breath of the Wild',
      price: 2499,
      isNegotiable: false,
      categoryId: '4',
      categoryName: 'Switch Games',
      quality: Quality.USED,
      description: 'The game comes in it\'s original box. The cartridge is in good condition.',
      imageKeys: ['', '', '', ''],
      createdAt: new Date().toString(),
      seenCount: 975,
      sellerProfile: {
        name: 'Timi Hanosi',
        phone: '0771719548',
        profileImageKey: '',
        county: 'Bihor',
        city: 'Oradea'
      }
    },
    {
      id: 9,
      title: 'PC Repair Services',
      price: 1500,
      isNegotiable: false,
      categoryId: '9',
      categoryName: 'Services',
      quality: Quality.NEW,
      description: 'Get your PC fixed by professionals with more than 10 years experience in PC troubleshooting. Listed price is per hour.',
      imageKeys: ['', '', '', ''],
      createdAt: new Date().toString(),
      seenCount: 20,
      sellerProfile: {
        name: 'PC Repair Shop Rogerius',
        phone: '0359335959',
        profileImageKey: '',
        county: 'Bihor',
        city: 'Talpenii de Munte'
      }
    },
    {
      id: 1,
      title: 'Asus ROG RTX 4090',
      price: 9000,
      isNegotiable: false,
      categoryId: '1',
      categoryName: 'PC Components',
      quality: Quality.NEW,
      description: 'Experience the ultimate in gaming and creative performance with the new ASUS ROG RTX 4090. Engineered with cutting-edge NVIDIA Ampere architecture, this powerhouse graphics card delivers unmatched speed, stunning visuals, and incredible AI capabilities. With 24GB of GDDR6X memory, advanced cooling solutions, and customizable RGB lighting, the ROG RTX 4090 is designed to elevate your gameplay and productivity to the next level. Dominate the latest titles, render complex 3D models, and enjoy seamless multitasking with the best in class. Upgrade to the ASUS ROG RTX 4090 – where performance meets precision.',
      imageKeys: ['', '', '', ''],
      createdAt: new Date().toString(),
      seenCount: 9361,
      sellerProfile: {
        name: 'Andrei Pop',
        phone: '0749225414',
        profileImageKey: '',
        county: 'Constanța',
        city: 'Constanța'
      }
    },
    {
      id: 2,
      title: 'Mario Kart 8 - Switch',
      price: 15080,
      isNegotiable: false,
      categoryId: '4',
      categoryName: 'Switch Games',
      quality: Quality.NEW,
      description: 'Get ready for the ultimate racing adventure with Mario Kart 8 Deluxe on Nintendo Switch! Race your friends or go solo in the most thrilling Mario Kart experience yet. Featuring all-new characters, tracks, and battle modes, plus enhanced graphics and smoother gameplay. Compete online or locally, and enjoy the fun anywhere, anytime with the portability of the Switch. Whether you’re a seasoned racer or a newcomer, Mario Kart 8 Deluxe promises endless excitement and unforgettable fun. Grab your copy today and join the race!',
      imageKeys: ['', '', '', ''],
      createdAt: new Date().toString(),
      seenCount: 318,
      sellerProfile: {
        name: 'Marius V.',
        phone: '0749207743',
        profileImageKey: '',
        county: 'Satu Mare',
        city: 'Carei'
      }
    },
    {
      id: 3,
      title: 'Forza Horizon 5 Xbox Series X/S',
      price: 35900,
      isNegotiable: true,
      categoryId: '3',
      categoryName: 'Xbox Games',
      quality: Quality.USED,
      description: 'Experience the thrill of open-world racing with a used copy of Forza Horizon 5 for Xbox Series X/S. Explore the vibrant landscapes of Mexico, drive hundreds of the world’s greatest cars, and enjoy dynamic seasons that change everything. This pre-owned game is in excellent condition and offers the same high-octane fun at a fraction of the price. Whether you’re racing solo, competing online, or just cruising, Forza Horizon 5 delivers endless excitement and stunning visuals. ',
      imageKeys: ['', '', '', ''],
      createdAt: new Date().toString(),
      seenCount: 870,
      sellerProfile: {
        name: 'Andreea Varga',
        phone: '0359335959',
        profileImageKey: '',
        county: 'Bihor',
        city: 'Derna'
      }
    },
    {
      id: 4,
      title: 'Custom made PC',
      price: 989999,
      isNegotiable: true,
      categoryId: '3',
      categoryName: 'Xbox Games',
      quality: Quality.USED,
      description: 'Unleash your potential with a custom-built PC designed to meet your exact needs. This high-performance machine features the latest Intel i9 processor, NVIDIA RTX 3080 graphics card, 32GB of DDR4 RAM, and a 1TB NVMe SSD for lightning-fast load times. Perfect for gaming, content creation, and heavy multitasking, this custom PC combines power and aesthetics with a sleek RGB-lit case and advanced cooling system. Built with premium components and expert craftsmanship, it\'s ready to handle anything you throw at it. Elevate your computing experience with this custom-made powerhouse.',
      imageKeys: ['', '', '', ''],
      createdAt: new Date().toString(),
      seenCount: 3196,
      sellerProfile: {
        name: 'Razvan Popescu',
        phone: '0771719848',
        profileImageKey: '',
        county: 'Bacau',
        city: 'Targu Ocna'
      }
    },
    {
      id: 10,
      title: 'It takes two playstation 4',
      price: 1500,
      isNegotiable: true,
      categoryId: '2',
      categoryName: 'Playstation Games',
      quality: Quality.USED,
      description: 'Experience the award-winning adventure game "It Takes Two" on PS4! Perfect for cooperative play, this game offers a unique story and engaging puzzles. Friends can join online co-op for free. Includes PS5 upgrade.',
      imageKeys: ['', '', '', ''],
      createdAt: new Date().toString(),
      seenCount: 1,
      sellerProfile: {
        name: 'Timi Gherle',
        phone: '0771719549',
        profileImageKey: '',
        county: 'Bihor',
        city: 'Oradea'
      }
    }
  ];

  constructor(
    private http: HttpClient
  ) {
  }

  createListing(dto: CreateListingDto): Observable<string> {
    const listing: ListingView = {
      title: dto.title,
      price: dto.price * 100,
      isNegotiable: dto.isNegotiable,
      quality: dto.quality,
      listingId: '10',
      imageKey: 'asd',
      createdAt: new Date().toString(),
      categoryId: +dto.category
    }

    this.personalListings.push(listing);
    return EMPTY;
    // return this.http.post<string>('/api/listings', dto);
  }

  addImageToListing(dto: any, listingId: string): Observable<any> {
    return this.http.post(`/api/listings/${listingId}/images`, dto);
  }

  getListing(listingId: string): Observable<Listing> {
    return of(this.allListingDetails.find(listing => listing.id === parseInt(listingId, 10))!);

    // const headers = new HttpHeaders().set('noSpinner', 'true');
    //
    // return this.http.get<Listing>(`/api/listings/${listingId}`, {headers});
  }

  getPersonalListings(): Observable<PersonalListings> {
    // return this.http.get<PersonalListings>('/api/listings');

    return of(<PersonalListings>{
      content: this.personalListings,
      pageable: {
        sort: {
          empty: true,
          unsorted: true,
          sorted: false
        },
        offset: 0,
        pageSize: 1000,
        pageNumber: 0,
        unpaged: false,
        paged: true
      },
      last: true,
      totalPages: 1,
      totalElements: 80,
      first: true,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false
      },
      size: 1000,
      number: 0,
      numberOfElements: 80,
      empty: false
    });
  }

  getListings(): Observable<PersonalListings> {
    return of(<PersonalListings>{
      content: this.searchListings,
      pageable: {
        sort: {
          empty: true,
          unsorted: true,
          sorted: false
        },
        offset: 0,
        pageSize: 1000,
        pageNumber: 0,
        unpaged: false,
        paged: true
      },
      last: true,
      totalPages: 1,
      totalElements: 80,
      first: true,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false
      },
      size: 1000,
      number: 0,
      numberOfElements: 80,
      empty: false
    });
  }
}

export type CreateListingDto = {
  title: string;
  price: number;
  isNegotiable: boolean;
  category: string;
  quality: Quality;
  description: string;
}

export type PersonalListings = {
  content: ListingView[];
  pageable: Pageable;
  sort: Sort;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export type Sort = {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export type Pageable = {
  sort: Sort;
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
  offset: number;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
}
