import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosDePrivacidadeComponent } from './termos-de-privacidade.component';

describe('TermosDePrivacidadeComponent', () => {
  let component: TermosDePrivacidadeComponent;
  let fixture: ComponentFixture<TermosDePrivacidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermosDePrivacidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermosDePrivacidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
