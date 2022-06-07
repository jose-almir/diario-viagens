import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioDeleteComponent } from './diario-delete.component';

describe('DiarioDeleteComponent', () => {
  let component: DiarioDeleteComponent;
  let fixture: ComponentFixture<DiarioDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiarioDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
