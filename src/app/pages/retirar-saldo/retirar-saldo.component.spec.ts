import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarSaldoComponent } from './retirar-saldo.component';

describe('RetirarSaldoComponent', () => {
  let component: RetirarSaldoComponent;
  let fixture: ComponentFixture<RetirarSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirarSaldoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetirarSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
