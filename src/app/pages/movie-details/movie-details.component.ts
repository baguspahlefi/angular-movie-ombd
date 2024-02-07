import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OmdbApiServiceService } from 'src/app/services/omdb-api-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  getMovieDetail : any;
  isLoading : boolean = true;

  constructor(private service : OmdbApiServiceService, private router : ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const imdbID = params['id'];
      this.service.getMovieDetail(imdbID).subscribe(
        (result) => {
          this.getMovieDetail = result;
        },
        (error) => console.error(error),
        () => {
          this.isLoading = false;
        }
      );
    });
  }

  getMovie(id:any){
    this.service.getMovieDetail(id).subscribe((result)=>{
      this.getMovieDetail = result;
    })
  }

}
