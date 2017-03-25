import { MoneyLayersPage } from './app.po';

describe('money-layers App', () => {
  let page: MoneyLayersPage;

  beforeEach(() => {
    page = new MoneyLayersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
