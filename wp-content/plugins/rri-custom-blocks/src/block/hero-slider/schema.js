export const schema = {
	slides_data: {
		type: 'array',
		default: [
			{
				title: 'Lorem et dolor ipsum',
				copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit aenean vehicula lacus sit amet fringilla.',
				image: {
					url: `${window.rriData.srcUrl}/src/block/hero-slider/images/hero-slider-placeholder-1.png`,
					id: ''
				},
				params: {
					align: 'left'
				},
				button: {
					url: '',
					newTab: false,
					noFollow: false,
					text: 'Buy now',
					design: 'primary',
					size: 'medium',
					iconToggle: false,
				}
			},
			{
				title: 'Lorem et dolor ipsum',
				copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit aenean vehicula lacus sit amet fringilla.',
				image: {
					url: `${window.rriData.srcUrl}/src/block/hero-slider/images/hero-slider-placeholder-2.jpg`,
					id: ''
				},
				params: {
					align: 'center'
				},
				button: {
					url: '',
					newTab: false,
					noFollow: false,
					text: 'Buy now',
					design: 'primary',
					size: 'medium',
					iconToggle: false,
				}
			},
			{
				title: 'Lorem et dolor ipsum',
				copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit aenean vehicula lacus sit amet fringilla.',
				image: {
					url: `${window.rriData.srcUrl}/src/block/hero-slider/images/hero-slider-placeholder-3.jpg`,
					id: ''
				},
				params: {
					align: 'right'
				},
				button: {
					url: '',
					newTab: false,
					noFollow: false,
					text: 'Buy now',
					design: 'primary',
					size: 'medium',
					iconToggle: false,
				}
			}
		],
	},
	settings: {
		type: 'object',
		default: {
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			autoplaySpeed: 4500,
			autoplay: false,
			pauseOnFocus: false,
			pauseOnHover: false,
			accessibility: false,
			speed: 400,
			dots: true,
			arrows: true,
			draggable: false,
			swipe: false,
			fade: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						dots: true,
						arrows: false
					}
				}
			]
		}
	},
	hideControls: {
		type: 'boolean',
		default: false
	}
};

export default schema;
