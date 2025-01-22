import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDalogComponent } from './movie-dalog.component';

describe('MovieDalogComponent', () => {
  let component: MovieDalogComponent;
  let fixture: ComponentFixture<MovieDalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
