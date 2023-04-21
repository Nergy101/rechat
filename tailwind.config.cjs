/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors.js');
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			gray: colors.gray,
			black: colors.black,
			white: colors.white,
			danger: colors.rose,
			info: colors.sky,
			warning: colors.amber,
			success: colors.teal,
			primary: colors.orange,
			secondary: colors.violet,
			tertiary: colors.rose
		},
		extend: {}
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class'
		})
	]
};
