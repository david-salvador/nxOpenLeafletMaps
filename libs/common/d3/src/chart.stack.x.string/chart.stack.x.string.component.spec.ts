import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStackXStringComponent } from './chart.stack.x.string.component';

describe('ChartStackXStringComponent', () => {
  let component: ChartStackXStringComponent;
  let fixture: ComponentFixture<ChartStackXStringComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ChartStackXStringComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStackXStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
