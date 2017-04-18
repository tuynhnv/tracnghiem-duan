/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GradePageComponent } from './grade-page.component';

describe('GradePageComponent', () => {
  let component: GradePageComponent;
  let fixture: ComponentFixture<GradePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
