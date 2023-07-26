import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { movieWatched } from 'src/app/@types/movie-watched-type';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.css']
})
export class RateModalComponent implements OnInit {
  @Output() rateSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<movieWatched> = new EventEmitter<movieWatched>();

  ratingForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.ratingForm = this.formBuilder.group({
      watched: [true],
      rating: [null],
      comment: ['', Validators.required, , Validators.maxLength(200)]
    });
  }

  submitRating() {
    if (this.ratingForm.valid) {
      const formData = this.ratingForm.value;
      formData.rating = formData.rating === true ? 'liked' : 'disliked';

      console.log(formData)
      this.rateSubmitted.emit(formData);
    }
  }

  close() {
    this.closeModal.emit()
  }
}
