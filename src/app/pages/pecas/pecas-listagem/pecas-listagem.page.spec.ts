import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PecasListagemPage } from './pecas-listagem.page';

describe('PecasListagemPage', () => {
  let component: PecasListagemPage;
  let fixture: ComponentFixture<PecasListagemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PecasListagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
