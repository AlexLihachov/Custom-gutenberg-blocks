/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	const activate = (elem) => elem.classList.add('active')
	const deactivate = (elem) => elem.classList.remove('active')

	const show = (elem) => elem.classList.add('visible')
	const hide = (elem) => elem.classList.remove('visible')

	document.querySelectorAll('[data-activate-id]').forEach((elem, i, elems) => {

		const targets = document.querySelectorAll('[data-id]')

		elem.onclick = (e) => {

			const id = elem.getAttribute('data-activate-id')
			const target = document.querySelector(`[data-id='${ id }']`)

			elems.forEach(deactivate)
			targets.forEach(hide)

			activate(elem)
			show(target)

		}

	})

	let tabs_content = jQuery(".tabs__content.tabs__content_0").find(".rri-main-block");
	jQuery(tabs_content[1]).appendTo(jQuery('.tabs__content.tabs__content_1'));
	jQuery(tabs_content[2]).appendTo(jQuery('.tabs__content.tabs__content_2'));
	jQuery(tabs_content[3]).appendTo(jQuery('.tabs__content.tabs__content_3'));
	jQuery(tabs_content[4]).appendTo(jQuery('.tabs__content.tabs__content_4'));
});
