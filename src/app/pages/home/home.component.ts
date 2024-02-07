import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OmdbApiServiceService } from 'src/app/services/omdb-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm : FormGroup;
  homeListResult : any=[];
  searchResult : any=[];
  formSubmited : boolean = false;
  page = 1;

  constructor(private service : OmdbApiServiceService, private formBuilder : FormBuilder) { 
    this.searchForm = this.formBuilder.group({
      movieName: [''],
    });
  }


  ngOnInit(): void {
    this.getHomeList()
  }

  getHomeList(){
    this.service.getListHome().subscribe((result)=>{
      this.homeListResult = result.Search;
    })
  }

  

  searchMovie(){
    this.service.getSearchMovie(this.searchForm.value).subscribe((result)=>{
      this.searchResult = result.Search;
      this.formSubmited = true;
      console.log(this.searchResult);
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

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    ) {
      this.loadMoreMovies();
    }
  }


}
