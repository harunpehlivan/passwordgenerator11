/**
 * Password generator script by Hakan Havutcuoglu 
 * http://www.havutcuoglu.com/ or http://www.havutcuoglu.de/
 * This notice MUST stay intact in JS files and SCRIPT tags for free and legal usege.
 * the Clipboard.js is required for copying password in clipboard
 */

var cbNumbers = $('input[name="numbers"]'),
	cbSigns = $('input[name="signs"]'),
	cbBgLetters = $('input[name="bigLetters"]'),
	cbSplit = $('input[name="split"]'),
	pwField = $('input[name="pwLength"]'),
	pwValueDefault = 12, // default
	pwValue = $('input[name="pwLength"]').val(),
	num = false,
	sig = false,
	bigLet = false,
	// Available charachters for password
	numbers = 0123456789,
	smallLetters = 'abcdefghijklmnopqrstuvwxyz',
	bigLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	signs = '^!$%&|[](){}:;.,*+-#@<>~',
	// signs = '!$%:;.,*+-#/',
	pwStr = smallLetters; // default characters for password
	
	

function checkFields() {

	// Get and Set length of password
	pwField.focusout(function() {
		if($(this).val() == '' || $(this).val() <= 8) {
			pwValue = pwValueDefault;
			$(this).val(pwValue);
		}
		else {
			pwValue = $(this).val();
		}
	});
	
	// Numbers
	if(cbNumbers.prop('checked', true)) {
		num = true;
	}
	cbNumbers.change(function(){
		if(cbNumbers.is(':checked')) {
			num = true;
		}
		else {
			num = false;
		}
		// console.log('num:'+num+' sig:'+sig+' bigLet:'+bigLet);
	});
	
	// Signs
	if(cbSigns.prop('checked', true)) {
		sig = true;
	}
	cbSigns.change(function(){
		if(cbSigns.is(':checked')) {
			sig = true;
		}
		else {
			sig = false;
		}
		// console.log('num:'+num+' sig:'+sig+' bigLet:'+bigLet);
	});
	
	// BIG Letters
	if(cbBgLetters.prop('checked', true)) {
		bigLet = true;
	}
	cbBgLetters.change(function(){
		if(cbBgLetters.is(':checked')) {
			bigLet = true;
		}
		else {
			bigLet = false;
		}
		// console.log('num:'+num+' sig:'+sig+' bigLet:'+bigLet);
	});
}

function generatePWString() {
	// no one checked than set default
	if(num == false && sig == false && bigLet == false) {
		pwStr = smallLetters;
	}
	// all checked
	if(num == true && sig == true && bigLet == true) {
		pwStr = smallLetters+numbers+signs+bigLetters;
	}
	// only numbers checked
	if(num == true && sig == false && bigLet == true) {
		pwStr = smallLetters+numbers+bigLetters;
	}
	// only signs checked
	if(num == false && sig == true && bigLet == false) {
		pwStr = smallLetters+signs;
	}
	// only bigLetters checked
	if(num == false && sig == false && bigLet == true) {
		pwStr = smallLetters+bigLetters;
	}
	// numbers + signs checked
	if(num == true && sig == true && bigLet == false) {
		pwStr = smallLetters+numbers+signs;
	}
	// numbers + bigLetters checked
	if(num == true && sig == false && bigLet == false) {
		pwStr = smallLetters+numbers;
	}
	// signs + bigLetters checked
	if(num == false && sig == true && bigLet == true) {
		pwStr = smallLetters+numbers+bigLetters;
	}
	
	return pwStr;
}

function generatePW(length) {
	var password = '';
	var characters = pwStr;
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		password += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return password;
}

$(document).ready(function(){
	new ClipboardJS('.copy');
	
	// generate password by document ready
	checkFields();
	generatePWString();
	$('.output').text(generatePW(pwValue));

	// change password by submit
	$('input[type="submit"]').click(function(e){
		e.preventDefault();
		generatePWString();
		if(cbSplit.is(':checked')) {
			$('.output').text(generatePW(pwValue).match(/.{1,4}/g).join('-'));
		}
		else {
			$('.output').text(generatePW(pwValue));
		}
		// console.log('PWStr:'+generatePWString());
		// console.log('PW:'+generatePW(pwValue));
	});
	// console.log('PW:'+generatePW(pwValue));
});