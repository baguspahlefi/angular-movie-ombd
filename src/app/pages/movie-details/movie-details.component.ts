import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OmdbApiServiceService } from 'src/app/services/omdb-api-service.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {


  getMovieDetail : any;
  isLoading : boolean = true;

  constructor(private service : OmdbApiServiceService, private router : ActivatedRoute,private dialog: MatDialog ) { }

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

  openMovieDetailDialog(imdbID: string) {
    this.service.getMovieDetail(imdbID).subscribe((result) => {
      this.dialog.open(ModalComponent, {
        data: { movieDetail: result },
      });
    });
  }

}
