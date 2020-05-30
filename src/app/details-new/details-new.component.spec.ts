import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNewComponent } from './details-new.component';

describe('DetailsNewComponent', () => {
  let component: DetailsNewComponent;
  let fixture: ComponentFixture<DetailsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
