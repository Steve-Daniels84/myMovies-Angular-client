import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListViewComponent } from './movie-list-view.component';

describe('MovieListViewComponent', () => {
  let component: MovieListViewComponent;
  let fixture: ComponentFixture<MovieListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
