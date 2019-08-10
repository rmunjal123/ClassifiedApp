import { Component, OnInit } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service'
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { ListingService } from '../services/listing.service';
import { IfStmt, identifierModuleUrl } from '@angular/compiler';
import { AppError } from '../services/common/app-error';
import { BadInput } from '../services/common/bad-input';
import { NotFoundError } from '../services/common/not-found-error';
import { forEach } from '@angular/router/src/utils/collection';
import { ListingdetailsService } from '../services/listingdetails.service';
import { SellerdetailsService } from '../services/sellerdetails.service';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

listings : any;
categories = [];
data = [];
renderedcategory:any;
arr = [];
imgforID = [];

sliderConfig = {
spaceBetween: 0,
centeredSlides: false,
slidesPerView:2.4
  }
constructor(private getcategoriesService:GetcategoriesService , private router:Router,private newlistings:ListingService,
  private listingdetails: ListingdetailsService,private sellerdetails: SellerdetailsService){}

  ngOnInit(){
//this.listings[10] = this.newlistings.getlisting();
//this.categories = this.getcategoriesService.getCategories();
//console.log(this.categories);

    this.newlistings.getAll()
    .subscribe(response => { 
      this.listings = response;
      console.log(this.listings);
      this.arr = this.listings.latest_pictures;
      // if (this.arr.post_type_id === "2") {
      //   var post_type = "Used";
      // } else {
      //   var post_type = "New";
      // }
      //this.listings.letest_ads.forEach(id => {
        this.imgforID = this.arr.filter(
          arr => arr.id === this.listings.letest_ads.id);
          console.log(this.imgforID);
      });
      //});
      
  }
    
  

    //createListing(input:HTMLImputElement){
    //   let listing = { title: input.value};
    //   input.value = '';
  
    //   this.newlistings.create(listing)
    //   .subscribe(
    //     response => {
    //       listing['id'] = response.id;
    //       this.listings.splice(0,0, listing);
    //     },
    //     (Error: AppError) => {
    //       if (Error instanceof BadInput) {
    //         //this.form.setErrors(error.originalError)
    //       }
    //       else throw Error;
    //     });
    //     }
        updateListing(listing){
          this.newlistings.update(listing)
          .subscribe(
            response => {
              console.log(response);
            });
            }
            deleteListing(listing) {
              this.newlistings.delete(listing)
              .subscribe(
                response => {
                  let index = this.listings.indexOf(listing);
                  this.listings.splice(index,1);
                },
                (Error: AppError) => {
                  if (Error instanceof NotFoundError)
                  alert('This post has already been deleted')
                }
              )
            }
    // this.newlistings.create()
    //   .subscribe(response => { 
    //     this.listings = response;
    //     console.log(this.listings);
    //   });
      
    onGoToCategoryPage(cat){
      this.getcategoriesService.currentcategory = cat;
      this.router.navigate(['/categories']);
  }

    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    slideOpts = {
      initialSlide: 1,
      speed: 400
    }
    loadData(event){
    console.log(event);
    setTimeout(() => {
    console.log('Done');
    event.target.complete();
  
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length == 1000) {
        event.target.disabled = true;
      }
    }, 5000);
  }
  onGoToListingDetail(listing){
    this.listingdetails.id = listing;
    this.sellerdetails.id = listing;
    console.log(listing);
    this.router.navigate(['/addetails']);
  }
  listingpicsarray(listings){
    for(this.listings.letest_ads.id in this.listings) {
      let arr = JSON.parse(this.listings.letest_ads.filename);
      let pics = [];
      for (let img of arr) {
        pics.push({ id: this.listings.letest_ads.id, path: this.listings.letest_ads.filename });
      }
      console.log(pics);
  }
  }
  picture_array(){
    this.listings.letest_ads.forEach(id => {
      console.log()
    });
  }
}
