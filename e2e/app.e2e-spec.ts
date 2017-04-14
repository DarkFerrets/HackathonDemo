import { HackathonDemoPage } from './app.po';

describe('hackathon-demo App', () => {
  let page: HackathonDemoPage;

  beforeEach(() => {
    page = new HackathonDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
