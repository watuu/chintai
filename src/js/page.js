import $ from "jQuery";
import Utility from './utility';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import Swiper, { Navigation, Pagination, Autoplay, Scrollbar, EffectFade } from 'swiper';
import 'swiper/css/bundle'
Swiper.use([Navigation, Pagination, Autoplay, Scrollbar, EffectFade]);

export default class Page {
    constructor() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        if (document.querySelector('.cm-xxx')) {
            //
        }
        this.pCompanyHistory()
    }

    pCompanyHistory() {
        if (document.querySelector('.p-company-history-timeline')) {
            const timeline = document.querySelector('.p-company-history-timeline');
            const line = timeline.querySelector('.p-company-history-timeline__line');
            const indicator = line.querySelector('.indicator');
            const nikukyu = line.querySelector('.nikukyu');

            gsap.set(indicator, { height: '0%' });
            gsap.set(nikukyu, { top: 0 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: timeline,
                    start: 'top 60%',
                    end: 'bottom 60%',
                    scrub: true,
                    // markers: true,
                }
            })
                .to(indicator, {
                    height: '100%',
                    ease: 'none'
                }, 0)
                .to(nikukyu, {
                    top: '100%',
                    ease: 'none'
                }, 0);

        }

    }
}
