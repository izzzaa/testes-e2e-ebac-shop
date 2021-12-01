/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/my-account/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //fazendo login usando fixture
        cy.fixture('perfil').then(dados => {

            cy.get('#username').type(dados.usuario) // pegando o campo de username do site e incluindo dados nele.
            cy.get('#password').type(dados.senha, {log:false}) // pegando o campo de senha do site e incluindo dados nele.
            cy.get('.woocommerce-form > .button').click() //mapeado o botão de login, comando para clicar no botão.
        
            cy.get('#primary-menu > .menu-item-629 > a').click()
            cy.addProdutos('Abominable Hoodie', 'S', 'Green' ,1) //adicionando produtos ao carrinho usando comando customizado
            cy.get('.woocommerce-message > .button').click() //acessando carrinho de compras
            cy.get('.checkout-button').click() //finalizando compra
            cy.get('#terms').click() //aceitando os termos de condicoes
            cy.get('#order_comments').type('Embalar para presente') //incluindo uma observação ao pedido
            cy.get('#place_order').click() //finalizando compra

            cy.get('.woocommerce-notice').should('contain' , 'Obrigado. Seu pedido foi recebido.')
        
        })


    });


});