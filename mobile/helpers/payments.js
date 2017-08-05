import CardValidate from 'card';

const api_key = "pk_tNwMXzVs2OA7T6zHiVBacA";

class CreditCard {

	getToken() {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'expiry_month'
		},
	}

	/* @param company : string - the credit card company
	 * @param cardNumber : string - the user's credit card number
	 * @param expiryMonth : string - two digit expiry month
	 * @param expiryYear : stirng - two digit year the card expires/d
	 * @param securityNumber : string - 3 digit security number
	 */
	constructor(company, cardNumber, expiryMonth, expiryYear, securityNumber) {
		let card = cardvalidate(cardNumber);
		if (!card.isValid) {
			throw 'invalid card number';
		}
		if (card.getType() !== company) {
			throw 'bad company';
		}
		this.company = company;
		this.cardNumber = cardNumber;
		if (!expiryMonth) {
			throw 'no expiry month';
		}
		this.expiryMonth = expiryMonth;
		if (!expiryYear) {
			throw 'no expiry year';
		}
		this.expiryYear = expiryYear;
		if (!securityNumber) {
			throw 'no security number';
		}
		this.securityNumber = securityNumber;
	}
}

class orderHandler {
	constructor(creditCard, ) {

	}
}

export default {
	paymentHandler,

	CreditCard
}
