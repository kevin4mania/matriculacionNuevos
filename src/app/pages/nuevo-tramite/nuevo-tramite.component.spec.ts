import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTramiteComponent } from './nuevo-tramite.component';

describe('NuevoTramiteComponent', () => {
  let component: NuevoTramiteComponent;
  let fixture: ComponentFixture<NuevoTramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoTramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
