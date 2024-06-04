import { Injectable } from '@angular/core';
import {Listing} from "../models/listing";

@Injectable({
  providedIn: 'root'
})
export class MockService {
personalListings: Listing[] = [

]
  constructor() { }


}
