const schema = {
	slidesData: {
		type: 'array',
		default: [
			{
				title: '<strong>Melin Success Story</strong> | Business Mastery',
				quote: 'The impact Business Mastery has had in my life goes far beyond just business and financial benefits. I’m more grateful, I see my parents differently, I see my fiancé differently. At Business Mastery, you’re surrounded by all these people who are the alphas of their groups – they’re leaders and achievers – and everyone is ecstatic because of the possibilities they can see for their future. Stuff changes here.',
				author: '<strong>Brian McDonell </strong> | Owner of Melin',
				image: {
					url: `${window.rriData.srcUrl}/src/block/generic-slider/images/generic-slider-image-placeholder-1.jpg`,
					id: ''
				},
				button: {
					url: 'https://core.tonyrobbins.com/business-impact-report-melin/',
					newTab: true,
					noFollow: false,
					text: "Read Brian's story",
					design: 'primary',
					size: 'medium',
					iconToggle: false,
				}
			},
			{
				title: '<strong>Graffeo Success Story</strong> | Business Mastery',
				quote: 'Tony helped me realize all of my strengths and the things I was doing right in my business, but even more so, the spots that were weak and needed to become stronger. Before Business Mastery, I was afraid to look at my weaknesses.',
				author: '<strong>Joe Graffeo</strong> | Co-Owner, Graffeo Chiropractic',
				image: {
					url: `${window.rriData.srcUrl}/src/block/generic-slider/images/generic-slider-image-placeholder-2.jpg`,
					id: ''
				},
				button: {
					url: 'https://core.tonyrobbins.com/bm-impact-graffeo-2',
					newTab: true,
					noFollow: false,
					text: "Read Joe's story",
					design: 'primary',
					size: 'medium',
					iconToggle: false,
				}
			},
			{
				title: "<strong>Daniel's Success Story</strong> | Business Mastery",
				quote: 'The business doesn’t devour me anymore. It doesn’t own me. I have freedom. I realized that letting it go, trusting, and hiring people better than me will allow me the time to do what I’m good at.',
				author: '<strong>Daniel Lanigan</strong> | <span>Founder of Lord Hobo Brewing Company</span>',
				image: {
					url: `${window.rriData.srcUrl}/src/block/generic-slider/images/generic-slider-image-placeholder-3.jpg`,
					id: ''
				},
				button: {
					url: 'https://core.tonyrobbins.com/bm-impact-lordhobo/',
					newTab: true,
					noFollow: false,
					text: "Read Daniel's story",
					design: 'primary',
					size: 'medium',
					iconToggle: false,
				}
			}
		]
	},

	settings: {
		type: 'object',
		default: {
			infinite: true,
			adaptiveHeight: true,
			autoplay: false,
			autoplaySpeed: 0,
			speed: 500,
			slidesToShow: 1,
			pauseOnFocus: false,
			pauseOnHover: false,
			accessibility: false,
			touchMove: false,
			swipe: false
		}
	}
};

export default schema;
