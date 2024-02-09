import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { OmdbApiServiceService } from 'src/app/services/omdb-api-service.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm : FormGroup;
  myControl =new FormControl;
  homeListResult : any=[];
  searchResult : any=[];
  formSubmited : boolean = false;
  page = 1;
  options : any = [];
  filteredOptions: Observable<any[]>;

  constructor(private service : OmdbApiServiceService, private formBuilder : FormBuilder, private dialog: MatDialog) { 
    this.searchForm = this.formBuilder.group({
      movieName: this.myControl,
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       }) 
    )
  }

  filter(val: string): Observable<any[]> {

    return this.service.getData()
     .pipe(
       map(response => response.filter(option => { 
         return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   }  


  ngOnInit(): void {
    
  }

  
  searchMovie(){
    this.service.getSearchMovie(this.searchForm.value).subscribe((result)=>{
      this.searchResult = result.Search;
      this.formSubmited = true;
    })
  }

  loadMoreMovies() {
    if (this.formSubmited) {
      this.page++;
      this.service.getSearchMovie({
        movieName: this.searchForm.value.movieName,
        page: this.page,
      }).subscribe((result) => {
        this.searchResult = this.searchResult.concat(result.Search);
      });
    }
  }

  openMovieDetailDialog(imdbID: string) {
    this.service.getMovieDetail(imdbID).subscribe((result) => {
      this.dialog.open(ModalComponent, {
        data: { movieDetail: result },
      });
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    ) {
      this.loadMoreMovies();
    }
  }


}
