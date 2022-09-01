import { should } from 'chai';
import { initial } from 'cypress/types/lodash';

describe('sales representative', () => {
	before(() => {
		cy.login();
		cy.visit('/');
		cy.contains('Manage Users').click();
		cy.contains('Sales Representatives').click();
	});

	beforeEach(() => {
		cy.setBasixsSessionCookie();
	});

	it('BSX-TC-5580 To verify the main header from sales rep card listing page', () => {
		cy.get('#header-label').contains('Sales Representatives ');
		cy.get('.profile__image--circle').should('be.visible');
		cy.get('.dropdown__profile')
			.click()
			.wait(2000)
			.click();
	});

	it('BSX-TC-5581	To verify the sub-header section from sales rep card listing page', () => {
		cy.get('#add-sales-representative-btn')
			.click()
			.wait(3000);
		cy.go('back');
		cy.get('#sort-dropdown').click();
		cy.get('#sort-by-sales-rep').contains('Sales rep. Name');
		cy.get('bsx-dropdown-item[id="sort-dropdown-items"]')
			.eq(0)
			.click();
		cy.wait(3000);
		cy.get('.subheader__search-button')
			.click()
			.type('abcd');
		cy.wait(4000);
		cy.get('.subheader__search-button').clear();
		cy.wait(5000);
		cy.get('.subheader').click();
	});

	it('BSX-TC-5586 To verify that user can click on analytics section after selecting the sales rep from the card view.', () => {
		cy.get('#user')
			.eq(0)
			.click();
		cy.get('#sales-rep-tab-analytics').contains('Analytics');
		cy.get('#analytics-tittle').contains('Analytics');
		cy.get('#analytics-title-date').contains('Cycle Period: ');
		cy.get('#analytics-title-period').should('not.to.match', ':empty');

		cy.get('#analytics-detail-calls').contains('Number of Total Calls');
		cy.get('#analytics-details-figure-calls').should(
			'not.to.match',
			':empty'
		);

		cy.get('#analytics-detail-talktime').contains('Talktime(Hrs)');
		cy.get('#analytics-details-figure-talktime').should(
			'not.to.match',
			':empty'
		);

		cy.get('#analytics-details-sale').contains('Sales Discovery');
		cy.get('#analytics-details-figure-sales').should(
			'not.to.match',
			':empty'
		);

		cy.get('#sales-pipeline-title').contains('Sales Pipeline');
		cy.get('#sales-pipeline-details').should('not.to.match', ':empty');
	});

	it('BSX-TC-5589 To verify user can see cycle period tooltip message as "List of campaign with cycle period:1.campaign name(date)" from analytics.', () => {
		cy.get('#analytics-title-period')
			.eq(0)
			.invoke('show')
			.trigger('mouseenter')
			.wait(1000)
			.should(
				'have.attr',
				'bsxTooltip',
				'List of campaigns with cycle period : 1. Alpha Equity Fund (Jun 15 - Aug 15)'
			)
			.trigger('mouseleave');
	});

	it('BSX-TC-5583 To verify user can see talktime tooltip message as "Total call duration of incoming, outgoing and voice drop".', () => {
		cy.get('#analytics-talktime')
			.eq(0)
			.invoke('show')
			.trigger('mouseenter')
			.wait(1000)
			.should(
				'have.attr',
				'bsxTooltip',
				'Total call duration of incoming,outgoing and voicemail drop'
			)
			.trigger('mouseleave');
	});

	it('BSX-TC-5582	To verify user can see total calls tooltip message as "Total incoming and outgoing call"', () => {
		cy.get('#analytics-total-calls')
			.eq(0)
			.invoke('show')
			.trigger('mouseenter')
			.wait(1000)
			.should(
				'have.attr',
				'bsxTooltip',
				'Total incoming and outgoing calls'
			)
			.trigger('mouseleave');
	});

	it('BSX-TC-5584	To verify user can see sales discovery tooltip message as "Its the sum of positive wrap ups and inbound divided by the total number of sections per day".', () => {
		cy.get('#analytics-sales-discovery')
			.eq(0)
			.invoke('show')
			.trigger('mouseenter')
			.wait(1000)
			.should(
				'have.attr',
				'bsxTooltip',
				'It is the sum of positive wrap-ups and inbound divided by the total number of sections per day'
			)
			.trigger('mouseleave');
	});

	it('BSX-TC-5585 To verify user can see sales pipeline tooltip message as "These is a representation of where all your prospects (accounts and contacts) are in the sales process".', () => {
		cy.get('#analytics-sales-pipeline')
			.eq(0)
			.invoke('show')
			.trigger('mouseenter')
			.wait(1000)
			.should(
				'have.attr',
				'bsxTooltip',
				'This is a representation of where all your prospects ( accounts or contacts ) are in the sales process'
			)
			.trigger('mouseleave');
	});

	it('BSX-TC-5588 To verify all campaigns drop down from analytics.', () => {
		cy.get('#analytics-campaign-dropdown').click();
		cy.get('bsx-dropdown-item[id="campaign-dropdown-items"]')
			.eq(1)
			.click();
	});

	it('BSX-TC-5590 To verify UI of meeting card from meeting tab.', () => {
		cy.get('#sales-rep-tab-meetings').click();
		cy.get('#meeting-dashboard').should('not.to.match', ':empty');
	});

	it('BSX-TC-5587 To verify that user can click on meetings section after selecting the sales rep from the card view.', () => {
		cy.get('#meeting-header').contains('Upcoming Meetings');
		cy.get('#meeting-dashboard').should('not.to.match', ':empty');
		cy.get('#meeting-title').should('not.to.match', ':empty');
		cy.get('#meeting-campaign')
			.find('span')
			.should('not.to.match', ':empty');
		cy.get('#meeting-time')
			.find('span')
			.should('not.to.match', ':empty');
		cy.get('#meeting-location').should('not.to.match', ':empty');
		cy.get('#meeting-guests').should('not.to.match', ':empty');
		cy.go('back');
		cy.wait(5000);
	});

	it('BSX-TC-5578	To verify that user can click on sales rep cards from the listing page.', () => {
		cy.get('.sales-user')
			.eq(9)
			.click();
		cy.get('#sales-rep-tab-analytics').contains('Analytics');
		cy.get('#sales-rep-tab-meetings').contains('Meetings');
		cy.get('#sales-rep-tab-campaigns').contains('Campaigns');
		cy.get('#sales-rep-tab-user-details').contains('User Details');

		cy.get('bsx-tab')
			.should('have.attr', 'ng-reflect-active', 'true')
			.within(() => {
				cy.get('div')
					.find('div')
					.contains('Analytics');
			});
	});

	it('BSX-TC-5577	To verify that user can click on user details section after selecting the sales rep from the card view', () => {
		const basicInformation = [
			'First Name',
			'Last Name',
			'Email id',
			'Phone Number',
			'Country',
			'Designation',
			'Language Spoken',
			'Time Zone',
			' Sales Managers'
		];
		cy.get('.user-details__header').contains('Basic Information');

		cy.get('#sales-rep-tab-user-details').click();
		cy.contains('First Name').should('have.text', basicInformation[0]);
		cy.contains('Last Name').should('have.text', basicInformation[1]);
		cy.contains('Email').should('have.text', basicInformation[2]);
		cy.contains('Phone Number').should('have.text', basicInformation[3]);
		cy.contains('Country').should('have.text', basicInformation[4]);
		cy.contains('Designation').should('have.text', basicInformation[5]);
		cy.contains('Language Spoken').should('have.text', basicInformation[6]);
		cy.contains('Time Zone').should('have.text', basicInformation[7]);
		cy.contains('Sales Manager').should('have.text', basicInformation[8]);
	});

	it('BSX-TC-5576 To verify that user can click on OK button from the can not remove sales rep pop up.', () => {
		cy.get('#user-details-remove-btn').click();
		cy.get('.cdk-overlay-container')
			.find('h3')
			.should('have.text', 'Can’t Remove Sales Representative');
		cy.get(
			'.dialog__action-btn > .button__overlay-container > .button__overlay'
		).click();
		cy.get('#user-details').should('be.visible');
		cy.go('back');
		cy.wait(5000);
	});

	it('BSX-TC-5579	To verify that user can click on cancel button from the remove confirmation pop up.', () => {
		cy.get('.sales-user')
			.eq(5)
			.click();
		cy.get('#sales-rep-tab-user-details').click();
		cy.get('#user-details-remove-btn').click();
		cy.get(
			'.dialog__buttons > .button--secondary > .button__overlay-container > .button__overlay'
		).click();
		cy.get('#user-details').should('be.visible');
		cy.go('back');
		cy.wait(5000);
	});

	it('BSX-TC-5575 To verify that user can click on remove button from the user details section.', () => {
		cy.get('.sales-user')
			.eq(0)
			.click();
		cy.get('#sales-rep-tab-user-details').click();
		cy.get('#user-details-remove-btn').click();
		cy.get('.dialog__body > .ng-star-inserted').contains(
			"You cannot remove 'Aafaque1111 Agents 111' as he/she is assigned to ongoing or upcoming campaigns."
		);
		cy.get(
			'.dialog__action-btn > .button__overlay-container > .button__overlay'
		).click();
		cy.go('back');
		cy.wait(5000);
	});

	it('BSX-TC-5565 To verify basic information label from user details tab.', () => {
		cy.get('.sales-user')
			.eq(7)
			.click();
		cy.get('#sales-rep-tab-user-details').click();
		cy.get('.user-details__header').contains('Basic Information');

		const basicInformation = [
			'First Name',
			'Last Name',
			'Email id',
			'Phone Number',
			'Country',
			'Designation',
			'Language Spoken',
			'Time Zone',
			' Sales Managers'
		];
		cy.get('.user-details__header').contains('Basic Information');

		cy.get('#sales-rep-tab-user-details').click();
		cy.contains('First Name').should('have.text', basicInformation[0]);
		cy.contains('Last Name').should('have.text', basicInformation[1]);
		cy.contains('Email').should('have.text', basicInformation[2]);
		cy.contains('Phone Number').should('have.text', basicInformation[3]);
		cy.contains('Country').should('have.text', basicInformation[4]);
		cy.contains('Designation').should('have.text', basicInformation[5]);
		cy.contains('Language Spoken').should('have.text', basicInformation[6]);
		cy.contains('Time Zone').should('have.text', basicInformation[7]);
		cy.contains('Sales Manager').should('have.text', basicInformation[8]);

		cy.go('back');
		cy.wait(5000);
	});

	it('BSX-TC-5562	To verify back arrow icon from sales representative dashboard.',()=>{
		cy.get('.sales-user').eq(2).click();
		cy.get('.header__icon > svg').click();
		cy.get('#user').should('not.to.match',':empty');
	});

	it('BSX-TC-5570 To verify that admin can see all completed campaign of sales user from campaigns.',()=>{
			cy.get('.sales-user')
			.eq(3)
			.click();
			cy.get('#sales-rep-tab-campaigns').click();
			cy.get('#sales-rep-campaign-completed').click();
			cy.get('.sales-rep-campaign-name').should('not.to.match',':empty');
			cy.get('.sales-rep-campaign-database').should('not.to.match',':empty');
			cy.get('.sales-rep-campaign-date').contains('Completed on')
			cy.go('back');
			cy.wait(5000);
	});

	it('BSX-TC-5569 To verify that admin can see all ongoing campaign of sales user from campaigns.',()=>{
		cy.get('.sales-user')
		.eq(3)
		.click();
		cy.get('#sales-rep-tab-campaigns').click();
		cy.get('#sales-rep-campaign-ongoing').click();
		cy.get('.sales-rep-campaign-name').should('not.to.match',':empty');
		cy.get('.sales-rep-campaign-database').should('not.to.match',':empty');
		cy.go('back');
		cy.wait(5000);
	});

	it('BSX-TC-5568	To verify that admin can see all upcoming campaign of sales user from campaigns.',()=>{
		cy.get('.sales-user')
		.eq(3)
		.click();
		cy.get('#sales-rep-tab-campaigns').click();
		cy.get('#sales-rep-campaign-upcoming').click();
		cy.get('.sales-rep-campaign-name').should('not.to.match',':empty');
		cy.get('.sales-rep-campaign-database').should('not.to.match',':empty');
		cy.get('.sales-rep-campaign-date').contains('Starts on')
		cy.go('back');
		cy.wait(5000);
	});



	// it('check sorting works or not',()=>{
	// 	cy.get('#sort-dropdown').click();
	// 	cy.get('#sort-by-sales-rep').contains('Sales rep. Name');
	// 	cy.get('bsx-dropdown-item[id="sort-dropdown-items"]').eq(0).click();

	// 	cy.get('.sales-user').eq(0).then((salesRep)=>{
	// 		console.log(salesRep.text());
	// 		var initial = salesRep.text()[0];
	// 		console.log(initial);
	// 		expect(initial).to.eql('A');
	// 	})

	// });
});
