import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameList } from './nameList.component';

describe('NameListComponent', () => {
    let component: NameList;
    let fixture: ComponentFixture<NameList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [NameList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(NameList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
