/* eslint-disable linebreak-style */
describe('Audio Player', () => {
  it('plays audio', () => {
    cy.visit('/');
    cy.get('.composition-name:first').click();
    cy.get('#play-botton').click();
    cy.wait(5000);
    cy.get('#player-botton').click();
  });
});
