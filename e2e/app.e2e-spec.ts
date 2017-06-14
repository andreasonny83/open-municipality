import { OpenMunicipality2Page } from './app.po';

describe('open-municipality2 App', () => {
  let page: OpenMunicipality2Page;

  beforeEach(() => {
    page = new OpenMunicipality2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
