import { Component, EventEmitter, Input, Output } from '@angular/core';
import { movieObject } from 'src/app/@types/movie-object-type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() movies: movieObject[] = [];
  @Output() excludeMovie = new EventEmitter<movieObject>();

  markToExclude(movie: movieObject) {
    this.excludeMovie.emit(movie);
  }
}
